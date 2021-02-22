import React from 'react'
import { useHistory,useLocation } from 'react-router-dom'
import {Menu} from 'antd';
import menuList from './menu'
import { MailOutlined } from '@ant-design/icons';

const {SubMenu} = Menu;
interface MenuDto {
    name: string
    moduleId: string
    icon: String
    children?: Array<any>
}
const CommonMenu = () => {
    let history = useHistory()
    let location = useLocation()
    let parms=(location.pathname).split("/")
    let openKeys=parms.length>2?parms[1]:""
    let selectKey=parms.length>2?parms[2]:parms[1]
    const handleMenuClick = function (e: any) {
        let url=(e.keyPath).length>1?"/"+(e.keyPath)[1]+"/"+(e.keyPath)[0]:"/"+e.key
        history.push(url)
    }
    return (
        <div>
            <Menu
                defaultSelectedKeys={[selectKey]}
                defaultOpenKeys={[openKeys]}
                mode="inline"
                theme="dark"
                onClick={handleMenuClick}
            >
                {
                    menuList.map((c:MenuDto, index:number) => {
                            if ((c.children ||[]).length > 0) {
                                return (
                                    <SubMenu key={c.moduleId} icon={<MailOutlined />} title={c.name} >
                                        {
                                            (c.children||[]).map((i:any, key:number) => <Menu.Item
                                                key={i.childId}>
                                                {i.name}
                                            </Menu.Item>)
                                        }
                                    </SubMenu>
                                )
                            } else {
                                return (
                                    <Menu.Item key={c.moduleId} icon={<MailOutlined />} >
                                         <span className="moduleId">{c.name}</span>
                                    </Menu.Item>
                                )
                            }
                        }
                    )
                }
            </Menu>
        </div>
    )
}

// @ts-ignore
export default CommonMenu
