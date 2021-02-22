// 配置api地址（方便紧急api地址修改）
const api = {
	getToken: '/demo/getToken', // 测试用，获取token
	// 公共接口
	file_upload: '/api/file/upload',
	// 菜单
	menuAdd: '/api/web/menu/add', // 添加菜单
	menuOperationCode: '/api/web/menu/operation/code', // 获取操作菜单默认类型
	menuUpdate: '/api/web/menu/update', // 菜单修改
	menuTree: '/api/web/menu/tree', // 获取所有菜单
	menuPage: '/api/web/menu/page', // 所有菜单分页查询
	menuDetail: '/api/web/menu/detail', // 菜单详情
	// 角色
	roleAdd: '/api/web/role/add', // 添加角色
	roleUpdate: '/api/web/role/update', // 修改角色信息
	rolePage: '/api/web/role/page', // 角色信息分页查询
	roleMenuList: '/api/web/role/menu/update/list', // 获取角色菜单列表
	roleMenuUpdate: '/api/web/role/menu/update', //修改角色菜单列表
	// 管理员
	admin_page: '/api/web/admin/page', // 管理员列表
	admin_add: "/api/web/admin/add", // 添加管理员
	admin_account_exists: "/api/web/admin/account/exists", // 检验管理员账号是否存在
	admin_detail: "/api/web/admin/detail", // 获取账号详情
	admin_update: '/api/web/admin/update', // 修改账号信息
	reset_password: '/api/web/admin/reset/password', // 修改密码
	// 登录相关
	admin_login: '/api/web/admin/login', //登录
	code_image: '/api/web/verify/code/image', // 获取验证码
	code_check: '/api/web/verify/code/check', // 校验验证码
	// 固件升级
	ota_device_page: '/api/web/ota/device/page', // 固件设备分页
	ota_task_page: '/api/web/ota/task/page', // 固件任务分页
	ota_task_delete: '/api/web/ota/task/delete', // 删除固件任务
	ota_task_save: '/api/web/ota/task/save', // 保存固件任务
	ota_task_detail: '/api/web/ota/task/detail', // 固件任务详情
	ota_task_forbidden: '/api/web/ota/task/forbidden', //固件任务禁用/启用
	ota_firmware_save: '/api/web/ota/firmware/save', // 保存固件
	ota_firmware_list: '/api/web/ota/firmware/list', //固件列表(不分页)
	ota_firmware_page: '/api/web/ota/firmware/page', //固件列表
	ota_firmware_detail: '/api/web/ota/firmware/detail', //固件详情
	ota_firmware_delete: '/api/web/ota/firmware/delete',
	ota_firmware_forbidden: '/api/web/ota/firmware/forbidden', // 启用/禁用固件
	ota_device_list: '/api/web/ota/device/list', // 获取设备列表
	// 流量卡管理
	sim_card_page: '/api/web/simcard/page', //sim卡列表
	open_sim: '/api/web/simcard/openSim', //网卡复机
	close_sim: '/api/web/simcard/closeSim', //网卡停机
	sim_info_data: '/api/web/simcard/detail', //单卡详情
	sim_chart_data: '/api/web/simcard/chart' //单卡图表详情
}

export default api