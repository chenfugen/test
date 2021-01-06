// components/navBar/navBar.js
Component({
    /**
     * 组件的属性列表
     */
	properties: {
		title: {
			type: String,
			value: '标题'
		},
		showTitle: {
			type: Boolean,
			value: true
		},
		showBackBtn: {
			type: Boolean,
			value: true,
		},
		backgroundColor: {
			type: String,
			value: '#fff',
		},
		iconColor: {
			type: String,
			value: 'black',
		},
		color: {
			type: String,
			value: '#333',
		},
	},

    /**
     * 组件的初始数据
     */
	data: {
		menuBtnHeight: 0,
		menuButtonTop: 0,
		routePath: '',
		backNum: 1,
		delta: 1
	},

	options: {
		multipleSlots: true
	},

	ready: function (options) {
		let app = getApp()
		this.setData({
			menuBtnHeight: app.globalData.menuBtnHeight,
			menuButtonTop: app.globalData.menuButtonTop,
		})
	},

    /**
     * 组件的方法列表
     */
	methods: {
		//回退
		handleBack: function () {
			if (this.data.routePath != '') {
				wx.redirectTo({
					url: this.data.routePath
				})
			} else {
				wx.navigateBack({
					delta: this.data.delta
				})
			}
		},
		handleChangeRouter(url) {
			this.setData({
				routePath: url
			})
		},

		handleChangeDelta(num) {
			this.setData({
				delta: num
			})
		},
	}
})