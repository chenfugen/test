import {Layout} from 'antd'
import React from 'react'
import './index.less'
import CommonHeader from './header'
import CommonSider from './sider'
import {Switch, Route} from 'react-router-dom'

const {Content, Footer} = Layout

const BasicLayout = (props: any) => {
    return (
        <>
            <Layout>
                <CommonSider></CommonSider>
                <Layout>
                    <CommonHeader></CommonHeader>
                    <Content className='main-container'>
                        <Switch>
                            {props.routes.map((route: any, i: number) => (
                                <RouteWithSubRoutes key={i} {...route} />
                            ))}
                            <Route path='*'>not found</Route>
                        </Switch>
                    </Content>
                    <Footer className='main-footer'>Copyright © 2021 HadLinks. All rights reserved.</Footer>
                </Layout>
            </Layout>
        </>
    )
}

function RouteWithSubRoutes(route: any) {
    return (
        <Route
            path={route.path}
            render={(props) => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes}/>
            )}
        />
    )
}

export default BasicLayout
