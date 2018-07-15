//给数据创建模型
var mongoose=require('mongoose');

var usersSchema=require('../schemas/category');

module.exports=mongoose.model('category',usersSchema);