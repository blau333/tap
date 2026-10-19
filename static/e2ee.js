/* Kolo E2EE — client-side encryption for direct messages.
 *
 * Design (phase 5):
 *  - Each user holds a long-term ECDH P-256 identity key pair. The PUBLIC part
 *    is uploaded to the server; the PRIVATE part lives only in IndexedDB.
 *  - Each conversation gets a random 256-bit AES key. The initiator wraps it
 *    (AES-256-GCM) for every participant using ECDH + HKDF-SHA256, and stores
 *    the wrapped copies on the server. The server never sees the plaintext key.
 *  - Message bodies are AES-256-GCM ciphertext. The server stores only
 *    ciphertext + nonce; all decryption happens in the browser.
 *  - Legacy plaintext messages (created before E2EE) remain readable; new
 *    messages are encrypted as soon as both participants have identity keys.
 *
 * The module is dependency-free and runs both in the browser (window.KoloE2EE)
 * and in Node (module.exports) so the crypto can be unit-tested headlessly.
 */
(function (root, factory) {
  "use strict";
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.KoloE2EE = factory(root);
  }
})(typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : globalThis, function (root) {
  "use strict";

  var subtle = (root.crypto && root.crypto.subtle) || null;
  var getRandomValues = function (bytes) {
    if (root.crypto && root.crypto.getRandomValues) return root.crypto.getRandomValues(bytes);
    throw new Error("crypto.getRandomValues unavailable");
  };
  var TextEncoderImpl = typeof TextEncoder !== "undefined" ? TextEncoder : function () {
    throw new Error("TextEncoder unavailable");
  };
  var TextDecoderImpl = typeof TextDecoder !== "undefined" ? TextDecoder : function () {
    throw new Error("TextDecoder unavailable");
  };

  var btoaFn = typeof btoa !== "undefined"
    ? btoa
    : function (s) {
        var buf = Buffer.from(s, "binary");
        return buf.toString("base64");
      };
  var atobFn = typeof atob !== "undefined"
    ? atob
    : function (s) {
        var buf = Buffer.from(s, "base64");
        return buf.toString("binary");
      };

  function bytesToB64(bytes) {
    var u8 = new Uint8Array(bytes);
    var s = "";
    var CHUNK = 0x8000;
    for (var i = 0; i < u8.length; i += CHUNK) {
      s += String.fromCharCode.apply(null, u8.subarray(i, i + CHUNK));
    }
    return btoaFn(s);
  }

  function b64ToBytes(b64) {
    var s = atobFn(b64);
    var u8 = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) u8[i] = s.charCodeAt(i);
    return u8;
  }

  var ECDH_ALG = { name: "ECDH", namedCurve: "P-256" };
  var HKDF_INFO = new TextEncoderImpl().encode("kolo-e2ee-wrap-v1");

  function deriveWrapKey(sharedBits, ephPubBytes) {
    return subtle
      .importKey("raw", sharedBits, "HKDF", false, ["deriveKey"])
      .then(function (ikm) {
        return subtle.deriveKey(
          {
            name: "HKDF",
            hash: "SHA-256",
            salt: new TextEncoderImpl().encode("kolo-e2ee-v1"),
            info: ephPubBytes,
          },
          ikm,
          { name: "AES-GCM", length: 256 },
          false,
          ["encrypt", "decrypt"]
        );
      });
  }

  return {
    available: function () { return !!subtle; },

    /* Identity key pair: returns { pubB64 (SPKI base64), privJwk }. */
    generateIdentity: function () {
      return subtle.generateKey(ECDH_ALG, true, ["deriveBits"]).then(function (pair) {
        return Promise.all([
          subtle.exportKey("spki", pair.publicKey),
          subtle.exportKey("jwk", pair.privateKey),
        ]).then(function (res) {
          return { pubB64: bytesToB64(res[0]), privJwk: res[1] };
        });
      });
    },

    importPublicKey: function (pubB64) {
      return subtle.importKey("spki", b64ToBytes(pubB64), ECDH_ALG, false, []);
    },

    importPrivateKey: function (privJwk) {
      return subtle.importKey("jwk", privJwk, ECDH_ALG, false, ["deriveBits"]);
    },

    /* Fresh random 32-byte conversation key. */
    newConversationKey: function () {
      return getRandomValues(new Uint8Array(32));
    },

    /* Wrap a conversation key for the owner of pubB64.
     * Returns { wrapped, nonce, ephPub } (all base64). */
    wrapConversationKey: function (pubB64, convKeyBytes) {
      return Promise.all([
        this.importPublicKey(pubB64),
        subtle.generateKey(ECDH_ALG, true, ["deriveBits"]),
      ]).then(function (res) {
        var peerPub = res[0];
        var eph = res[1];
        return subtle
          .deriveBits({ name: "ECDH", public: peerPub }, eph.privateKey, 256)
          .then(function (shared) {
            return subtle.exportKey("spki", eph.publicKey).then(function (ephPubSpki) {
              var ephPubBytes = new Uint8Array(ephPubSpki);
              return deriveWrapKey(shared, ephPubBytes).then(function (wrapKey) {
                var nonce = getRandomValues(new Uint8Array(12));
                return subtle.encrypt({ name: "AES-GCM", iv: nonce }, wrapKey, convKeyBytes).then(function (ct) {
                  return {
                    wrapped: bytesToB64(ct),
                    nonce: bytesToB64(nonce),
                    ephPub: bytesToB64(ephPubSpki),
                  };
                });
              });
            });
          });
      });
    },

    /* Reverse of wrapConversationKey using the recipient's private key. */
    unwrapConversationKey: function (privJwk, wrappedB64, nonceB64, ephPubB64) {
      var self = this;
      var ephPubBytes = b64ToBytes(ephPubB64);
      return this.importPrivateKey(privJwk)
        .then(function (priv) {
          return self.importPublicKey(ephPubB64).then(function (ephPub) {
            return subtle.deriveBits({ name: "ECDH", public: ephPub }, priv, 256).then(function (shared) {
              return deriveWrapKey(shared, ephPubBytes).then(function (wrapKey) {
                return subtle
                  .decrypt({ name: "AES-GCM", iv: b64ToBytes(nonceB64) }, wrapKey, b64ToBytes(wrappedB64))
                  .then(function (keyBytes) {
                    return new Uint8Array(keyBytes);
                  });
              });
            });
          });
        });
    },

    /* Encrypt a message body with the conversation key.
     * Returns { cipher, nonce } (base64). */
    encryptMessage: function (convKeyBytes, text) {
      var nonce = getRandomValues(new Uint8Array(12));
      return subtle
        .importKey("raw", convKeyBytes, "AES-GCM", false, ["encrypt", "decrypt"])
        .then(function (key) {
          return subtle.encrypt(
            { name: "AES-GCM", iv: nonce },
            key,
            new TextEncoderImpl().encode(text)
          ).then(function (ct) {
            return { cipher: bytesToB64(ct), nonce: bytesToB64(nonce) };
          });
        });
    },

    /* Decrypt a message body. Returns the plaintext string, or null on failure. */
    decryptMessage: function (convKeyBytes, cipherB64, nonceB64) {
      return subtle
        .importKey("raw", convKeyBytes, "AES-GCM", false, ["encrypt", "decrypt"])
        .then(function (key) {
          return subtle.decrypt(
            { name: "AES-GCM", iv: b64ToBytes(nonceB64) },
            key,
            b64ToBytes(cipherB64)
          );
        })
        .then(function (pt) {
          return new TextDecoderImpl().decode(pt);
        })
        .catch(function () {
          return null;
        });
    },

    /* Encrypt binary data (e.g. a voice message blob) with the conversation key.
     * Returns { cipher, nonce } (base64). */
    encryptData: function (convKeyBytes, buffer) {
      var nonce = getRandomValues(new Uint8Array(12));
      return subtle
        .importKey("raw", convKeyBytes, "AES-GCM", false, ["encrypt", "decrypt"])
        .then(function (key) {
          return subtle.encrypt({ name: "AES-GCM", iv: nonce }, key, buffer).then(function (ct) {
            return { cipher: bytesToB64(ct), nonce: bytesToB64(nonce) };
          });
        });
    },

    /* Reverse of encryptData. Returns an ArrayBuffer, or null on failure. */
    decryptData: function (convKeyBytes, cipherB64, nonceB64) {
      return subtle
        .importKey("raw", convKeyBytes, "AES-GCM", false, ["encrypt", "decrypt"])
        .then(function (key) {
          return subtle.decrypt(
            { name: "AES-GCM", iv: b64ToBytes(nonceB64) },
            key,
            b64ToBytes(cipherB64)
          );
        })
        .catch(function () {
          return null;
        });
    },

    /* ---- IndexedDB storage (browser only) ---- */

    _idb: function () {
      if (typeof indexedDB === "undefined") {
        return Promise.reject(new Error("indexedDB unavailable"));
      }
      return new Promise(function (resolve, reject) {
        var req = indexedDB.open("kolo-e2ee", 1);
        req.onupgradeneeded = function () {
          var db = req.result;
          if (!db.objectStoreNames.contains("keys")) db.createObjectStore("keys");
        };
        req.onsuccess = function () { resolve(req.result); };
        req.onerror = function () { reject(req.error); };
      });
    },

    _idbGet: function (k) {
      return this._idb().then(function (db) {
        return new Promise(function (resolve, reject) {
          var tx = db.transaction("keys", "readonly");
          var req = tx.objectStore("keys").get(k);
          req.onsuccess = function () { resolve(req.result || null); };
          req.onerror = function () { reject(req.error); };
        });
      });
    },

    _idbSet: function (k, v) {
      return this._idb().then(function (db) {
        return new Promise(function (resolve, reject) {
          var tx = db.transaction("keys", "readwrite");
          tx.objectStore("keys").put(v, k);
          tx.oncomplete = function () { resolve(); };
          tx.onerror = function () { reject(tx.error); };
        });
      });
    },

    getIdentity: function (userId) {
      return this._idbGet("ident:" + userId);
    },

    setIdentity: function (userId, ident) {
      return this._idbSet("ident:" + userId, ident);
    },

    getConvKey: function (conversationId) {
      return this._idbGet("conv:" + conversationId).then(function (v) {
        return v ? b64ToBytes(v) : null;
      });
    },

    setConvKey: function (conversationId, keyBytes) {
      return this._idbSet("conv:" + conversationId, bytesToB64(keyBytes));
    },
  };
});
