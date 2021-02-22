import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routes from '@/router/routes'
import vuex from '@/store/index'

Vue.use(Router)

// 路由配置
const RouterConfig = {
	// mode: 'history', //开启mode="history"模式，需要服务端的支持.
	routes // 引入组件配置变量
}

// 路由跳转前
const router = new Router(RouterConfig) // 创建新的vue-router实例
router.beforeEach((to, from, next) => {
	let token = !sessionStorage.getItem('token'),
		path = to.path
	if (token && path == '/login') {
		next()
	} else if (token && path != '/login') {
		next({
			path: '/login'
		})
	} else {
		next()
	}
})

//路由跳转后执行
// router.afterEach((to) => {});

// 抛出router实例
export default router