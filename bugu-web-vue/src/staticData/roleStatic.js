const editFormConf = [{ // 编辑表单
		valName: 'name',
		label: '角色名称',
		type: 'input',
		plh: '角色名称'
	},
	{
		valName: 'state',
		label: '状态',
		plh: '状态',
		type: 'switch',
		selectList: [{
				value: 'Y',
				label: '启用'
			},
			{
				value: 'N',
				label: '禁用'
			}
		]
	},
	{
		valName: 'isRoot',
		label: '是否为root',
		plh: '是否为root',
		type: 'switch',
		selectList: [{
				value: 'Y',
				label: '是'
			},
			{
				value: 'N',
				label: '否'
			}
		]
	},
	{
		valName: 'description',
		label: '备注',
		plh: '备注',
		type: 'input',
	}
]
const addFormConf = [{ // 编辑表单
		valName: 'name',
		label: '菜单名称',
		type: 'input',
		plh: '菜单名称'
	},
	{
		valName: 'state',
		label: '状态',
		plh: '状态',
		type: 'switch',
		selectList: [{
				value: 'Y',
				label: '启用'
			},
			{
				value: 'N',
				label: '禁用'
			}
		]
	},
	{
		valName: 'isRoot',
		label: '是否为root',
		plh: '是否为root',
		type: 'switch',
		selectList: [{
				value: 'Y',
				label: '是'
			},
			{
				value: 'N',
				label: '否'
			}
		]
	},
	{
		valName: 'description',
		label: '备注',
		plh: '备注',
		type: 'input',
	}
]
const filterFormConf = [{ // 筛选组件配置文件
		valName: 'name',
		type: 'input',
		plh: '角色名称'
	},
	{
		valName: 'isRoot',
		plh: '是否为root',
		type: 'select',
		selectList: [{
				value: 'N',
				label: '否'
			},
			{
				value: 'Y',
				label: '是'
			}
		]
	},
	{
		valName: 'state',
		plh: '状态',
		type: 'select',
		selectList: [{
				value: 'N',
				label: '禁用'
			},
			{
				value: 'Y',
				label: '启用'
			}
		]
	}
]
const tableConf = [{ // 表格配置
		prop: 'name',
		label: '角色名称',
	},
	{
		prop: 'state',
		label: '状态',
		dealMethod: 'dealStatus'
	},
	{
		prop: 'isRoot',
		label: '是否为root',
		dealMethod: 'dealYes'
	},
	{
		prop: 'description',
		label: '备注',
	}
]

const tableActConf = [{ // 表格操作栏配置
	label: '操作',
	child: [{
			label: '编辑',
			methodsName: 'handleEdit'
		},
		{
			label: '编辑权限',
			methodsName: 'handleEditPer',
			judgeFun: 'judgeEditPer'
		}
	]
}]
export default {
	editFormConf,
	addFormConf,
	filterFormConf,
	tableActConf,
	tableConf,
}