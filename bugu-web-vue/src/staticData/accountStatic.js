import city from './city'

const tableConf = [{ // 表格配置
		prop: 'name',
		label: '用户名',
		type: 'data'
	},
	{
		prop: 'roleName',
		label: '角色类型',
		type: 'data'
	},
	{
		prop: 'createTime',
		label: '创建时间',
		type: 'data',
		dealMethod: 'dealTime'
	},
	{
		prop: 'state',
		label: '状态',
		type: 'data',
		dealMethod: 'dealStatus'
	},
]

const tableActConf = [{ // 表格操作栏配置
	label: '操作',
	child: [{
		label: '编辑',
		methodsName: 'handleEdit'
	}, {
		label: '修改密码',
		methodsName: 'handleEditPwd'
	}, {
		label: '删除',
		methodsName: 'handleDelete'
	}],
}]

const filterFormConf = [{ // 筛选组件配置文件
		valName: 'userName',
		type: 'input',
		plh: '用户名'
	},
	{
		valName: 'roleName',
		plh: '所属角色',
		type: 'select',
		selValue: 'id',
		seLabel: 'name',
		selectList: []
	}
]

const addFormConf = [{ // 筛选组件配置文件
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