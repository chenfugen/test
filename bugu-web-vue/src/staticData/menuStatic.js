const infoFormConf = [{
		valName: 'name',
		label: '菜单名称',
		type: 'input',
		plh: '菜单名称',
		disabled: true,
	},
	{
		valName: 'url',
		disabled: true,
		label: '请求地址',
		plh: '页面路径或请求地址',
		type: 'textarea',
	},
	{
		valName: 'sortNum',
		disabled: true,
		label: '排序号',
		plh: '排序号',
		type: 'input',
	},
	{
		valName: 'state',
		disabled: true,
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
]
const editFormConf = [{ // 编辑表单
		valName: 'name',
		label: '菜单名称',
		type: 'input',
		plh: '菜单名称'
	},
	{
		valName: 'url',
		label: '请求地址',
		plh: '页面路径或请求地址',
		type: 'textarea',
	},
	{
		valName: 'sortNum',
		label: '排序号',
		plh: '排序号',
		type: 'input',
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
]
const addFormConf = [{ // 添加表单
		valName: 'name',
		label: '菜单名称',
		type: 'input',
		plh: '菜单名称'
	},
	{
		valName: 'url',
		label: '请求地址',
		plh: '页面路径或请求地址（若无请填写#）',
		type: 'textarea',
	},
	{
		valName: 'sortNum',
		label: '排序号',
		plh: '排序号',
		type: 'input',
	},
	{
		valName: 'icon',
		label: '菜单图标',
		plh: '菜单图标',
		type: 'input',
	},
	{
		valName: 'isMainMenu',
		label: '是否为主菜单',
		plh: '是否为主菜单',
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
]
const filterFormConf = [{ // 筛选组件配置文件
		valName: 'name',
		type: 'input',
		plh: '菜单名称'
	},
	{
		valName: 'isOperation',
		plh: '是否操作菜单',
		type: 'select',
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
		label: '菜单名称',
		dealMethod: 'dealNullData'
	},
	{
		prop: 'state',
		label: '状态',
		dealMethod: 'dealStatus'
	},
	{
		prop: 'treeNum',
		label: '菜单等级',
		dealMethod: 'dealNullData'
	},
	{
		prop: 'icon',
		label: '菜单图标',
		dealMethod: 'dealNullData'
	},
	{
		prop: 'isMainMenu',
		label: '是否为主菜单',
		dealMethod: 'dealYes'
	},
	{
		prop: 'isOperation',
		label: '是否操作菜单',
		dealMethod: 'dealYes'
	},
]

const tableActConf = [{ // 表格操作栏配置
	label: '操作',
	child: [{
			label: '编辑',
			methodsName: 'handleEdit'
		}, {
			label: '详情',
			methodsName: 'handleInfo'
		},
		{
			label: '添加子菜单',
			methodsName: 'handleCreateChild'
		},
		{
			label: '查看子菜单',
			methodsName: 'getChildList'
		}
	],
}]
export default {
	infoFormConf,
	editFormConf,
	addFormConf,
	filterFormConf,
	tableConf,
	tableActConf,
}