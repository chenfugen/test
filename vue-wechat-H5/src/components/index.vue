<template>
  <div class="index">
    <div v-wechat-title="$route.meta.title"></div>
  </div>
</template>

<script>
import code from '@/utils/code'
export default {
  name: 'Index',
  mounted() {
    code.getRedirectUri('appid', location.origin + '/#/login', 'snsapi_userinfo')
  }
}
</script>

<style lang="less" scoped></style>
