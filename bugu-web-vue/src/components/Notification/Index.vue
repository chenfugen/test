/*
*
*   created By Xu Peng
*
*/

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      count: 0,
      tabName: this.name,
      show: false,
    };
  },
  mounted() {
    if (!this.name) {
      this.tabName = this.$slots.default && this.$slots.default[0].componentOptions.propsData.name
    }
    this.time = setInterval(() => {
      this.count++
    }, 1000)
  },
  beforeDestory() {
    if (this.time) {
      clearInterval(this.time)
    }
  },
  methods: {
    handleClick(tab) {
      this.$emit('on-click', tab)
    },
    showTabs() {
      this.show = true
    }
  },
  render() {
    const main = (this.show ?
      <el-tabs vModel={this.tabName} stretch={true} vOn:tab-click={this.handleClick}>
        { this.$slots.default.map((el) => {
          const props = el.componentOptions.propsData
          return (
            <el-tab-pane label={props.title} name={props.name} lazy={true}>
              { el }
            </el-tab-pane>
          )
        }) }
      </el-tabs> : null
    )
    const badge = (
      <el-badge max={99} value={this.count} hidden={!this.count} class="notification-icon">
        <i class="el-icon-bell"></i>
      </el-badge>)
    return (
      <span class="notification-container" v-popover:popover>
        <el-popover
          visible-arrow={false}
          width='336'
          vOn:show={this.showTabs}
          popper-class="notification-popper"
          trigger="click"
          placement="bottom-end"
          ref="popover">
          { main }
        </el-popover>
        { badge }
      </span>
    )
  }
};
</script>
<style lang='less'>
.notification-popper {
  &.el-popover {
    padding: 0;
  }
  .el-tabs__nav-wrap::after {
    height: 1px;
  }
  .el-tabs__header {
    margin: 0;
  }
}
.notification-icon.el-badge {
  .el-badge__content.is-fixed {
    top: 18px;
    right: 15px;
  }
}
</style>
