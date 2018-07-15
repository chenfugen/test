var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
        //res.send() 添加内容
    if(req.cookies.get("userInfo")){
        req.userInfo.username=new Buffer(req.userInfo.username, 'base64').toString();
    }else{
        console.log( req.userInfo.username);
    }
    res.render('index',{
         userInfo:req.userInfo
    });
});
module.exports = router;
