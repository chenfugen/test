---
title: 用户下拉
---

### 使用场景
头部导航栏用户名hover下拉菜单

### 使用方式
``` vue
<template>
  <UserDropdown />
</template>

<script>
import UserDropdown from '@/components/UserDropdown/Index.vue'
export default {
  components: {
    UserDropdown,
  },
}
</script>
```
### props
无
### events
无

::: tip 使用提示
下拉菜单的数据直接在组件中修改，以及点击菜单触发的事件都在组件中直接修改
:::
### 使用例子
<div class="container">
  <common-UserDropdown/>
</div>

<style lang="css">
.container {
  width: 400px;
  height:64px;
  text-align: right;
  border: 1px solid #eee;
}
.container .el-dropdown {
  line-height:64px;
  cursor:pointer;
  padding: 0 12px;
}
.container .el-dropdown:hover {
  background: rgba(0,0,0,0.025);
}
</style>