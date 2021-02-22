import { Layout } from 'antd'
import React from 'react'
import './header.less'
import './index.less'
import CommonMenu from '../../components/menu'
import Logo from "../../components/logo";

const { Sider } = Layout

const CommonSider = () => {
    return (
        <Sider>
            <div className="menuLogo">
                <Logo></Logo>
            </div>
            <CommonMenu></CommonMenu>
        </Sider>
    )
}

export default CommonSider
