const tableConf = [{ // 表格配置
		prop: 'iccid',
		label: 'ICCID',
		type: 'data'
	},
	{
		prop: 'snCode',
		label: 'sn码',
		type: 'data'
	},
	{
		prop: 'pkgName',
		label: '套餐名称',
		type: 'data'
	},
	{
		prop: 'totalFlow',
		label: '套餐总流量(MB)',
		type: 'data'
	},
	{
		prop: 'usedFlow',
		label: '套餐已使用流量(MB)',
		type: 'data'
	},
	{
		prop: 'status',
		label: '状态',
		type: 'data',
		dealMethod: 'dealSimStatus'
	},
	{
		prop: 'activeTime',
		label: '激活时间',
		type: 'data',
		dealMethod: 'dealTime'
	},
	{
		prop: 'overFlow',
		label: '是否超额',
		type: 'data',
		dealMethod: 'dealBoolean'
	},
]

const tableActConf = [{ // 表格操作栏配置
	label: '操作',
	child: [{
		label: '停机',
		methodsName: 'handleCloseSim',
	}, {
		label: '复机',
		methodsName: 'handleOpenSim'
	}, {
		label: '详情',
		methodsName: 'handleGoInfo'
	}],
}]

const filterFormConf = [{ // 筛选组件配置文件
		valName: 'iccid',
		type: 'input',
		plh: 'ICCID'
	},
	{
		valName: 'snCode',
		type: 'input',
		plh: 'sn码'
	},
	{
		valName: 'overFlow',
		plh: '是否超额',
		type: 'select',
		selValue: 'value',
		seLabel: 'label',
		selectList: [{
			value: 'true',
			label: '是',
		}, {
			value: 'false',
			label: '否',
		}]
	},
	{
		valName: 'status',
		plh: '状态',
		type: 'select',
		selValue: 'value',
		seLabel: 'label',
		selectList: [{
			value: '00',
			label: '正常',
		}, {
			value: '02',
			label: '停机',
		}, {
			value: '04',
			label: '销号',
		}, {
			value: '07',
			label: '待激活',
		}, {
			value: '98',
			label: '其它',
		}]
	}
]

const addFormConf = [{ // 新增组件配置文件
		valName: 'name',
		label: '用户名',
		type: 'input',
		plh: '用户名'
	},
	{
		valName: 'phone',
		label: '手机号',
		type: 'input',
		plh: '手机号'
	},
	{
		valName: 'roleId',
		label: '所属角色',
		plh: '所属角色',
		type: 'select',
		selValue: 'id',
		seLabel: 'name',
		selectList: []
	},
	{
		valName: 'state',
		label: '状态',
		plh: '状态',
		type: 'switch',
		selectList: [{
			value: 'Y',
			label: '启用'
		}, {
			value: 'N',
			label: '禁用'
		}]
	},
]

export default {
	tableConf,
	tableActConf,
	addFormConf,
	filterFormConf,
}