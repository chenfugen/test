//index.js
//获取应用实例
const app = getApp()
Page({
	data: {
		motto: '温老板的水机',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		imgUrls: [
			'../../images/banner1.jpg',
			'../../images/banner2.jpg',
			'../../images/banner3.jpg'
		],
		images: ['https://iot2.qinyuan.cn/web/api/common/getFiles/5c39ae12a039701d8e182f78'],
		indicatorDots: false,
		autoplay: true,
		interval: 2000,
		duration: 1000,
		tabbar: {},
		show: "",
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onLoad: function() {
		app.changeTabBar();
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},
	loginIn: function(e) {
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
	previewImage: function(e) {
		wx.previewImage({
			current: "https://iot2.qinyuan.cn/web/api/common/getFiles/5c39ae12a039701d8e182f78", // 当前显示图片的http链接   
			urls: this.data.images, // 需要预览的图片http链接列表   
		})
	},
	sancode: function() {
		var that = this;
		var show;
		wx.scanCode({
			success: (res) => {
				console.log(res)
				this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
				that.setData({
					show: this.show
				})
				wx.showToast({
					title: '成功',
					icon: 'success',
					duration: 2000
				})
			},
			fail: (res) => {
				wx.showToast({
					title: '失败',
					icon: 'success',
					duration: 2000
				})
			},
			complete: (res) => {
					wx.navigateTo({
						url: 'http://we.qq.com/d/AQA5SwOzfPxZq0oC0RBRcDryNIA6UXZxprs9CxiC'
					})
			}
		})
	}
})
