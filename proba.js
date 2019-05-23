const assert = require('assert');
const crypto = require('crypto');
var EC = require('elliptic').ec;


// @TODO ten szyfr nie jest zaimplementowany
// const alice = crypto.createECDH('secp384r1');

// // Exchange and generate the secret...

const encryptedMessage = "BDiRKNnPiPUb5oala31nkmCaXMB0iyWy3Q93p6fN7vPxEQSUlFVsInkJzPBBqmW1FUIY1KBA3BQb3W3Qv4akZ8kblqbmvupE/EJzPKbROZFBNvxpvVOHHgO2qadmHAjHSmnxUuxrpKxopWnOgyhzUx+mBUTao0pcEgqZFw0Y/qZIJPf1KusCMlz5TAhpjsw=";
const decryptedMessage = "xXTi32iZwrQ6O8Sy6r1isKwF6Ff1Py";

const token = Buffer.from(encryptedMessage, "base64");
const uncompressedKeyform  = token.slice(0, 4);
const ephemeralPubkey = token.slice(0, 97);
const encryptedData = token.slice(97, token.length - 16);
const encryptionTag = token.slice(token.length - 16);

assert.equal(
    ephemeralPubkey.toString("base64"),
    "BDiRKNnPiPUb5oala31nkmCaXMB0iyWy3Q93p6fN7vPxEQSUlFVsInkJzPBBqmW1FUIY1KBA3BQb3W3Qv4akZ8kblqbmvupE/EJzPKbROZFBNvxpvVOHHgO2qadmHAjHSg==",
);

//OK

var ec = new EC('p384');

const Private = "pX/BvdXXUdpC79mW/jWi10Z6PJb5SBY2+aqkR/qYOjqgakKsqZFKnl0kz10Ve+BP";
const Public = "BNY+I93aHVkXnNWKVLdrMJLXpQ1BsyHYoiv6UNi4rDUsRx3sNNhW8FNy9yUwxYprAwwfj1ZkoJ61Fs+SwjIbGPtXi52arvSbPglyBN4uAxtP3VP3LCP4JtSEjdgsgsretA==";


var key = ec.keyPair({
    priv: Buffer.from(Private, "base64"),
    pub: Buffer.from(Public, "base64")
});
const ephemeralPublicEcKey = ec.keyFromPublic(ephemeralPubkey.toString("hex"), "hex");
assert.equal(
    ephemeralPublicEcKey.getPublic().getX().toString(),
    "8706462696031173094919866327685737145866436939551712382591956952075131891462487598200779332295613073905587629438229"
);
assert.equal(
    ephemeralPublicEcKey.getPublic().getY().toString(),
    "10173258529327482491525749925661342501140613951412040971418641469645769857676705559747557238888921287857458976966474"
);
const ecdh = crypto.createECDH("secp384r1");
ecdh.setPrivateKey(Buffer.from(Private, "base64"));
const shared = ecdh.computeSecret(Buffer.from(ephemeralPublicEcKey.getPublic().encode("hex"), "hex"));

assert.equal(shared.toString("base64"), "2lvSJsBO2keUHRfvPG6C1RMUmGpuDbdgNrZ9YD7RYnvAcfgq/fjeYr1p0hWABeif");
// console.log(shared.toString("base64"));

function KDFX963(inbyteX, sharedData, keyLength, hashFunction = "sha256", hashLength = 32){
    k = keyLength / hashLength;
    k = Math.trunc(Math.ceil(k));
    sharedData = Buffer.from(sharedData, "base64");

    acc_str = "";
    for(let i = 1; i < k + 1; i++){
        let h = crypto.createHash(hashFunction);
        h.update(inbyteX);
        h.update(ITOSP(i, 4));
        h.update(sharedData);
        acc_str += h.digest().toString("hex");
        console.log(acc_str);
    }
    return acc_str.slice(0, keyLength * 2);
}
function ITOSP(longint, length){
    let hexString = longint.toString(16);
    hexString = hexString.padStart(length * 2, "0");
    return unhexlify(hexString);
}
function unhexlify(hexString) {
    let result = '';
    for (let i = 0; i < hexString.length; i += 2) {
        result += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
    }
    return result;
}
assert.equal(Buffer.from(ephemeralPublicEcKey.getPublic().encode("hex"), "hex").toString("base64"), "BDiRKNnPiPUb5oala31nkmCaXMB0iyWy3Q93p6fN7vPxEQSUlFVsInkJzPBBqmW1FUIY1KBA3BQb3W3Qv4akZ8kblqbmvupE/EJzPKbROZFBNvxpvVOHHgO2qadmHAjHSg==");
// const V = tokenslice(0, );
// assert.equal(V.toString("base64"), "BDiRKNnPiPUb5oala31nkmCaXMB0iyWy3Q93p6fN7vPxEQSUlFVsInkJzPBBqmW1FUIY1KBA3BQb3W3Qv4akZ8kblqbmvupE/EJzPKbROZFBNvxpvVOHHgO2qadmHAjHSg==");
let payload = KDFX963(shared, Buffer.from(ephemeralPublicEcKey.getPublic().encode("hex"), "hex").toString("base64"), 48);
payload = Buffer.from(payload, "hex");
let derivedKey = payload.slice(0,32);
let initializationVector = payload.slice(payload.length - 16);

assert.equal(derivedKey.toString("base64"), "mAzkYatDlz4SzrCyM23NhgL/+mE3eGgfUz9h1CFPhZM=");
assert.equal(initializationVector.toString("base64"), "rV3qrszd0PMPgeRhNnlOYA==");
console.log("Full payload", payload.toString("base64"));
console.log("First 32 bytes", payload.slice(0,32).toString("base64"));
console.log("Last 16 bytes", payload.slice(payload.length - 16).toString("base64"));

derivedKey = Buffer.from(derivedKey.toString("binary").substring(0, 32), "binary");
initializationVector = Buffer.from(initializationVector.toString("binary").substring(0, 16), "binary");
console.log(encryptionTag.toString("base64"));
console.log(derivedKey.byteLength, initializationVector.byteLength);

//-----------------------------------------------------------------------------------------------------------







let jakisPromise = new Promise((resolve, reject) => {
    const decipher = crypto.createDecipheriv("aes-256-gcm", derivedKey, initializationVector);
    decipher.setAuthTag(encryptionTag);

    let decrypted = '';
    decipher.on('readable', () => {
        while (null !== (chunk = decipher.read())) {
            decrypted += chunk.toString('utf8');
        }
    });
    decipher.on('end', () => {
        resolve(decrypted);
    });
    decipher.write(encryptedData.toString("hex"), "hex");
    decipher.end();
});

jakisPromise.then((decipheredText) => {
    console.log(decipheredText);
})