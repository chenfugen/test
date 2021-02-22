const tableConf = [{ // 表格配置
		prop: 'type',
		label: '固件类型',
		type: 'data',
		dealMethod: 'dealFirmwareType'
	},
	{
		prop: 'firmwareVersion',
		label: '版本号',
		type: 'data',
		dealMethod: 'dealNullData'
	},
	{
		prop: 'productModel',
		label: '产品型号',
		type: 'data',
		dealMethod: 'dealNullData'
	},
	{
		prop: 'createTime',
		label: '上传时间',
		type: 'data',
		dealMethod: 'dealTime'
	},
	{
		prop: 'updateTime',
		label: '启用时间',
		type: 'data',
		dealMethod: 'dealTime'
	},
	{
		prop: 'downLoadUrl',
		label: 'URL',
		type: 'data',
		dealMethod: 'dealNullData'
	},
	{
		prop: 'status',
		label: '状态',
		type: 'data',
		dealMethod: 'dealStatusNum'
	},
]

const tableActConf = [{ // 表格操作栏配置
	label: '操作',
	child: [{
			label: '编辑',
			methodsName: 'handleEdit'
		},
		{
			label: '停用',
			customize: true,
			methodsName: 'handleForbidden',
			actBtnName: 'forbiddenBtnName',
			actBtnStyle: 'forbiddenBtnStyle'
		},
		{
			label: '删除',
			methodsName: 'handleDelete',
			actBtnStyle: 'deleteBtnStyle'
		}
	],
}]

const filterFormConf = [{ // 筛选组件配置文件
		valName: 'firmwareVersion',
		type: 'input',
		plh: '固件版本'
	},
	{
		valName: 'productKey',
		plh: '产品型号',
		type: 'select',
		selValue: 'value',
		seLabel: 'label',
		selectList: [{
			value: 1,
			label: '测试产品A',
		}, {
			value: 2,
			label: '测试产品B',
		}]
	}
]

const addFormConf = [{ // 筛选组件配置文件
		valName: 'productKey',
		label: '产品型号',
		type: 'select',
		selValue: 'value',
		seLabel: 'label',
		selectList: [{
			value: '1',
			label: '测试产品A',
		}, {
			value: '2',
			label: '测试产品B',
		}]
	},
	{
		valName: 'type',
		label: '固件类型',
		type: 'select',
		selValue: 'value',
		seLabel: 'label',
		selectList: [{
			value: 1,
			label: '模组',
		}, {
			value: 2,
			label: '主板',
		}]
	},
	{
		valName: 'firmwareVersion',
		label: '固件版本',
		type: 'input',
	},
	{
		valName: 'crcSign',
		label: 'CRC',
		type: 'input',
	},
	{
		valName: 'fileSize',
		label: '文件长度',
		type: 'input',
	},
	{
		valName: 'description',
		label: '描述',
		type: 'textarea',
	},
]

export default {
	tableConf,
	tableActConf,
	addFormConf,
	filterFormConf,
}