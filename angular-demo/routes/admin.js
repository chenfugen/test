var express = require('express');
var url = require("url");
var router = express.Router();

var User=require("../models/user");
var Category=require("../models/category");

/* GET home page. */

    //res.send() 添加内容main
    //渲染页面
    router.use(function (req,res,next) {
        if(!req.userInfo.isAdmin){
            res.send("对不起，只有管理员才有权限打开后台管理系统！")
            return;
        }
        next();
    })
router.get('/', function(req, res, next) {
    if(req.cookies.get("userInfo")){
        req.userInfo.username=new Buffer(req.userInfo.username, 'base64').toString();
    }else{
        console.log( req.userInfo.username);
    }
    res.render("admin/index",{
        userInfo:req.userInfo,
        pathname:url.parse(req.url).pathname
    });
});
router.get('/user', function(req, res, next) {
    //转义中文字符
    if(req.cookies.get("userInfo")){
        req.userInfo.username=new Buffer(req.userInfo.username, 'base64').toString();
    }else{
        console.log( req.userInfo.username);
    }
    //获取路由地址
    var pathname = url.parse(req.url).pathname;

    /*
     从数据库获取数据
     limit() 限制获取的数据条数
     skip(2) 忽略的数据条数
     */
    var pageSize=2; //每页数量
    var page=Number(req.query.page || 1);  //当前的页数
    User.count().then(function (count) {
        var pages=count; //数据总数
        var pageNum=Math.ceil(pages/pageSize);  //总页数
         page=Math.max(page,1); //页数不小于1
         page=Math.min(page,pageNum); //页数不大于1
        var skip=(page-1)*pageSize //忽略数量
        User.find().sort().limit(pageSize).skip(skip).then(function (users){
            res.render("admin/user",{
                userInfo:req.userInfo,
                userList:users,
                pathname:url.parse(req.url).pathname,
                pages:pages,
                pageSize:pageSize,
                page:page,
                pageNum:pageNum
            });
        })
    })
});
//分类首页
router.get('/category',function (req,res,next) {
    //获取路由地址
    var pathname = url.parse(req.url).pathname;

    /*
     从数据库获取数据
     limit() 限制获取的数据条数
     skip(2) 忽略的数据条数
     */
    var pageSize=2; //每页数量
    var page=Number(req.query.page || 1);  //当前的页数
    Category.count().then(function (count) {
        var pages=count; //数据总数
        var pageNum=Math.ceil(pages/pageSize);  //总页数
        page=Math.max(page,1); //页数不小于1
        page=Math.min(page,pageNum); //页数不大于1
        var skip=(page-1)*pageSize //忽略数量
        Category.find().sort().limit(pageSize).skip(skip).then(function (category){
            res.render('admin/category',{
                userInfo:req.userInfo,
                categories:category,
                pathname:url.parse(req.url).pathname,
                pages:pages,
                pageSize:pageSize,
                page:page,
                pageNum:pageNum
            });
        })
    })
})
//分类添加页面
router.get('/category/add',function (req,res,next) {
    res.render('admin/category_add',{
        userInfo:req.userInfo,
        pathname:url.parse(req.url).pathname
    })
})
//分类添加请求
router.post('/category/add',function (req,res,next) {
    var name=req.body.name || '';
       if (name==''){
           res.render("admin/common/error",{
               userInfo:req.userInfo,
               pathname:url.parse(req.url).pathname,
               errorMsg:"您添加的内容为空"
           })
       }
    Category.findOne({
        name:name
    }).then(function (msg) {
        console.log(msg);
        if(msg==null){
            return  new Category({
                      name:name
                    }).save();
        }else{
            res.render("admin/common/error",{
                userInfo:req.userInfo,
                pathname:url.parse(req.url).pathname,
                errorMsg:"该分类已存在"
            })
          return Promise.reject();
        }
    }).then(function (newCategory) {
        res.render("admin/common/success",{
            userInfo:req.userInfo,
            pathname:url.parse(req.url).pathname,
            successMsg:"添加分类成功"
        })
    }).catch(function (error) {//加上catch
        console.log(error);
    })
})

//分类修改
router.get('/category/edit',function (req,res,next) {
    var id=req.query.id || '';
    Category.findOne({
        _id:id
    }).then(function (msg) {
        if(!msg){
            res.render("admin/common/error",{
                userInfo:req.userInfo,
                pathname:url.parse(req.url).pathname,
                errorMsg:"该分类不存在"
            })
            return Promise.reject();
        }else{
            res.render("admin/category_edit",{
                userInfo:req.userInfo,
                pathname:url.parse(req.url).pathname,
                category:msg
            })
        }
    }).catch(function (error) {//加上catch
        console.log(error);
    })
})

//分类删除
router.get('/category/delete',function (req,res,next) {
    var id=req.query.id || '';
    Category.findOne({
        _id:id
    }).then(function (msg) {
        console.log(msg);
        if(!msg){
            res.render("admin/common/error",{
                userInfo:req.userInfo,
                pathname:url.parse(req.url).pathname,
                errorMsg:"该分类不存在"
            })
            return Promise.reject();
        }else{
            res.render("admin/category_delete",{
                userInfo:req.userInfo,
                pathname:url.parse(req.url).pathname,
                category:msg
            })
        }
    }).catch(function (error) {//加上catch
        console.log(error);
    })
})

//分类删除

module.exports = router;