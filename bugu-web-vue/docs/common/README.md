---
title: 通用组件贡献说明
---

通用组件代码目录`/src/components/`，一个通用组件建立单个文件夹，采用首字母大写方式的驼峰命名
一般使用`Index.vue`作为组件的导出文件，如`/src/components/XXX/Index.vue`   
通用组件一般与业务场景弱关系或无关系，通用组件编写需要考虑以下几点：
  *  粒度：以element-ui为基础的适度封装，如果功能复杂可以拆分为几个简单组件
  *  低耦合：不包含特定业务的数据，谨慎使用vuex
  *  通用性：从项目使用频繁的功能中抽象出来
  *  CSS命名空间：在顶层元素使用class属性指定命名空间前缀
  *  注意非双向绑定变量的声明：闭包以及单独组件使用

低耦合：**组件展示数据通过props传入，自有数据保存在组件内**   
``` vue
<template>
  <div>
    <!-- 使用data -->
  </div>
</template>

<script>
export deafult {
  // 通过props传入，一般需要watch或者包装成computed属性
  props: {
    data: {
      type: /*type*/
      default: /*default*/
    },
  },
  data() {
    return {
      data: '',
    }
  },
  watch: {
    data() {
      /*code*/
    },
  },
  mounted() {
    // 如this.data只在组件中使用，则无需保存到vuex等状态管理工具
    fetch(url).then((res) => {
      this.data = res
    })
  },
}
</script>
```


CSS命名空间：**脚手架中的通用组件不要改变第三方组件库的样式，可在具体项目中更改样式**   
``` vue
<template>
  <div class="some-class-prefix">
    <div class="some-class-prefix-header"></div>
    <div class="some-class-prefix-body">
      <el-button>button</el-button>
    </div>
    <div class="some-class-prefix-footer"></div>
  </div>
</template>

// 尽量不使用scope属性
<style lang='less'>
  .some-class-prefix {
    .some-class-prefix-header {
      
    }
    .some-class-prefix-body {
      /* 在命名空间下修改第三方组件的样式 */
      .el-button {
        background: #555;
      }
    }
  }
</style>
```

注意非双向绑定变量的声明：**确定声明变量的用途，避免闭包变量在所有实例中共用**
``` vue
<template>
  <div>
    ...
  </div>
</template>

<script>
// a变量在该组件的所有实例中共用
let a = 1
export default {
  data() {
    return {

    }
  },
  created() {
    // this.b 在这单个实例中使用，并且this.b不会进行双向绑定
    // 在进行第三方插件使用时可用此方法
    this.b = 1
  },
}
</script>  
```


