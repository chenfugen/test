const tableConf = [{ // 表格配置
		prop: 'taskName',
		label: '任务名称',
		type: 'data'
	},
	{
		prop: 'type',
		label: '任务类型',
		type: 'data',
		dealMethod: 'dealFirmwareType'
	},
	{
		prop: 'upgradableVersion',
		label: '起始版本',
		type: 'data',
	},
	{
		prop: 'targetVersion',
		label: '目标版本',
		type: 'data',
	},
	{
		prop: 'productModel',
		label: '产品型号',
		type: 'data',
	},
	{
		prop: 'upgradeWay',
		label: '升级方式',
		type: 'data',
		dealMethod: 'dealUpgradeType'
	},
	{
		prop: 'upgradeAll',
		label: '升级设备',
		type: 'data',
		dealMethod: 'dealUpgradeAll'
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
		methodsName: 'handleEdit',
		judgeFun: 'judgeEditDisbale'
	}, {
		label: '停用',
		methodsName: 'handleForbidden',
		actBtnStyle: 'forbiddenBtnStyle',
		actBtnName: 'forbiddenBtnName',
	}, {
		label: '查看设备',
		methodsName: 'handleChooseDevice',
		judgeFun: 'judgeDeviceDisbale'
	}, {
		label: '删除',
		methodsName: 'handleDelete',
		actBtnStyle: 'deleteBtnStyle'
	}],
}]

const filterFormConf = [{ // 筛选组件配置文件
		valName: 'targetVersion',
		type: 'input',
		plh: '起始版本号'
	},
	{
		valName: 'upgradableVersion',
		type: 'input',
		plh: '目标版本号'
	},
	{
		valName: 'status',
		plh: '任务状态',
		type: 'select',
		selValue: 'value',
		seLabel: 'label',
		selectList: [{
			value: '1',
			label: '启用',
		}, {
			value: '0',
			label: '禁用',
		}]
	},
	{
		valName: 'productKey',
		plh: '产品型号',
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
		plh: '任务类型',
		type: 'select',
		selValue: 'value',
		seLabel: 'label',
		selectList: [{
			value: '1',
			label: '模组',
		}, {
			value: '2',
			label: '主板',
		}]
	},
	{
		valName: 'upgradeWay',
		plh: '升级方式',
		type: 'select',
		selValue: 'value',
		seLabel: 'label',
		selectList: [{
			value: '1',
			label: '强制',
		}, {
			value: '2',
			label: '非强制',
		}]
	}
]

const formConf = [{ // 筛选组件配置文件
		valName: 'taskName',
		label: '任务名称',
		type: 'input',
	},
	{
		valName: 'type',
		label: '任务类型',
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
		valName: 'upgradeWay',
		label: '升级方式',
		type: 'select',
		selValue: 'value',
		seLabel: 'label',
		selectList: [{
			value: 1,
			label: '强制',
		}, {
			value: 2,
			label: '非强制',
		}]
	},
]

export default {
	tableConf,
	tableActConf,
	formConf,
	filterFormConf,
}