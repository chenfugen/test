var mongoose=require('mongoose');
//定义用户的表数据结构
module.exports=new mongoose.Schema({
    //用户名
    username:String ,
    //密码
    password:String,
    //管理员标记
   isAdmin:{
        type:Boolean ,
        default:false
   }


})
