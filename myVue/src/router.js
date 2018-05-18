import index from './components/index.vue'
import user from './components/user.vue'
import find from './components/find.vue'
import cart from './components/cart.vue'

var routes = [
   {
		path: "/user",
		component:user 
	},
	{
		path: "/find",
		component:find 
	},
	{
		path: "/cart",
		component:cart 
	},
	{
		path: "/",
		component: index
	}
]

export default routes