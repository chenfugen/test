<template>
  <div >
       <header-bar 
            :text="title"
            >
        </header-bar>
        <div class="content"></div>
        <div ref="wrapper" class="list-wrapper">
            <ul class="list-content">
                <swipe :data="swipeList"></swipe>
            </ul>
        </div>
      
  </div>
</template>
<script>
import headerBar from '../base/headerbar/headerbar'
import cell from '../base/cell/cell'
import swipe from '../base/cell/swipe'
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            title:"发现",
            swipeList:{
                data:[],
            },
        }
    },
    components: {
        headerBar,
        swipe
    },
    methods:{
        initData() {
            const options = {
                scrollY: true, // 因为scrollY默认为true，其实可以省略,
                click:true,
                bounce:true,
                tap:true,
                 eventPassthrough:'vertical',
                pullDownRefresh : {
                    threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
                    stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
                },
                pullUpLoad: {
                    threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
                }
            }

            this.scroll = new BScroll(this.$refs.wrapper, options);

            this.scroll.on('pullingDown', () => {
                // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置
                RefreshData()
                    .then((newData) => {
                    this.data = newData
                    // 在刷新数据完成之后，调用 finishPullDown 方法，回弹到顶部
                    this.scroll.finishPullDown()
                })
            })
        },
        clickItem(event,item) {

        },
        getList() {
            let data = [];
            for(var i=0; i < 20; i++) {
                data.push({
                    title:'我的设置',
                    link:'/find',
                    icon:'iconfont icon-shezhi',
                });
            }
            this.swipeList.data = data;
        }
    },
    mounted() {

    },
    created() {
        this.$nextTick(() => {
            this.getList();
            this.initData();
        })
    }
}
</script>
<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  min-height: 1px;
  overflow: hidden;
  padding: 0px;
}
.wrapper .content {
  padding: 0px;
  margin: 0px !important;
}
.wrapper .content li {
  list-style: none;
  float: left;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
}
img {
  display: block;
  width: 100%;
}
.dots {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 12px;
  text-align: center;
  font-size: 0;
}
.dot {
  display: inline-block;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
}
.active {
  background: #333;
  width: 13px;
  border-radius: 4px;
}
</style>

