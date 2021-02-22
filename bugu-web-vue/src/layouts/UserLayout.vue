/*
*
*   created By Xu Peng
*
*/
<template>
  <el-container class="user-container">
    <el-header></el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer class="user-container-footer">copyright &copy; hadlinks</el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang='less'>
.user-container {
  min-height: 100vh;
  .user-container-footer {
    text-align: center;
  }
}
</style>