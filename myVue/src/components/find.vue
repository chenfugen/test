<template>
	<div>
		<header-bar :text="title" :left="left"></header-bar>
		<div class="nav marginTOP">
			<mt-button size="small" @click.native.prevent="active = 'tab-container1'">tab 1</mt-button>
			<mt-button size="small" @click.native.prevent="active = 'tab-container2'">tab 2</mt-button>
			<mt-button size="small" @click.native.prevent="active = 'tab-container3'">tab 3</mt-button>
		</div>
		<div class="page-tab-container">
			<mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
				<mt-tab-container-item id="tab-container1">
					<!-- cell组件 -->
					<mt-cell v-for="n in 10" title="tab-container 1"></mt-cell>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container2">
					<!-- cell组件 -->
					<mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container3">
					<!-- cell组件 -->
					<mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>

<script>
	import headerBar from './header/index.vue'
	export default {
		data() {
			return {
				title: "发现",
				left: {
					text: "返回",
					status: true
				},
				active: "tab-container1",
			}
		},
		components: {
			headerBar
		},
		methods: {
		}
	}
</script>

<style>
	.marginTOP {
		margin-top: 40px;
	}
</style>