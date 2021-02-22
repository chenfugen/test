/*
*
*   created By Xu Peng
*
*/
<template>
  <div>
    <authorized-table 
      @on-change="handleChange" 
      :title-list="titleList" 
      :deep="3" 
      :data="data">
    </authorized-table>
    <code-container title="传入组件的data变化">
      <pre contenteditable>{{ JSON.stringify(data,null,2) }}</pre>
    </code-container>
    <code-container title="每次勾选权限时返回的权限树">
      <pre contenteditable>{{ JSON.stringify(node,null,2) }}</pre>
    </code-container>
  </div>
</template>

<script>
import AuthorizedTable from "@/components/AuthorizedTable/Index.vue";
import { formDataTree, getDeep } from "@/utils/formatToTree.js";
import { mockList } from "&mock/AuthorizedList.js";
export default {
  components: {
    "authorized-table": AuthorizedTable
  },
  data() {
    return {
      node: [],
      titleList: ["菜单名", "访问页面", "具体权限", "数据操作"],
      // 传入组件的data为树形结构
      data: []
    };
  },
  mounted() {
    setTimeout(() => {
      this.data = formDataTree(mockList, {
        parentNO: "parentId",
        childrenNO: "id",
        childrenDesc: "childList"
      });
    }, 1000);
  },
  methods: {
    handleChange(node) {
      this.node = node;
    }
  }
};
</script>
<style lang='less'>
</style>