<!--
 * @Author: Xu Peng
 * @Date: 2019-06-04 10:47:21
 * @LastEditors: Xu Peng
 * @LastEditTime: 2019-08-13 10:35:00
 * @Description: file content
 -->

<template>
<el-menu class="had-menus" :class="menuitemClasses" collapse-transition background-color="#203558" text-color="#7088B0" active-text-color="#E6ECFF" :collapse="isCollapsed" unique-opened :mode="mode" :default-active="defaultKey" router>
	<template v-for="menu in menus">
		<el-menu-item :index="menu.url" v-if="isFirstMenu(menu)" :key="menu.id">
			<!-- <i class="iconfont" :class="menu.icon.slice(1)" style="margin-right:3px;"></i> -->
			<!-- <i class="iconfont" style="margin-right:3px;"></i> -->
			<i :class="['el-icon-'+menu.icon]" style="margin-right:3px;"></i>
			<template slot="title">
				<!-- <svg class="icon" aria-hidden="true" style="margin-right:3px;">
            <use :xlink:href="menu.icon"></use>
          </svg> -->
				<span>{{ menu.name }}</span>
			</template>
		</el-menu-item>
		<hl-submenu v-else-if="isSubMenu(menu)" :key="menu.id" :url="menu.url" :icon="menu.icon" :childList="menu.childList" :name="menu.name" />
	</template>
</el-menu>
</template>

<script>
import SubMenu from "./SubMenu";
export default {
	inject: ["mode", "theme"],
	data() {
		return {
			menus: [],
			defaultKey: '',
			defaultOpeneds: []
		};
	},
	components: {
		"hl-submenu": SubMenu
	},
	created() {
		let menus = this.$Store.state.user.menu
		if (menus && menus.length) {
			this.menus = menus
		} else {
			this.$store.dispatch('queryMenu')
				.then((menus) => {
					this.menus = menus
					// cacheEffectSession('menus', menus)
				})
		}
		this.setDefaultMenu()
	},
	computed: {
		menuitemClasses() {
			return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
		},
		isCollapsed() {
			return this.$store.state.isMenuCollapsed
		},
	},
	watch: {
		'$route': function() {
			this.setDefaultMenu()
		}
	},
	methods: {
		// 设置默认展开的子菜单和选中的菜单。
		setDefaultMenu() {
			this.defaultKey = this.$route.fullPath
			this.defaultOpeneds = [this.$route.meta.module]
		},
		// 检查是否菜单项以及是否具有权限
		isFirstMenu(menu) {
			return menu.url != '#' &&
				menu.operationCode === '' &&
				menu.isOperation === 'N' &&
				menu.isPermission == 'Y' &&
				menu.state == 'Y' &&
				menu.isMainMenu == 'Y'
		},
		// 检查是否子菜单
		isSubMenu(menu) {
			return menu.url === '#' &&
				menu.operationCode === '' &&
				menu.isOperation === 'N' &&
				menu.isPermission == 'Y' &&
				menu.state == 'Y' &&
				menu.isMainMenu == 'Y'
		},
	},
};
</script>
<style lang='less'>
.el-menu:not(.el-menu--collapse) {
    width: 256px;
}
.el-menu.had-menus {
    border-color: #203558;
    .el-menu-item.is-active i {
        color: #CBD6E9!important;
    }
    .el-submenu.is-active .el-submenu__title {
        color: #CBD6E9!important;
        i {
            color: #CBD6E9!important;
        }
    }
    .el-menu-item.is-active {
        background: #1FABFF!important;
    }
    .el-menu-item i {
        color: #7088B0;
    }
    .el-submenu__title i {
        color: #7088B0;
    }
}
</style>
