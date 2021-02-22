// 基本布局不用按需加载
import BasicLayout from '@/layouts/BasicLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'
// 组件导入（懒加载格式）
// const Login = () =>
// 	import('@/views/User/UserLogin.vue')
const Register = () =>
	import('@/views/User/UserRegister.vue')
const Map = () =>
	import('@/views/MapChart/Map.vue')
//登录页
const Login = () =>
	import ('@/views/login')
//账户管理
const Account = () =>
	import ('@/views/System/account')
//角色管理
const Role = () =>
	import ('@/views/System/role')
//权限管理
const Menu = () =>
	import ('@/views/System/menu')
// OTA升级
// 升级任务
const UpgradeTask = () =>
	import ('@/views/OtaUpgrade/upgradeTask')
// 固件管理
const Firmware = () =>
	import ('@/views/OtaUpgrade/firmware')
// 流量卡管理
// 网卡管理
const SIM = () =>
import ('@/views/SimCard/sim')
// 网卡使用情况
const SIMInfo = () =>
	import ('@/views/SimCard/simInfo')
// 固件管理
const SIMData = () =>
	import ('@/views/SimCard/simData')


// 路由配置
export default [
	// 用户登录注册界面的布局
	{
		path: '/user',
		component: UserLayout,
		children: [{
				path: '/',
				redirect: '/login',
			},
			{
				path: '/login',
				name: 'login',
				component: Login,
			},
			{
				path: '/user/register',
				name: 'register',
				component: Register,
			}
		]
	},
	// 根路径布局，其他模块挂在基本布局下
	{
		path: '/',
		name: 'home',
		component: BasicLayout,
		children: [{
			path: '/mapchart/map',
			name: 'map',
			component: Map
		}, {
			path: '/account',
			name: 'account',
			component: Account,
			meta: {
				breadcrumb: 'account',
				module: '系统管理',
				name: '账号管理',
			}
		}, {
			path: '/role',
			name: 'role',
			component: Role,
			meta: {
				breadcrumb: 'role',
				module: '系统管理',
				name: '角色管理',
			}
		}, {
			path: '/menu',
			name: 'menu',
			component: Menu,
			meta: {
				breadcrumb: 'menu',
				module: '系统管理',
				name: '菜单管理',
			}
		}, {
			path: '/upgradeTask',
			name: 'upgradeTask',
			component: UpgradeTask,
			meta: {
				breadcrumb: 'upgradeTask',
				module: '固件升级',
				name: '升级任务',
			}
		}, {
			path: '/firmware',
			name: 'firmware',
			component: Firmware,
			meta: {
				breadcrumb: 'firmware',
				module: '固件升级',
				name: '固件管理',
			}
		}, {
			path: '/sim',
			name: 'sim',
			component: SIM,
			meta: {
				breadcrumb: 'sim',
				module: '流量卡管理',
				name: '网卡管理',
			}
		}, {
			path: '/sim/info',
			name: 'simInfo',
			component: SIMInfo,
			meta: {
				breadcrumb: 'simInfo',
				module: '流量卡管理',
				name: '网卡详情',
			}
		}, {
			path: '/data',
			name: 'data',
			component: SIMData,
			meta: {
				breadcrumb: 'data',
				module: '流量卡管理',
				name: '流量池数据',
			}
		}],
	}
]