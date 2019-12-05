var CryptoJS = require('./aes.js')
//AES-128-CBC加密模式，key需要为16位，key和iv可以一样
/*
* [encrypt 加密]
*/
function Encrypt(content,key) {
  var key = CryptoJS.enc.Utf8.parse(key); //abcdefghigkliopk密码，16位
  var encryptResult = CryptoJS.AES.encrypt(content, key, {
    iv: CryptoJS.enc.Utf8.parse("0102030405060708"), //0102030405060708偏移量，16位
    mode: CryptoJS.mode.ECB, //aes加密模式cbc
    padding: CryptoJS.pad.Pkcs7 //填充
  });
  var result = String(encryptResult);//把object转化为string
  return result
}

/**
* [decrypt 解密]
* @return {[type]} [description]
*/

function Decrypt(content,key) {
  var key = CryptoJS.enc.Utf8.parse(key);
  var bytes = CryptoJS.AES.decrypt(content.toString(), key, {
    iv: CryptoJS.enc.Utf8.parse("0102030405060708"),
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  var decryptResult = bytes.toString(CryptoJS.enc.Utf8);
  return decryptResult
}

module.exports = {
  Encrypt,
  Decrypt
}