import api from '../apiConfig/api'
import store from '../store'

var UTILSWS = null // 初始化websorket变量
var UTILSTIMER = null // 初始化定时器
var WAITING = false // 标示是否向设备请求数据
var TIMER = null // 时钟
var HBDATA = { // 心跳数据
	"v": 1,
	"cmd": "hb"
}

// 创建websorket
function handleCreate(wait) {
	WAITING = wait
	UTILSWS = new WebSocket(api.webSorket)
	UTILSWS.onopen = function(event) {
		handleConnectWS()
		handleKeepHB()
	}
	UTILSWS.onclose = function(event) {
		handleBroken()
	}
	UTILSWS.onmessage = function(event) {
		let data = JSON.parse(event.data)
		handleDealData(data)
	}
	UTILSWS.onerror = function(event) {
		handleBroken()
	}
}

// 连接并验证websorket服务
function handleConnectWS() {
	// let data = {
	// 	"version": 1,
	// 	"cmd": "connect",
	// 	"token": store.state.device.token
	// }
	// let json = JSON.stringify(data)
	// UTILSWS.send(json)
}

// 订阅设备
function handleConnectDevice() {
	// let data = {
	// 	"version": 1,
	// 	"cmd": "subscribe",
	// 	"flag": "on",
	// 	"productId": store.state.device.productId,
	// 	"moduleId": store.state.device.deviceName
	// }
	// let json = JSON.stringify(data)
	// UTILSWS.send(json)
}

// 断开重连
function handleBroken() {
	UTILSWS = null
	handleCreate()
}

// 保持心跳
function handleKeepHB() {
	UTILSTIMER = setInterval(function() {
		UTILSWS.send(JSON.stringify(HBDATA));
	}, 38000)
}

// 处理数据
function handleDealData(data) {
	if (data.cmd == 'connect') { // 连接websorket成功
		handleConnectDevice()
	}
	// 订阅设备成功
	else if (data.cmd == 'subscribe') {
		console.log('订阅设备成功');
	}
}

// 发送数据
function handleSendMSG(data) {
	UTILSWS.send(data)
}

// 抛出全局变量
export default {
	handleCreate,
	handleConnectWS,
	handleConnectDevice,
	handleKeepHB,
	handleBroken,
	handleSendMSG,
}