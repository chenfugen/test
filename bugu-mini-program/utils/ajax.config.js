import ApiList from '../apiConfig/api.js'

// 数据请求配置
const Ajax = (url, method, data, success, fail, type) => {
	wx.showLoading({
		mask: 'true'
	})
	wx.request({
		url: ApiList.domain + url,
		header: {
			'content-type': type || 'application/x-www-form-urlencoded',
			'token': wx.getStorageSync('token')
		},
		method: method,
		data: data,
		success(res) {
			if (res.statusCode != 200) {
				if (res.data.message) {
					wx.showModal({
						content: res.data.message,
						showCancel: false,
						success: function () {
							getWxCode()
						}
					})
				} else {
					wx.showToast({
						title: '数据请求异常,请稍后再试',
						duration: 1500,
						icon: 'none'
					})
				}
			} else {
				success(res.data);
			}
		},
		fail(res) {
			fail(res)
		},
		complete: res => {
			wx.hideLoading()
		}
	})
}

module.exports = {
	Ajax
}
