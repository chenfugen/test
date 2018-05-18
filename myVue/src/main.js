import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueRouter from 'vue-router'
import routers from './router.js'
import App from './App.vue'


Vue.use(MintUI)
Vue.use(VueRouter)


var router = new VueRouter({
	routes: routers
})
new Vue({
	el: '#app',
	router,
	render: h => h(App)
})