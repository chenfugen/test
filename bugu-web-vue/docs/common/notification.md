---
title: '消息通知'
---

### 使用场景

在头部导航栏中使用，一个消息通知的icon，用来显示未读消息通知   

---

### 使用方法

### Notification 组件
### props
| 参数          | 说明           | 类型  |  默认值 | 格式 |
| ------------  |:-------------:| :-----:| :------:| ----|
| name          | 显示tab的name，自动选中 | String | 第一个tab的name   | 见组件使用 |

### events
| 事件名称       | 说明               | 回调参数           |
| ------------  |:-------------:     | :-----:           |
| on-click      | 当tab被点击时的回调函数 | 当前tab的实例    | 
| on-show       | 当通知框显示的时候触发 | 无    | 
| on-hide       | 当通知框隐藏的时候触发 | 无    | 

### NotificationItem 组件
### props
| 参数          | 说明           | 类型  |  默认值 | 格式 |
| ------------  |:-------------:| :-----:| :------:| ----|
| name          | 每个NotificationItem的唯一值， | String | 无   | 见组件使用 |
| title         | 内部tab的标题 | String | 无   | 见组件使用 |

### events
| 事件名称       | 说明               | 回调参数           |
| ------------  |:-------------:     | :-----:           |
| on-click      | 当消息被点中时触发 | 当前点击的消息对象    | 
| on-clear       | 当点击清空的时候触发 | 无    | 
| on-getMore       | 当点击查看更多的时候触发 | 无    | 

### 使用注意点
::: tip 关于NotificationItem组件
可以编写自定义的`NotificationItem`组件，组件的`title`和`name`属性必须，其余`props`和`events`可以定义。
:::

### 使用例子

``` vue
<Notification @on-click="handleClick" class="header-right-item">
  <NotificationItem name="first" title="通知" @on-click="handleItemClick"></NotificationItem>
  <NotificationItem name="second" title="警告" @on-click="handleItemClick"></NotificationItem>
</Notification>
```

具体使用例子`/src/layouts/Header.vue`