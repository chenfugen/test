
<template>
<el-submenu :index="name">
	<template slot="title">
		<!-- <svg class="icon" aria-hidden="true" style="margin-right:3px;">
        <use :xlink:href="icon"></use>
      </svg> -->
		<!-- <i class="iconfont" :class="icon.slice(1)" style="margin-right:3px;"></i> -->
		<!-- <i class="iconfont" style="margin-right:3px;"></i> -->
		<i :class="['el-icon-'+icon]"></i>
		<span>{{ name }}</span>
	</template>
	<template v-for="item in childList">
		<el-menu-item :index="item.url" v-if="isFirstMenu(item)" :key="item.id">
			<span>{{ item.name }}</span>
		</el-menu-item>
		<submenu v-else-if="isSubMenu(item)" :childList="item.childList" :url="item.url" :icon="item.icon" :name="item.name" :key="item.id"></submenu>
	</template>
</el-submenu>
</template>

<script>
export default {
	name: 'submenu',
	props: {
		childList: {
			type: Array,
			default: () => [],
		},
		name: {
			type: String,
			default: '',
		},
		url: {
			type: String,
			required: true,
		},
		icon: {
			type: String
		},
	},
	data() {
		return {};
	},
	methods: {
		// 检查是否菜单项以及是否具有权限
		isFirstMenu(menu) {
			return menu.url != '#' &&
				menu.operationCode === '' &&
				menu.isOperation === 'N' &&
				menu.isMainMenu == 'Y'
		},
		// 检查是否子菜单
		isSubMenu(menu) {
			return menu.url === '#' &&
				menu.operationCode === '' &&
				menu.isOperation === 'N' &&
				menu.isMainMenu == 'Y'
		},
	},
}
</script>
<style lang='less'>
</style>
