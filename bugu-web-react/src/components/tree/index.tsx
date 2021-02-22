// @ts-ignore
import React, {useState} from 'react';
// @ts-ignore
import {Tree, Spin} from 'antd';
import './index.less'

const CommonTree = (props: any) => {
    let treeData = props.treeData;
    const defaultExpandedKeys = props.defaultExpandedKeys
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(props.checkedKeys);
    const onCheck = (checkedKeys: any, e: any): void => {
        let urls: any = []; //接口权限集合
        let permission: any = e.halfCheckedKeys;
        if (e.checkedNodes.length === 0) {
            props.getCheckData(e.checkedNodes, permission)
        } else {
            e.checkedNodes.forEach((item: any) => {
                if (item.url !== undefined) {
                    urls.push(item.url)
                    setCheckedKeys(urls)
                } else {
                    permission.push(item.key)
                    props.getCheckData(e.checkedNodes, permission) //获取所有选择（模块，页面，接口权限）
                }
            })
        }
    };

    return (
        <div className="treeBox">
            {
                treeData.length > 0 ?
                    <Tree
                        checkable
                        defaultExpandedKeys={defaultExpandedKeys}
                        defaultCheckedKeys={checkedKeys}
                        onCheck={onCheck}
                        treeData={treeData}
                    /> : <Spin size="large"/>
            }
        </div>
    );
};

export default CommonTree
