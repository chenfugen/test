import login from '../pages/login'
import  BasicLayout from '../pages/layout'
import roleManage from "../pages/system/role";

const routes = [
  {
    path: '/',
    exact: true,
    component: login
  },
  {
    path: '/',
    component: BasicLayout,
    routes: [
      {
        path: '/systemManage/roleManage',
        exact: true,
        component: roleManage
      },
    ]
  }
]

export default routes
