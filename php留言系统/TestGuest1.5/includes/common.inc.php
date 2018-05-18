<?php
/**
* TestGuest Version1.0
* ================================================
* Copy 2010-2012 yc60
* Web: http://www.yc60.com
* ================================================
* Author: Lee
* Date: 2010-8-10
*/
//防止恶意调用
if (!defined('IN_TG')) {
	exit('Access Defined!');
}

//设置字符集编码
header('Content-Type: text/html; charset=utf-8');

//转换硬路径常量
define('ROOT_PATH',substr(dirname(__FILE__),0,-8));

//创建一个自动转义状态的常量
define('GPC',get_magic_quotes_gpc());

//拒绝PHP低版本
if (PHP_VERSION < '4.1.0') {
	exit('Version is to Low!');
}

//引入核心函数库
require ROOT_PATH.'includes/global.func.php';

//执行耗时
define('START_TIME',_runtime());
//$GLOBALS['start_time'] = _runtime();

//数据库连接
define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PWD','yangfan');
define('DB_NAME','testguest');

//创建数据库连接
$_conn = @mysql_connect(DB_HOST,DB_USER,DB_PWD) or die('数据里连接失败');

//选择一款数据库
mysql_select_db(DB_NAME) or die('指定的数据库不存在');

//选择字符集
mysql_query('SET NAMES UTF8') or die('字符集错误');




?>