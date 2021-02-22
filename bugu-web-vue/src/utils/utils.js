function dealNullData(data) {
	if (data === undefined || data === null || data === 0 || data === "") {
		return '--'
	} else {
		return data
	}
}

function dealTime(data) {
	if (data == null || data == '' || data == undefined) {
		return '--'
	} else {
		let time = new Date(data)
		let YY = time.getFullYear(),
			MM = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1,
			DD = time.getDate() < 10 ? '0' + time.getDate() : time.getDate(),
			hh = time.getHours() < 10 ? '0' + time.getHours() : time.getHours(),
			mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes(),
			ss = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
		return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss
	}

}

function dealYes(data) {
	switch (data) {
		case 'Y':
			return '是'
		default:
			return '否'
	}
}

function dealStatus(data) {
	switch (data) {
		case 'Y':
			return '启用'
		default:
			return '停用'
	}
}

function dealFirmwareType(data) {
	if (dealNullData(data) != '--') {
		switch (data) {
			case 1:
				return '模组'
			default:
				return '主板'
		}
	} else {
		return dealNullData(data)
	}
}

function dealBoolean(data) {
	switch (data) {
		case true:
			return '是'
		default:
			return '否'
	}
}

function dealUpgradeType(data) {
	switch (data) {
		case 1:
			return '强制'
		default:
			return '非强制'
	}
}

// sim卡状态值处理
function dealSimStatus(data) {
	switch (data) {
		case '00':
			return '正常'
		case '02':
			return '停机'
		case '04':
			return '销号'
		case '07':
			return '待激活'
		case '98':
			return '其它'
		default:
			return '未知'
	}
}

function dealUpgradeAll(data) {
	switch (data) {
		case 1:
			return '全部设备'
		default:
			return '部分设备'
	}
}

function dealStatusNum(data) {
	switch (data) {
		case 1:
			return '启用'
		case 0:
			return '停用'
		default:
			return '状态异常'
	}
}
export default {
	dealNullData,
	dealTime,
	dealYes,
	dealStatus,
	dealFirmwareType,
	dealBoolean,
	dealSimStatus,
	dealUpgradeType,
	dealUpgradeAll,
	dealStatusNum
}