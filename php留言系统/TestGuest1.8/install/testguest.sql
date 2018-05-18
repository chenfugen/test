-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- 主机: localhost
-- 生成日期: 2010 年 08 月 18 日 15:17
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

-- 
-- 导出表中的数据 `tg_user`
-- 

INSERT INTO `tg_user` VALUES (5, '9bf40be3f04307790fc2e63996363dd40f446edd', '8ae787f1950852fd7ced8f5d0684d5e19fa354e0', '炎日', '7c4a8d09ca3762af61e59520943dc26494f8941b', '我家的狗狗', '4d5cf6a96cf8a438e3ae210bf7b2dac02b6fa1a4', 'bnbbs@163.com', '234234234', 'http://www.yc60.com', '男', 'face/m23.gif', '2010-08-18 22:26:31', '2010-08-18 22:26:31', '127.0.0.1');
INSERT INTO `tg_user` VALUES (6, 'fce4b3004724c08ba283f1af4bc382b009bb3829', 'fe33b6f30b30ddf90c14c8747f010b169a3d5155', '蜡笔小新', '7c4a8d09ca3762af61e59520943dc26494f8941b', '我最喜欢的是', '34bb28945fd223b49e67f9b4bf6d2c12cb73f8f9', 'labixiaoxin@163.com', '234234234', 'http://www.yc60.com', '男', 'face/m29.gif', '2010-08-18 22:30:30', '2010-08-18 22:30:30', '127.0.0.1');
