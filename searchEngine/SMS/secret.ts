/*
    @version: 1.0
    @author: 71117123张建东
    @date: 2019/9/4
*/
//npm install crypto-js --save
const CryptoJS = require('crypto-js');  //引用AES源码js
    
const key = CryptoJS.enc.Utf8.parse("192608172019ABCD");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('19980205ABCD1234');   //十六位十六进制数作为密钥偏移量

function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}

module.exports = {
    Encrypt,
    Decrypt
}