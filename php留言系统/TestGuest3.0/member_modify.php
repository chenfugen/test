<?php
/**
* TestGuest Version1.0
* ================================================
* Copy 2010-2012 yc60
* Web: http://www.yc60.com
* ================================================
* Author: Lee
* Date: 2010-9-2
*/
session_start();
//定义个常量，用来授权调用includes里面的文件
define('IN_TG',true);
//定义个常量，用来指定本页的内容
define('SCRIPT','member_modify');
//引入公共文件
require dirname(__FILE__).'/includes/common.inc.php';
//修改资料
if ($_GET['action'] == 'modify') {
	echo '修改';
}
//是否正常登录
if (isset($_COOKIE['username'])) {
	//获取数据
	$_rows = _fetch_array("SELECT tg_username,tg_sex,tg_face,tg_email,tg_url,tg_qq FROM tg_user WHERE tg_username='{$_COOKIE['username']}'");
	if ($_rows) {
		$_html= array();
		$_html['username'] = $_rows['tg_username'];
		$_html['sex'] = $_rows['tg_sex'];
		$_html['face'] = $_rows['tg_face'];
		$_html['email'] = $_rows['tg_email'];
		$_html['url'] = $_rows['tg_url'];
		$_html['qq'] = $_rows['tg_qq'];
		$_html = _html($_html);
		
		//性别选择
		if ($_html['sex'] == '男') {
			$_html['sex_html'] = '<input type="radio" name="sex" value="男" checked="checked" /> 男 <input type="radio" name="sex" value="女" /> 女';
		} elseif ($_html['sex'] == '女') {
			$_html['sex_html'] = '<input type="radio" name="sex" value="男" /> 男 <input type="radio" name="sex" value="女" checked="checked" /> 女';
		}
		
		//头像选择
		$_html['face_html'] = '<select name="face">';
		foreach (range(1,9) as $_num) {
			$_html['face_html'] .= '<option value="face/m0'.$_num.'.gif">face/m0'.$_num.'.gif</option>';
		}
		foreach (range(10,64) as $_num) {
			$_html['face_html'] .= '<option value="face/m'.$_num.'.gif">face/m'.$_num.'.gif</option>';
		}
		$_html['face_html'] .= '</select>';
	} else {
		_alert_back('此用户不存在');
	}
} else {
	_alert_back('非法登录');
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>多用户留言系统--个人中心</title>
<?php 
	require ROOT_PATH.'includes/title.inc.php';
?>
<script type="text/javascript" src="js/code.js"></script>
<script type="text/javascript" src="js/member_modify.js"></script>
</head>
<body>
<?php 
	require ROOT_PATH.'includes/header.inc.php';
?>

<div id="member">
<?php 
	require ROOT_PATH.'includes/member.inc.php';
?>
	<div id="member_main">
		<h2>会员管理中心</h2>
		<form method="post" action="?action=modify">
		<dl>
			<dd>用 户 名：<?php echo $_html['username']?></dd>
			<dd>性　　别：<?php echo $_html['sex_html']?></dd>
			<dd>头　　像：<?php echo $_html['face_html']?></dd>
			<dd>电子邮件：<input type="text" class="text" name="email" value="<?php echo $_html['email']?>" /></dd>
			<dd>主　　页：<input type="text" class="text" name="url" value="<?php echo $_html['url']?>" /></dd>
			<dd>Q 　 　Q：<input type="text" class="text" name="qq" value="<?php echo $_html['qq']?>" /></dd>
			<dd>验 证 码：<input type="text" name="code" class="text yzm"  /> <img src="code.php" id="code" /></dd>
			<dd><input type="submit" class="submit" value="修改资料" /></dd>
		</dl>
		</form>
	</div>
</div>


<?php 
	require ROOT_PATH.'includes/footer.inc.php';
?>
</body>
</html>
