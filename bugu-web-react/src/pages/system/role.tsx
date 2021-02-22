import React,{useState,useEffect}  from 'react'
import { Button } from 'antd';
import CommonTree from '../../components/tree'
import api from '../../api'
import Axios from '../../axios'
import {getExpandedKeys,changeTreeData,getPermission} from '../../utils/changeTreeData'

const Test = () => {
    const [treeData,setTreeData]=useState<any>([])
    const [defaultExpandedKeys, setDefaultExpandedKeys] = useState<React.Key[]>([]); //默认展开项
    const [defaultCheckedKeys, setdefaultCheckedKeys] = useState<React.Key[]>(); //默认选中项
    const [treeCheckData, setTreeCheckData] = useState<any>([]); //传给后台保存的数据
    const [checkedKeys, setCheckedKeys] = useState<any>([]); //选中的模块以及页面（动态获取菜单栏时使用）

    //获取后台完整权限树
    const getTreeData=()=>{
        Axios.get(api.system.model_role_permission).then((res)=>{
            setDefaultExpandedKeys(getExpandedKeys(res.data0
            ))
            setTreeData(changeTreeData(res.data))
        })
    }
    //获取子级的数据
    const getCheckData=(checkedNodes:any,halfCheckedKeys:any)=>{
        setTreeCheckData(checkedNodes)
        setCheckedKeys(halfCheckedKeys)
    }

    const onOk=()=>{
        //处理前 （传给后台保存的数据）
        console.log(treeCheckData)
        //处理后 (后台获取用户菜单栏权限时使用)
       console.log(getPermission(treeData,checkedKeys))
    }
    useEffect(getTreeData, [])
    return (
        <div>
            <p><Button type="primary" onClick={onOk} >数据获取</Button></p>
            <CommonTree treeData={treeData} defaultExpandedKeys={defaultExpandedKeys} checkedKeys={defaultCheckedKeys} getCheckData={getCheckData}></CommonTree>
        </div>
    )
}
export default Test
