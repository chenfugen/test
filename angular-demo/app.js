   var  express=require("express");
   //引入处理模块
   var swig=require("swig");
   //加载数据库模块
   var mongoose=require('mongoose');
   //加载body-parser模块,用来处理post提交过来的请求。
   var bodyParser=require('body-parser');
   //引入cookie模块
   var Cookies=require('cookies');
   //引入user表
   var User=require('./models/user');

   //创建应用 类似 http.createServer();
   var app=express();
  //开发时禁止缓存
   swig.setDefaults({cache:false});
   //托管静态文件
   app.use('/public',express.static(__dirname+"/public"));
   //配置模板
   app.engine('html' , swig.renderFile);
   //导入html视图
   app.set('views','./views');

   //bodyParser设置
  app.use(bodyParser.urlencoded({extended:true}));
  
  //设置cookie
   app.use(function (req,res,next) {
        req.cookies=new Cookies(req,res);
       req.userInfo="";
        if(req.cookies.get("userInfo")){
         try {
               req.userInfo=JSON.parse(req.cookies.get("userInfo"));
               //获取当前用户的信息，判断是否是管理员
               User.findById(req.userInfo.uid).then(function (userInfo) {
                   req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
                   next();
               });
           }catch(e){
               next();
            }
        }else{
            next();
       }
       // console.log(req.cookies.get("userInfo"));
   });
    //视图与模板连接
   app.set('view engine', 'html');

   app.use('/',require('./routes/index'));
   app.use('/api',require('./routes/api'));
   app.use('/admin',require('./routes/admin'));

   // app.get('/', function(req, res, next) {
   //     res.render('index');
   // });


   mongoose.connect('mongodb://localhost:27018/nodeTest',function (err) {
       if(err){
          console.log("数据库连接失败");
       }else{
           console.log("数据库连接成功");
          app.listen(8081);
       }
   });


