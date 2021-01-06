<template>
  <div class="advert">
    <div v-wechat-title="$route.meta.title"></div>
  </div>
</template>

<script>
export default {
  name: 'Advert',
  data() {
    return {
      timer: '', // 定时器
      code: '' // 微信code
    }
  },
  mounted() {
    this.code = this.$query.getQueryVariable('code')
    // 获取openId
    this.$http
      .get(this.$api.wx_openId, {
        params: {
          code: this.code
        }
      })
      .then((res) => {
        if (res.success) {
          this.$store.dispatch('userDetail', {
            openId: res.data.openId,
            token: res.data.token
          })
          this.timer = setTimeout(() => {
            location.href = location.origin + '/#/home'
          }, 1000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped></style>
