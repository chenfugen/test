-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- 主机: localhost
-- 生成日期: 2010 年 08 月 22 日 08:30
-- 服务器版本: 5.0.51
-- PHP 版本: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- 数据库: `testguest`
-- 
CREATE DATABASE `testguest` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `testguest`;

-- --------------------------------------------------------

-- 
-- 表的结构 `tg_user`
-- 

CREATE TABLE `tg_user` (
  `tg_id` mediumint(8) unsigned NOT NULL auto_increment COMMENT '//用户自动编号',
  `tg_uniqid` char(40) NOT NULL COMMENT '//验证身份的唯一标识符',
  `tg_active` char(40) NOT NULL COMMENT '//激活登录用户',
  `tg_username` varchar(20) NOT NULL COMMENT '//用户名',
  `tg_password` char(40) NOT NULL COMMENT '//密码',
  `tg_question` varchar(20) NOT NULL COMMENT '//密码提示',
  `tg_answer` char(40) NOT NULL COMMENT '//密码回答',
  `tg_email` varchar(40) default NULL COMMENT '//邮件',
  `tg_qq` varchar(10) default NULL COMMENT '//QQ',
  `tg_url` varchar(40) default NULL COMMENT '//网址',
  `tg_sex` char(1) NOT NULL COMMENT '//性别',
  `tg_face` char(12) NOT NULL COMMENT '//头像',
  `tg_reg_time` datetime NOT NULL COMMENT '//注册时间',
  `tg_last_time` datetime NOT NULL COMMENT '//最后登录的时间',
  `tg_last_ip` varchar(20) NOT NULL COMMENT '//最后登录的IP',
  PRIMARY KEY  (`tg_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

-- 
-- 导出表中的数据 `tg_user`
-- 

INSERT INTO `tg_user` VALUES (5, '9bf40be3f04307790fc2e63996363dd40f446edd', '', '炎日', '7c4a8d09ca3762af61e59520943dc26494f8941b', '我家的狗狗', '4d5cf6a96cf8a438e3ae210bf7b2dac02b6fa1a4', 'bnbbs@163.com', '234234234', 'http://www.yc60.com', '男', 'face/m23.gif', '2010-08-18 22:26:31', '2010-08-18 22:26:31', '127.0.0.1');
INSERT INTO `tg_user` VALUES (6, 'fce4b3004724c08ba283f1af4bc382b009bb3829', 'fe33b6f30b30ddf90c14c8747f010b169a3d5155', '蜡笔小新', '7c4a8d09ca3762af61e59520943dc26494f8941b', '我最喜欢的是', '34bb28945fd223b49e67f9b4bf6d2c12cb73f8f9', 'labixiaoxin@163.com', '234234234', 'http://www.yc60.com', '男', 'face/m29.gif', '2010-08-18 22:30:30', '2010-08-18 22:30:30', '127.0.0.1');
INSERT INTO `tg_user` VALUES (9, '6528afa27002db3281185c926d273db15e5b70b0', 'bbcc5d47ec78538240e10538299d386230fea512', '樱桃小丸子', '7c4a8d09ca3762af61e59520943dc26494f8941b', '我有个姐姐', '0693b23e03efc840446c716dad880193c1cebe93', 'yintao@sina.com.cn', '23478234', 'http://www.yc60.com', '女', 'face/m34.gif', '2010-08-19 08:58:41', '2010-08-19 08:58:41', '127.0.0.1');
INSERT INTO `tg_user` VALUES (10, 'a0a9003ebd0a20d72ae92b131fe984c0149dd667', 'f9203a499bdbe661cde5ef18634b953c57812f74', '奥特曼', '7c4a8d09ca3762af61e59520943dc26494f8941b', '我是奥特曼', '2694e30d5dca7d243b831aeea8cf03e0511e2fce', 'aoteman@sina.com.cn', '12323423', 'http://www.aoteman.com', '女', 'face/m25.gif', '2010-08-21 15:17:48', '2010-08-21 15:17:48', '127.0.0.1');
INSERT INTO `tg_user` VALUES (11, '1acc0c777cd4c9490843c168a15bd89a9076b321', '642d05bcedef0bc318b108457e8abc41176310b4', '奥特', '7c4a8d09ca3762af61e59520943dc26494f8941b', '我是奥特曼', '2694e30d5dca7d243b831aeea8cf03e0511e2fce', 'bnbbs@163.com', '234234234', 'http://www.aoteman.com', '女', 'face/m43.gif', '2010-08-21 18:48:12', '2010-08-21 18:48:12', '127.0.0.1');
INSERT INTO `tg_user` VALUES (12, '9666e60c620264b53522f84fed6dc48bf5574e14', 'a9db682808415330181bf77a50e0803711993469', '小丸子', '7c4a8d09ca3762af61e59520943dc26494f8941b', '我是小丸子', 'bb18a82d08e1391ff3c575c48a1712c4e980bf39', 'xiaowanzi@sina.com.cn', '234234234', 'http://www.sina.com.cn', '女', 'face/m30.gif', '2010-08-21 19:11:05', '2010-08-21 19:11:05', '127.0.0.1');
INSERT INTO `tg_user` VALUES (13, '4c629f3a5e62c5bfa7bf16d3f9a00bd330eff235', '283d8f1649facf7b8b0f5b9b42e4478e72b378b4', '好人', '7c4a8d09ca3762af61e59520943dc26494f8941b', '我是好人', '320b5da92489bdb993e7108e35954b5102b7171e', 'haoren@sina.com.cn', '2342342', 'http://www.sina.com.cn', '女', 'face/m40.gif', '2010-08-21 19:20:57', '2010-08-21 19:20:57', '127.0.0.1');
INSERT INTO `tg_user` VALUES (14, '2638e2d7255e32edb5481b53e47bd4a86ad655af', '', '坏人', '7c4a8d09ca3762af61e59520943dc26494f8941b', '我是坏人', '67415ef1e4bda2dd233ac3e9d38c607256bf1ff1', 'huairen@163.com', '423432423', 'http://www.163.com', '男', 'face/m47.gif', '2010-08-21 19:22:31', '2010-08-21 19:22:31', '127.0.0.1');
INSERT INTO `tg_user` VALUES (15, '641eabc04bb6bd32d90d05c0bab2fc2c6d741c41', '', '好人和坏人', '7c4a8d09ca3762af61e59520943dc26494f8941b', '我是好人和坏人', '76c27d4fc01e7f9cbf31fb2c2ced77942c9f6cf6', 'haohuai@sina.com.cn', '23423423', 'http://www.sina.com.cn', '男', 'face/m22.gif', '2010-08-21 19:40:02', '2010-08-21 19:40:02', '127.0.0.1');
