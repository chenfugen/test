<?php
/**
* TestGuest Version1.0
* ================================================
* Copy 2010-2012 yc60
* Web: http://www.yc60.com
* ================================================
* Author: Lee
* Date: 2010-8-13
*/
session_start();

//随机码的个数
$_rnd_code = 4;

//创建随机码
for ($i=0;$i<$_rnd_code;$i++) {
	$_nmsg .= dechex(mt_rand(0,15));
}

//保存在session
$_SESSION['code'] = $_nmsg;

//长和高
$_width = 75;
$_height = 25;

//创建一张图像
$_img = imagecreatetruecolor($_width,$_height);

//白色
$_white = imagecolorallocate($_img,255,255,255);

//填充
imagefill($_img,0,0,$_white);

$_flag = false;

if ($_flag) {
	//黑色,边框
	$_black = imagecolorallocate($_img,0,0,0);
	imagerectangle($_img,0,0,$_width-1,$_height-1,$_black);
}

//随即画出6个线条
for ($i=0;$i<6;$i++) {
	$_rnd_color = imagecolorallocate($_img,mt_rand(0,255),mt_rand(0,255),mt_rand(0,255));
	imageline($_img,mt_rand(0,$_width),mt_rand(0,$_height),mt_rand(0,$_width),mt_rand(0,$_height),$_rnd_color);
}

//随即雪花
for ($i=0;$i<100;$i++) {
	$_rnd_color = imagecolorallocate($_img,mt_rand(200,255),mt_rand(200,255),mt_rand(200,255));
	imagestring($_img,1,mt_rand(1,$_width),mt_rand(1,$_height),'*',$_rnd_color);
}

//输出验证码
for ($i=0;$i<strlen($_SESSION['code']);$i++) {
	$_rnd_color = imagecolorallocate($_img,mt_rand(0,100),mt_rand(0,150),mt_rand(0,200));
	imagestring($_img,5,$i*$_width/$_rnd_code+mt_rand(1,10),mt_rand(1,$_height/2),$_SESSION['code'][$i],$_rnd_color);
}

//输出图像
header('Content-Type: image/png');
imagepng($_img);

//销毁
imagedestroy($_img);






?>