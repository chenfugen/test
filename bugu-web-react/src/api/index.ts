const App={
    common: {
        login: '/api/web/account/login', // 登录
        common_getCheckCode: '/web/api/common/getCheckCode', // 获取验证码
    },
    device: {

    },
    system: {
        model_series_list:'/api/web/get/list', // 测试数据
        model_role_permission:'/api/web/get/role/permission',
    },
    file: {
        file_read: '/api/file/read', //读取文件
    }
}


export default App
