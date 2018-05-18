<template>
	<div>
		<mt-header title="首页" fixed></mt-header>
		<mt-swipe :auto="4000" class="banner">
			<mt-swipe-item v-for="item in items" :key="item.id">
				<img :src="item" style="width:100%" />
			</mt-swipe-item>
		</mt-swipe>
		<mt-navbar v-model="select">
			<mt-tab-item id="0">选项一</mt-tab-item>
			<mt-tab-item id="1">选项二</mt-tab-item>
			<mt-tab-item id="2">选项三</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container v-model="select">
			<mt-tab-container-item id="0">
				<mt-cell v-for="n in 4" :title="'内容 ' + n" :key="n.id" />
			</mt-tab-container-item>
			<mt-tab-container-item id="1">
				<mt-cell v-for="n in 4" :title="'测试 ' + n" :key="n.id" />
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<mt-cell v-for="n in 4" :title="'选项 ' + n" :key="n.id" />
			</mt-tab-container-item>
		</mt-tab-container>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<mt-tabbar fixed v-model="selected" ref="tab">
			<mt-tab-item v-for=" (item,index) of navbar" :id="index" :key="index" :class="item.active?'active':''">
				<img slot="icon" :src="item.active?item.active_icon:item.icon"> {{item.title}}
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				items: [
					'src/assets/img/banner1.jpg',
					'src/assets/img/banner2.jpg',
					'src/assets/img/banner3.jpg',
				],
				selected: "0",
				select: "0",
				navbar: [{
					title: '首页',
					name: '/',
					icon: 'src/assets/img/home.png',
					active_icon: 'src/assets/img/home_fill.png',
					active: true
				}, {
					title: '发现',
					name: 'find',
					icon: 'src/assets/img/creative.png',
					active_icon: 'src/assets/img/creative_fill.png',
					active: false
				}, {
					title: '购物车',
					name: 'cart',
					icon: 'src/assets/img/cart.png',
					active_icon: 'src/assets/img/cart_fill.png',
					active: false
				}, {
					title: '我的',
					name: 'user',
					icon: 'src/assets/img/people.png',
					active_icon: 'src/assets/img/people_fill.png',
					active: false
				}]
			}
		},
	methods: {

	},
	watch: {
		//当前选中值   新值   上一个值
		selected: function(val, oldVal) {
			this.navbar.forEach((item, index) => {
				if(index != val) {
					item.active = false;
				} else {
					item.active = true;
				}
			})			
			if(oldVal > val) {
			    this.$router.push('/');
			} else {			
				this.$router.push('/'+this.navbar[val].name);
			}
		},
		$route(to, from, next) {
			//判断路由  是首页的几个路由时  改变tabbar选中状态
			this.navbar.forEach((item, index) => {
				if(to.name == 'index' && to.path == '/') {
					this.navbar[0].active = true;
					this.selected = '0';
				} else {
					item.active = false;
				}
				if(to.name == item.name) {
					item.active = true;
					this.selected = index;
				} else {
					item.active = false;
				}
			})
		}
	}
	}
</script>

<style>
	* {
		margin: 0px;
		padding: 0px;
	}
	
	.banner {
		width: 100%;
		height: 200px;
	}
	
	.banner img {
		width: 100%;
		height: 200px;
	}
</style>