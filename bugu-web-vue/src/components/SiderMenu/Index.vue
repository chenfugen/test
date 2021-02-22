
<template>
<div>
	<div class="logo-container">
		<img v-if='!isCollapsed' :style="computedStyle" src="../../assets/LOGO.png" alt="logo" @click="goToHome">
	</div>
	<hl-sider-menu></hl-sider-menu>
</div>
</template>

<script>
import SiderMenu from "./SiderMenu";
export default {
	props: {
		logo: {
			type: String,
			default: '',
		},
		title: {
			type: String,
			default: 'HadLinks'
		},
	},
	data() {
		return {};
	},
	computed: {
		isCollapsed() {
			return this.$store.state.isMenuCollapsed;
		},
		computedStyle() {
			let width = this.isCollapsed ? '64px' : "160px"
			return {
				width,
			}
		},
	},
	components: {
		"hl-sider-menu": SiderMenu
	},
	methods: {
		goToHome() {
			// this.$router.push('/')
		}
	},
};
</script>
<style lang='less'>
.logo-container {
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: Center;
    overflow: hidden;
    background: rgb(32, 53, 88);
    transition: all 0.3s;
    position: sticky;
    top: 0;
    z-index: 10;
    img {
        transition: width 0.3s;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
