/*权限数据处理函数集*/

/*获取默认展开的模块*/
export const getExpandedKeys=(data)=>{
    let jsonObj =[]
    data.map((item)=>{
        jsonObj.push(item.key || item.moduleId)
    })
    return jsonObj
}

/*转化成Ant Design要求的格式数据*/
export const changeTreeData=(data)=>{
    let jsonObj = data
    jsonObj.forEach((item)=>{
        item.moduleName && (item.title = item.moduleName)
        item.moduleId && (item.key = item.moduleId)
        item.child && (item.children = item.child)
        item.key || (item.key=item.url)
        delete item.moduleName
        delete item.moduleId
        if(item.child && Array.isArray(item.child)){
            item.children =changeTreeData(item.child)
             delete item.child
        }
    })
    return jsonObj
}

/**
 * 得到勾选完整（精确的模块）的数据权限
 *
 * @param {string} treeData 完整权限数
 * @param {string} treeCheckData 用户勾选数组
 * @return {Object} 去除非勾选的数组
 */
const dealTreeData=(treeData,treeCheckData)=>{
    let jsonObj =[]
    if(treeData.length>0 && treeCheckData.length>0){
        for (let i=0;i<treeData.length;i++){
            for (let j=0;j<treeCheckData.length;j++){
                if(treeData[i].key===treeCheckData[j]){
                    jsonObj.push(treeData[i])
                }
            }
        }
        return jsonObj
    }else{
        return []
    }
}

/**
 * 得到勾选完整（精确到页面）的数据权限
 *
 * @param {string} treeData 完整权限数
 * @param {string} treeCheckData 用户勾选数组
 * @return {Object} 最终数据权限
 */
export const getPermission=(treeData,treeCheckData)=>{
    let jsonObj =dealTreeData(treeData,treeCheckData);
    let data=JSON.parse(JSON.stringify(jsonObj)) //深拷贝
    for (let i in jsonObj) {
        data[i].children=[]
        for (let j in jsonObj[i].children) {
            for (let k in treeCheckData) {
                if(jsonObj[i].children[j].key===treeCheckData[k]){
                    data[i].children.push(jsonObj[i].children[j])
                }
            }
        }
    }
   return data
}



