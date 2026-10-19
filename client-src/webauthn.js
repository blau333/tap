// Shared WebAuthn helpers used by the login page (auth.js) and the in-app
// settings panel (tap-app.jsx). They translate between the base64url JSON that
// webauthn-rs expects over the wire and the ArrayBuffers the browser's
// navigator.credentials API works with.

(function (global) {
  "use strict";

  function bufToBase64Url(buf) {
    const bytes = new Uint8Array(buf);
    let binary = "";
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function base64UrlToBuf(str) {
    const padded = str.replace(/-/g, "+").replace(/_/g, "/");
    const l = padded.length % 4;
    const withPad = l ? padded + "=".repeat(4 - l) : padded;
    const binary = atob(withPad);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Convert a web crypto "credential" (with ArrayBuffer fields) into the
  // base64url JSON object webauthn-rs deserialises into PublicKeyCredential.
  function serializeAssertion(cred) {
    const result = {
      id: cred.id,
      rawId: bufToBase64Url(cred.rawId),
      type: cred.type,
      response: {
        clientDataJSON: bufToBase64Url(cred.response.clientDataJSON),
        authenticatorData: bufToBase64Url(cred.response.authenticatorData),
        signature: bufToBase64Url(cred.response.signature),
        userHandle: cred.response.userHandle
          ? bufToBase64Url(cred.response.userHandle)
          : null,
      },
    };
    try {
      // getClientExtensionResults returns a plain object; spreading works.
      result.extensions = { ...cred.getClientExtensionResults() };
    } catch (e) {
      result.extensions = {};
    }
    return result;
  }

  // Same, but for registration (RegisterPublicKeyCredential).
  function serializeAttestation(cred) {
    const result = {
      id: cred.id,
      rawId: bufToBase64Url(cred.rawId),
      type: cred.type,
      response: {
        clientDataJSON: bufToBase64Url(cred.response.clientDataJSON),
        attestationObject: bufToBase64Url(cred.response.attestationObject),
      },
    };
    try {
      result.extensions = { ...cred.getClientExtensionResults() };
    } catch (e) {
      result.extensions = {};
    }
    return result;
  }

  // webauthn-rs returns its challenge as { publicKey: {...}, ... }. The
  // publicKey option object carries base64url strings where the browser
  // wants ArrayBuffers (challenge, user.id, excludeCredentials ids,
  // allowCredentials ids). This normalises them so navigator.credentials works.
  function toPublicKeyOptions(serverOptions, kind) {
    const opts = JSON.parse(
      JSON.stringify(
        serverOptions.publicKey || serverOptions.public_key || serverOptions
      )
    );
    if (opts.challenge) {
      opts.challenge = base64UrlToBuf(opts.challenge);
    }
    if (opts.user && opts.user.id) {
      opts.user.id = base64UrlToBuf(opts.user.id);
    }
    if (opts.excludeCredentials) {
      opts.excludeCredentials = opts.excludeCredentials.map((c) => ({
        ...c,
        id: base64UrlToBuf(c.id),
      }));
    }
    if (opts.allowCredentials) {
      opts.allowCredentials = opts.allowCredentials.map((c) => ({
        ...c,
        id: base64UrlToBuf(c.id),
      }));
    }
    // Drop fields the browser does not accept from a non-standard server.
    if (kind === "get") {
      delete opts.attestation;
    }
    if (opts.timeout == null) delete opts.timeout;
    return opts;
  }

  async function doRegister(serverOptions) {
    const options = toPublicKeyOptions(serverOptions, "create");
    const cred = await navigator.credentials.create({ publicKey: options });
    return serializeAttestation(cred);
  }

  async function doGet(serverOptions) {
    const options = toPublicKeyOptions(serverOptions, "get");
    const cred = await navigator.credentials.get({
      publicKey: options,
      mediation: serverOptions.mediation === "conditional" ? "conditional" : "optional",
    });
    return serializeAssertion(cred);
  }

  // Detect the operating system reliably. Prefers the modern
  // navigator.userAgentData API (which cannot be spoofed by device-toolbar
  // emulation), falls back to navigator.platform, then to the UA string.
  function detectOs() {
    try {
      const uad = navigator.userAgentData;
      if (uad && Array.isArray(uad.platforms) && uad.platforms.length) {
        const p = (uad.platforms[0] || "").toLowerCase();
        if (p.indexOf("iphone") !== -1 || p.indexOf("ipad") !== -1 || p.indexOf("ios") !== -1) return "iOS";
        if (p.indexOf("mac") !== -1) return "macOS";
        if (p.indexOf("win") !== -1) return "Windows";
        if (p.indexOf("android") !== -1) return "Android";
        if (p.indexOf("linux") !== -1) return "Linux";
      }
    } catch (e) {}
    const plat = (typeof navigator.platform === "string" ? navigator.platform : "").toLowerCase();
    if (plat.indexOf("iphone") !== -1 || plat.indexOf("ipad") !== -1 || plat.indexOf("ipod") !== -1) return "iOS";
    if (plat.indexOf("mac") !== -1) return "macOS";
    if (plat.indexOf("win") !== -1) return "Windows";
    if (plat.indexOf("android") !== -1) return "Android";
    if (plat.indexOf("linux") !== -1) return "Linux";
    const ua = (typeof navigator.userAgent === "string" ? navigator.userAgent : "").toLowerCase();
    if (ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1 || ua.indexOf("ipod") !== -1) return "iOS";
    if (ua.indexOf("mac os") !== -1 || ua.indexOf("macintosh") !== -1) return "macOS";
    if (ua.indexOf("android") !== -1) return "Android";
    if (ua.indexOf("linux") !== -1) return "Linux";
    if (ua.indexOf("windows") !== -1) return "Windows";
    return "";
  }

  global.TapWebAuthn = {
    bufToBase64Url: bufToBase64Url,
    base64UrlToBuf: base64UrlToBuf,
    toPublicKeyOptions: toPublicKeyOptions,
    doRegister: doRegister,
    doGet: doGet,
    serializeAssertion: serializeAssertion,
    serializeAttestation: serializeAttestation,
    detectOs: detectOs,
    supported: function () {
      return (
        typeof navigator !== "undefined" &&
        typeof navigator.credentials !== "undefined" &&
        typeof navigator.credentials.create === "function" &&
        typeof navigator.credentials.get === "function"
      );
    },
  };
})(window);
