---
title: '业务组件贡献说明'
---

业务组件代码目录`/src/components/`，一个业务组件建立单个文件夹，采用首字母大写方式的驼峰命名
一般使用`Index.vue`作为组件的导出文件。     
业务组件应当以一个具体的使用场景为封装，业务组件设计要点：
   * 低耦合：在组件中使用并且能在组件中申明的变量尽量申明在组件中
   * 一般通用性：能在某一类项目中进行修改并使用
   * CSS命名空间：业务组件顶层元素声明class属性作为命名空间前缀
   * 注意非双向绑定变量的声明：闭包以及单独组件使用

低耦合   
``` vue
<template>
  <div>
    <!-- 使用data -->
  </div>
</template>

<script>
export deafult {
  data() {
    return {
      data: '',
    }
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

CSS命名空间：<strong>脚手架中的业务组件不要改变第三方组件库的样式，可在具体项目中更改样式</strong>  
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