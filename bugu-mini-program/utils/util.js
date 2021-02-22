const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 获取wxcode
const getWxCode = () => {
	let app = getApp()
	wx.login({
		success: res => {
			app.globalData.wxCode = res.code
			wx.setStorageSync('wxCode', JSON.stringify(res.code))
		}
	})
}

// 弹窗提示
const toast = function (msg, fun) {
	wx.showModal({
		title: '',
		content: msg,
		showCancel: false,
		success: res => {
			if (fun) {
				fun()
			}
		}
	})
}

const ab2hex = function (buffer) {
	let hexArr = Array.prototype.map.call(
		new Uint8Array(buffer),
		function (bit) {
			return ('00' + bit.toString(16)).slice(-2)
		}
	)
	return hexArr.join('');
}

const hex2ab = function (hex) {
	var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
		return parseInt(h, 16)
	}))
	var buffer = typedArray.buffer
	return buffer
}

const string2hex = function (str) {
	var val = "";
	for (var i = 0; i < str.length; i++) {
		if (val == "")
			val = str.charCodeAt(i).toString(16);
		else
			val += str.charCodeAt(i).toString(16);
	}
	return val.toLocaleUpperCase()
}

const hex2string = function (longhex) {
	var str = '',
		hex = '',
		i = null
	for (i = 0; i < longhex.length; i = i + 2) {
		hex = '0x' + longhex.substring(i, i + 2)
		str = str + String.fromCharCode(hex)
	}
	return str
}

const string2BitArr = function(string){
	let arr = []
	for(let i = 0;i<string.length;i++){
		arr.push(parseInt(string[i].charCodeAt()))
	}
	return arr 
}

const hex2Int= function(hex) {
    var len = hex.length, a = new Array(len), code;
    for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48<=code && code < 58) {
            code -= 48;
        } else {
            code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
    }
     
    return a.reduce(function(acc, c) {
        acc = 16 * acc + c;
        return acc;
    }, 0);
}

module.exports = {
	formatTime: formatTime,
	hex2Int: hex2Int,
	string2BitArr:string2BitArr,
	hex2string: hex2string,
	string2hex: string2hex,
	hex2ab: hex2ab,
	ab2hex: ab2hex,
}
