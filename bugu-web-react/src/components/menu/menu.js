const menuList = [
    {
        "children":[
            {
                "name":"产品管理",
                "checked":true,
                "childId":"productManage"
            },
        ],
        "name":"产品管理",
        "checked":true,
        "icon":"icon-asset",
        "moduleId":"productManage"
    },
    {
        "children":[
            {
                "name":"单位管理",
                "checked":true,
                "childId":"organization"
            },
            {
                "name":"部门管理",
                "checked":true,
                "childId":"department"
            }
        ],
        "name":"组织管理",
        "checked":true,
        "icon":"icon-organize1",
        "moduleId":"organizeManage"
    },
    {
        "children":[],
        "name":"报表统计",
        "checked":true,
        "icon":"icon-column",
        "moduleId":"parentColumn"
    },
    {
        "children":[
            {
                "name":"角色管理",
                "checked":true,
                "childId":"roleManage"
            }, {
                "name":"账户管理",
                "checked":true,
                "childId":"accountManage"
            }, {
                "name":"日志管理",
                "checked":true,
                "childId":"logManage"
            }
        ],
        "name":"系统管理",
        "checked":true,
        "icon":"icon-system",
        "moduleId":"systemManage"
    }
]
export default menuList;