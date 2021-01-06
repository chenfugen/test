<template>
  <div class="home">
    <div v-wechat-title="$route.meta.title"></div>
  </div>
</template>

<script>
import { getLocation, scanQRCode, update } from '../../utils/wxsdk'
export default {
  name: 'Home',
  data() {
    return {}
  },
  mounted() {
    // 获取微信定位
    getLocation((res) => {
      console.log(res)
    })
    // 打开扫一扫
    scanQRCode((res) => {
      console.log(res)
    })
    // 分享
    update(
      'person',
      '我的分享',
      '我的描述',
      window.location.href,
      '../../../public/favicon.ico',
      (res) => {
        console.log(res)
      }
    )
  }
}
</script>

<style lang="less" scoped></style>
