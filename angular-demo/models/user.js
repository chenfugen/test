//给数据创建模型
var mongoose=require('mongoose');

var usersSchema=require('../schemas/users');

module.exports=mongoose.model('user',usersSchema);