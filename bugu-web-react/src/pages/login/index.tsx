import React from 'react'
import './index.less'
import {Form, Input, Button} from 'antd';
import {useHistory} from 'react-router-dom'
import Logo from "../../components/logo";

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const tailLayout = {
    wrapperCol: {offset: 11, span: 14},
};

const Login = () => {
    let history = useHistory()

    const onFinish = (values: any) => {
        history.push(`/systemManage/roleManage`)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className="login">
            <div className="loginBox">
                <div className="logo">
                    <Logo></Logo>
                </div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
