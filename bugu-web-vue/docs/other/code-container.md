---
title: code-container使用
---
### 使用场景
code-container为此文档专用的全局组件，用来包裹长内容，包裹的内容点击Show Code时显示，Hide Code时隐藏

---

### 使用方法
props
|属性|说明|默认值|
|---|---|---|
|title|标题|无|

``` vue
<code-container title="这是一个标题">
  <pre>
    Show Code时显示
    Hide Code时隐藏
  </pre>
</code-container>
```
---
### 使用注意点
无

---
### 示例：
<code-container title="这是一个标题">
  <pre>
    Show Code时显示
    Hide Code时隐藏
  </pre>
</code-container>