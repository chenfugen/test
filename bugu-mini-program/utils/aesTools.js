var aesjs = require('aes-js');
var utils = require('./util');


// Aes加密 CBC模式 无padding  key: 密钥  text: 加密文本
var handleEncryptCBC = function (iv, key, text) {

	let k = utils.string2BitArr(key), // 将密钥转化为字节组

		i = utils.string2BitArr(iv) // 将密钥转化为字节组

	var textBytes = aesjs.utils.utf8.toBytes(text); // 使用aes.js自带的工具转化文本为字节组

	var aesCbc = new aesjs.ModeOfOperation.cbc(k, i); // 创建一个新加密

	var encryptedBytes = aesCbc.encrypt(textBytes); // 加密

	var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);  // 使用aes.js自带的工具转化文本为hex（小写）

	return encryptedHex.toUpperCase(); // 返回大写的Hex数据
}

module.exports = {
	handleEncryptCBC: handleEncryptCBC,
}