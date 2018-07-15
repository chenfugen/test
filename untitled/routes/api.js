var express = require('express');
var router = express.Router();
var User=require('../models/user');
/* 用户注册
*  注册步骤
* 注册验证
*
* 1、用户名，密码等不能为空
* 2、用户是否被注册
*
* */

//统一返回格式
var responseData;
router.use(function(req,res,next){
    responseData={
        code:0 ,
        message:''
    }
    next();
});

router.post('/user/register', function(req, res, next) {
   // res.send("123") ;    //添加内容
   // res.render('index');
console.log(req.body);

     var username=req.body.username;
     var password=req.body.password;
     var repassword=req.body.repassword;

     //判断用户是否为空
     if(username==''){
         responseData.code=1;
         responseData.message="用户不能为空";
         res.json(responseData);
         return;
     };
    //密码用户是否为空
    if(password==''){
        responseData.code=2;
        responseData.message="密码不能为空";
        res.json(responseData);
        return;
    };
    //密码不一致
    if(password!=repassword){
        responseData.code=3;
        responseData.message="两次输入的密码不一致";
        res.json(responseData);
        return;
    };
    User.findOne({
        username:username
    }).then(function(userInfo){
        if(userInfo){
            //表示数据库中有该记录
            responseData.code =4;
            responseData.message = "用户名已经被注册";
            res.json(responseData);
            return;
        }
        //保存数据到数据库。
          var user=new User({
              username:username,
              password:password
          });
        return user.save();
    }).then(function(newUserInfo){
        if(typeof(newUserInfo)!="undefined")
        {
            responseData.message = "注册成功";
            res.json(responseData);
        }
    })
});

router.post('/user/login', function(req, res, next) {
    var username=req.body.username;
    var password=req.body.password;
    if(username=="" || password==""){
        responseData.code=1;
       responseData.message="用户名和密码不能为空";
       res.json(responseData);
       return;
    }
    //查询数据库是否存在用户
    User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){
        if(!userInfo){
            responseData.code=2;
            responseData.message="用户名或密码错误";
            res.json(responseData);
            return;
        }else{
            responseData.message="登录成功";
            responseData.userInfo={
                username:userInfo.username,
                uid:userInfo._id
            };
            req.cookies.set("userInfo",JSON.stringify({
                username:new Buffer(userInfo.username).toString('base64'),
                uid:userInfo._id
            }));
            res.json(responseData);
            return;
        }
    })
})

//退出
router.get('/user/loginout', function(req, res, next) {
    req.cookies.set("userInfo",null);
    responseData.message="退出成功";
    res.json(responseData);
    return;
});

module.exports = router;
