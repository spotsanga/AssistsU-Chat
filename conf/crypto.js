var CryptoJS = require("crypto-js")
var compute = (G, a, P) => {
    if (a == 0) {
        return 1
    }
    else if (a % 2 == 0) {
        ans = compute(G, a / 2, P)
        ans *= ans
        return ans % P
    }
    else {
        ans = (G % P) * compute(G, a - 1, P)
        ans = ans % P
        return ans
    }
}
var encrypt = (message, key) => {
    return CryptoJS.AES.encrypt(message, key).toString()
}
var decrypt = (ciphertext, key) => {
    return CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8)
}
const G = 9, P = 23, min = 1, max = 10
b = Math.floor((Math.random() * max) + min),
    y = compute(G, b, P)
// console.log({ G: G, b: b, P: P, y: y })
module.exports = { G, P, b, y, compute, encrypt, decrypt, min, max }