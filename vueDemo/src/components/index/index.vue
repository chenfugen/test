<template>
  <div>
        <div class="container" ref="container">
            <div>
                <div style="position: relative;">
                    <!-- 轮播图 -->
                    <swiper-bar></swiper-bar>
                </div>
                <!-- banner -->
                <banner-item></banner-item>
                <div style="width:100%; height:500px; background:red;"></div>
            </div>
        </div>
  </div>
</template>
<script>
import bannerItem from "./bannerItem/bannerItem";
import tabBar from "../base/tabbar/tabbar";
import BScroll from "better-scroll";
import swiperBar from "../base/swiper/swiperbar";
export default {
  data() {
    return {};
  },
  computed: {},
  components: {
    bannerItem,
    tabBar,
    swiperBar
  },
  methods: {
    _initData() {
      setTimeout(() => {
        this._initScroll();
      }, 20);
    },
    _initScroll() {
      var scroll = new BScroll(this.$refs.container, {
        click: true,
        pullDownRefresh: true
      });
      scroll.on("scrool", event => {
        if (event.y > 30) {
          console.log("释放立即刷新");
        }
        // 下拉动作
        if (!event._constructed) {
          return;
        }
      });

      scroll.on("touchend", function(position) {
        if (position.y > 30) {
          setTimeout(function() {
            /*
            * 这里发送ajax刷新数据
            * 刷新后,后台只返回第1页的数据,无论用户是否已经上拉加载了更多
            */
            // 恢复文本值
            topTip.innerText = "下拉刷新";
            // 刷新成功后的提示
            refreshAlert("刷新成功");
            // 刷新列表后,重新计算滚动区域高度
            scroll.refresh();
          }, 1000);
        }
      });
    }
  },
  mounted() {},
  created() {
    //初始化数据
    this._initData();
  }
};
</script>

<style scoped>
.slide {
  width: 100%;
  height: 150px;
  text-align: center;
  overflow: hidden;
  font-size: 30px;
}
.container {
  position: absolute;
  top: 0px;
  bottom: 55px;
}
</style>


