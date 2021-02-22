---
title: '通用组件文档说明'
---
### 文档位置
通用组件文档位置：`/docs/common/`,文档为markdown形式，如`/docs/common/xxx.md`,然后在`/docs/.vuepress/config.js`中增加路径。   
```js
...
themeConfig: {
  sidebar: [
    ...
    {
      title: '通用组件',
      children: [
        '/common/xxx'
      ],
    }
    ...
  ]
}
...
```

通用组件文档需要使用的demo位置：`/docs/.vuepress/components/common/`,此处定义的vue文件会注册为全局组件，在md文档中可以直接使用，使用方式为`common-xxx`形式。  
即在md文档中   
```md
<common-xxx />
```

通用组件文档编写应当详细，考虑以下几个方面
  *  通用组件使用场景
  *  通用组件使用方法
  *  通用组件注意点
  *  通用组件例子

:tada: **example**
### 使用场景

该组件的使用场景是...

---

### 使用方法
#### props
|属性|说明|类型|默认值|格式|
|----|----|---|-----|----|
|    |    |    |    |     |
#### event
|事件名称|说明|回调参数|
|--------|----|-------|
|    |    |    | 

---

### 使用注意点

::: warning xxx
一些注意点
:::

::: tip xxx
一些注意点
:::

::: danger xxx
一些注意点
:::

---

### 使用例子
``` vue
<template>
  <example-demo></example-demo>
</template>

<script>
import example from 'path/to/components/example.vue'
export default {
  components: {
    "example-demo": example 
  }
}
</script>
```