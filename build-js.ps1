$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$tmp = Join-Path $root ".tmp-build"
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

$babel = Join-Path $root "node_modules\.bin\babel.cmd"
$terser = Join-Path $root "node_modules\.bin\terser.cmd"

# Transpile the JSX app, then minify. Sources live in client-src/ so they are
# never served over HTTP; only the minified bundles end up in static/.
& $babel "client-src/tap-app.jsx" -o (Join-Path $tmp "tap-app.js") | Out-Null
& $terser (Join-Path $tmp "tap-app.js") -c passes=2 -m -o "static/tap-app.min.js"
& $terser "client-src/e2ee.js" -c passes=2 -m -o "static/e2ee.min.js"
& $terser "client-src/webauthn.js" -c passes=2 -m -o "static/webauthn.min.js"

# Regenerate the vendored Blobatar renderer as a classic <script> (no ESM)
# from the installed blobatar package, so it stays in sync with node_modules.
$blobDist = Join-Path $root "node_modules\blobatar\dist\blob.js"
if (Test-Path $blobDist) {
  $blob = [System.IO.File]::ReadAllText($blobDist)
  $blob = ($blob -split "`r?`n" | Where-Object { -not $_.StartsWith("//# debugId=") -and -not $_.StartsWith("//# sourceMappingURL=") }) -join "`n"
  $blob = $blob.Replace("export{ar as blobatar,sr as layout};", "window.BLOBATAR=ar;window.BLOBATAR_BLOB_LAYOUT=sr;")
  $glue = @'

window.__blobatarUriCache = window.__blobatarUriCache || {};
function BlobImg(p) {
  var name = String(p && p.name != null ? p.name : "");
  var uri = window.__blobatarUriCache[name];
  if (!uri) {
    var svg = window.BLOBATAR(name, { background: "circle" });
    uri = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    window.__blobatarUriCache[name] = uri;
  }
  return React.createElement("img", {
    src: uri,
    alt: "",
    draggable: false,
    className: "t-blob-img",
    style: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      objectFit: "cover",
      display: "block"
    }
  });
}
window.BlobImg = BlobImg;
'@
  $out = $blob.TrimEnd() + $glue
  $enc = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText((Join-Path $root "static\blobatar.js"), $out, $enc)
}

Remove-Item -Recurse -Force $tmp
Write-Output "OK: static/tap-app.min.js, static/e2ee.min.js, static/webauthn.min.js, static/blobatar.js"