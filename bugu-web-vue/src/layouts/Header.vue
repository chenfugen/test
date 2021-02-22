/*
*
*   created By Xu Peng
*
*/
<template>
<el-header height="64px">
	<div class="menu-left-header" :style="computedStyle">
		<span class="menu-left-header-span" @click.stop="triggerMenu">
			<i class="el-icon-d-arrow-left" :class="rotateIcon"></i>
		</span>
		<el-breadcrumb separator="/" class="breadcrumb">
			<el-breadcrumb-item>{{breadcrumb.module}}</el-breadcrumb-item>
			<el-breadcrumb-item>{{breadcrumb.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="header-right">
			<!-- <Notification name="second" class="header-right-item" @on-show="handleShow" @on-hide="handleHide" @on-click="handleClick">
				<NotificationItem title="通知" name="first" @on-getMore="handleClick" @on-click="handleClick"></NotificationItem>
				<NotificationItem title="警告" name="second" @on-click="handleClick"></NotificationItem>
			</Notification> -->
			<UserDropdown class="header-right-item" />
		</div>
	</div>
	<div class="menu-top-header"></div>
</el-header>
</template>

<script>
import Notification from "@/components/Notification/Index.vue";
import NotificationItem from "@/components/Notification/NotificationItem.vue";
import UserDropdown from '@/components/UserDropdown/Index.vue'
import {
	throttle
} from 'throttle-debounce'
export default {
	components: {
		Notification,
		NotificationItem,
		UserDropdown,
	},
	data() {
		return {};
	},
	computed: {
		breadcrumb() {
			return this.$route.meta
		},
		isCollapsed() {
			return this.$store.state.isMenuCollapsed;
		},
		rotateIcon() {
			return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
		},
		computedStyle() {
			let width = this.isCollapsed ? 64 : 256
			return `width: calc(100% - ${width}px);`
		},
	},
	mounted() {
		if (window.innerWidth < 992) {
			this.triggerMenu()
		}
		window.addEventListener('resize', throttle(400, (val) => {
			if (window.innerWidth < 992 && !this.isCollapsed) {
				this.triggerMenu()
			}
		}))
	},
	methods: {
		handleShow() {},
		handleHide() {},
		handleClick(e) {},
		triggerMenu() {
			this.$store.dispatch("triggerMenu");
			this.$emit("on-siderTrigger");
		}
	}
};
</script>
<style lang='less'>
.breadcrumb {
    display: inline-block;
}
.menu-left-header {
    height: 64px;
    line-height: 64px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    transition: width 0.3s ease-in-out;
    .menu-left-header-span {
        height: 64px;
        padding: 16px 24px;
        font-size: 30px;
        cursor: pointer;
        transition: all 0.3s ease-in-out, padding 0s;
        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
        .menu-icon {
            transition: all 0.2s;
        }
        .rotate-icon {
            transform: rotate(-180deg);
            transition: all 0.2s;
        }
    }
    .header-right {
        float: right;
        overflow: hidden;
        height: 100%;
        .header-right-item {
            display: inline-block;
            height: 100%;
            padding: 0 14px;
            cursor: pointer;
            transition: all 0.2s;
            &:hover {
                background: rgba(0, 0, 0, 0.025);
            }
        }
    }
}
</style>
