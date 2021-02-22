Page({
    data: {
        statusName: '待机',
        log: '暂无日志',
        filter: 'SUN',
		show: false,
        deviceList: [],
        disabled: false, 
        deviceInfo: { 
            deviceId: '',
            serviceId: '',
            characteristicId: '',
        },
		actList:[{
			serviceId: 'A001',
			characteristicId: 'B001',
		},
			{
				serviceId: 'A001',
				characteristicId: 'B002',
			},
			{
				serviceId: 'A001',
				characteristicId: 'B003',
			},
			{
				serviceId: 'A001',
				characteristicId: 'B004',
			},{
				serviceId: 'A002',
				characteristicId: 'B102',
			}, {
				serviceId: 'A003',
				characteristicId: 'B102',
			}]
    },

	// 重制
    handleReset: function() {
        this.setData({
            statusName: '待机',
            log: '',
            filter: 'SUN',
            deviceList: [],
            disabled: false,
        })
    },

	// 显示方法
	handleShowAct: function(){
		this.setData({
			show: true,
		})
	},

    handleGoTestWrite: function() {
        wx.redirectTo({
            url: '../BleTestWrite/BleTestWrite',
        })
    },

    // 检测本机蓝牙状态
    handleTestBlueTooth: function() {
        this.setData({
            disabled: true,
        })
        let that = this
        wx.openBluetoothAdapter({ // 检测当前是否已经处于蓝牙匹配
            success: function(res) {
                that.setData({
                    log: JSON.stringify(res),
                    statusName: '检测成功且蓝牙状态正常',
                })
                that.getBluetoothAdapterState()
            },
            fail: function(err) {
                that.setData({
                    log: JSON.stringify(err),
                    statusName: '检测蓝牙状态失败或蓝牙状态异常',
                    disabled: false,
                })
            }
        })
    },

    // 检测本机蓝牙是否可用
    getBluetoothAdapterState: function() {
        var that = this;
        wx.getBluetoothAdapterState({
            success: function(res) {
                that.setData({
                    log: JSON.stringify(res),
                    statusName: '检测成功且蓝牙状态正常',
                })
                that.handleFoundDevice()
            },
            fail(err) {
                that.setData({
                    log: JSON.stringify(err),
                    statusName: '检测蓝牙状态失败或蓝牙状态异常',
                    disabled: false,
                })
            }
        })
    },

    // 开始搜索蓝牙
    handleFoundDevice: function() {
        let that = this
        wx.startBluetoothDevicesDiscovery({
            success: function(res) {
                setTimeout(function() {
                    wx.stopBluetoothDevicesDiscovery({
                        success: function(res) {
                            that.setData({
                                log: JSON.stringify(res),
                                statusName: '开始搜索附近设备',
                            })
                            that.handleSortSearchResult()
                        },
                        fail: function(err) {
                            that.setData({
                                statusName: '开始搜索设备失败',
                                log: JSON.stringify(err),
                            })
                            console.log(err)
                        },
                    })
                }, 5000)
            }
        })
    },

    // 获取蓝牙设备列表
    handleSortSearchResult: function() {
        let that = this,
            list = []
        wx.getBluetoothDevices({
            success(res) {
                that.setData({
                    statusName: '获取搜索到的设备',
                    log: JSON.stringify(res.errMsg),
                })
                for (let i in res.devices) {
                    if (res.devices[i].localName && res.devices[i].localName.indexOf('#QY#') != -1) {
                        list.push(res.devices[i])
                    }

                }
                that.setData({
                    deviceList: list
                })
            },
            fail(err) {
                that.setData({
                    statusName: '获取搜索到的设备失败',
                    log: JSON.stringify(res),
                })
            }
        })
    },

    // 开始对接设备
    handleConnectBle: function(data) {
        let device = this.data.deviceList[data.currentTarget.dataset.idx]
        let that = this
        wx.createBLEConnection({ // 创建设备连接
            deviceId: device.deviceId,
            success: res => {
                that.setData({
                    statusName: '连接设备成功',
                    log: JSON.stringify(res),
                })
                that.getServiceId(device)
            },
            fail: err => {
                that.setData({
                    statusName: '连接设备成功失败',
                    log: JSON.stringify(err),
                })
            }
        })
    },

    // 获取serviceId
    getServiceId: function(item) {
        let that = this
        wx.getBLEDeviceServices({
            deviceId: item.deviceId,
            success: res => {
                that.setData({
                    statusName: '连接serviceID成功',
                    log: JSON.stringify(res),
                })
                for (let i in res.services) {
                    if (res.services[i].uuid.indexOf('A002') != -1) {
                        that.handleReadChar(item, res.services[i].uuid)
                    }
                }
                console.log(res)
            },
            fail: err => {
                that.setData({
                    statusName: '读取设备serviceID失败',
                    log: JSON.stringify(err),
                })
            }
        })
    },

    // 读取设备特征值
    handleReadChar: function(item, serviceId) {
        let that = this
        wx.getBLEDeviceCharacteristics({
            deviceId: item.deviceId,
            serviceId: serviceId,
            success: res => {
                that.setData({
                    statusName: '读取设备Characteristics成功',
                    log: JSON.stringify(res),
                })
                console.log(res.characteristics)
                for (let i in res.characteristics) {
                    if (res.characteristics[i].uuid.indexOf('B102') != -1) {
                        // that.handleRead(item, serviceId, res.characteristics[i].uuid)
                        that.handleNotify(item, serviceId, res.characteristics[i].uuid)
                    }
                }
            },
            fail: err => {
                that.setData({
                    statusName: '读取设备Characteristics失败',
                    log: JSON.stringify(err),
                })
            }
        })
    },

    // 监听设备特征值变化（需要notify权限）
    handleNotify: function(item, serviceId, characteristicId) {
        let that = this
        wx.notifyBLECharacteristicValueChange({
            deviceId: item.deviceId,
            serviceId: serviceId,
            characteristicId: characteristicId,
            state: true,
            success: res => {
                that.setData({
                    statusName: '启用特征值变化notify成功',
                    log: JSON.stringify(res),
                    deviceInfo: {
                        deviceId: item.deviceId,
                        serviceId: serviceId,
                        characteristicId: characteristicId,
                    }
                })
                console.log(res)
                that.handleWatchValue()
            },
            fail: err => {
                that.setData({
                    statusName: '启用特征值变化notify失败',
                    log: JSON.stringify(err),
                })
            }
        })
    },

    // 数据格式转化为hex
    ab2hex: function(buffer) {
        let hexArr = Array.prototype.map.call(
            new Uint8Array(buffer),
            function(bit) {
                return ('00' + bit.toString(16)).slice(-2)
            }
        )
        return hexArr.join('');
    },

    // 获取特征值变化值
    handleWatchValue: function() {
        let that = this
        console.log('开始监听特征值')
        wx.onBLECharacteristicValueChange(function(res) {
            console.log(`characteristic ${res.characteristicId} has changed, now is` + JSON.stringify(res.value))
            console.log(that.ab2hex(res.value))
        })
    },

    // 执行读取操作
    handleRead: function(item, serviceId, characteristicId) {
        let that = this
        wx.readBLECharacteristicValue({
            deviceId: that.data.deviceInfo.deviceId,
            serviceId: that.data.deviceInfo.serviceId,
            characteristicId: that.data.deviceInfo.characteristicId,
            success: (res) => {
                that.setData({
                    statusName: '读 操作成功',
                    log: JSON.stringify(res),
                })
                console.log(res)
            },
            fail: err => {
                console.log(err)
            }
        })
    },

    // 断开设备连接
    handleDisconnectBle: function(item) {
        let that = this
        wx.closeBLEConnection({
            deviceId: item.deviceId,
            success: res => {},
            fail: res => {},
            complete: res => { // 判断设备列表是否遍历完成
                that.handleCloseBle()
            }
        })
    },


    // 关闭蓝牙模块
    handleCloseBle: function() {
        let that = this
        wx.closeBluetoothAdapter({
            success: res => {},
            fail: err => {},
            complete: res => {
                that.setData({
                    bleSearchIng: false,
                })
            }
        })
    },
})