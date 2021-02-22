/*
*
*   created By Xu Peng
*
*/
<template>
<el-container class="basic-container">
	<el-aside class="hadlinks-sider" width="auto" v-if="defaultSetting.menuPosition === 'left'">
		<hl-menu />
	</el-aside>
	<el-container class="hadlinks-container" direction="vertical" :style="computedStyle">
		<hl-header class="hadlinks-header" @on-siderTrigger="siderTrigger" />
		<el-main>
			<!-- <p v-for="n in 100" :key='n'>{{n}}</p> -->
			<router-view />
		</el-main>
		<hl-footer />
	</el-container>
</el-container>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import Menu from '@/components/SiderMenu/Index.vue'
import defaultSetting from '@/utils/defaultSetting'
export default {
	provide: {
		theme: defaultSetting.theme,
		mode: defaultSetting.menuPosition === 'left' ? 'vertical' : 'horizontal'
	},
	data() {
		return {
			defaultSetting: defaultSetting,
			hide: false
		};
	},
	components: {
		'hl-header': Header,
		'hl-footer': Footer,
		'hl-menu': Menu,
	},
	created() {},
	computed: {
		isCollapsed() {
			return this.$store.state.isMenuCollapsed;
		},
		computedStyle() {
			let width = this.isCollapsed ? 64 : 256
			return `padding-left: ${width}px;`
		},
	},
	methods: {
		siderTrigger() {},
	},
}
</script>
<style lang='less'>
.basic-container {
    min-height: 100vh;
    background: #f9f9f9;
    .hadlinks-sider {
        position: fixed;
        min-height: 100vh;
        background-color: rgb(32, 53, 88);
        top: 0;
        left: 0;
        &.el-aside {
            box-shadow: 2px 0 6px rgba(0,21,41,.35);
            z-index: 9;
        }
    }
    .hadlinks-header {
        &.el-header {
            padding: 0;
            background: #fff;
        }
    }
    .hadlinks-container {
        transition: padding 0.3s ease-in-out;
    }
}
</style>
