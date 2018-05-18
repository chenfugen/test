<template>
	<div>
		<transition :name="transitionName">
			<router-view class="child-view"></router-view>
		</transition>
	</div>

</template>

<script>
	export default {
		name: "app",
		data() {
			return {
				transitionName: "slide-right",
			};
		},
		watch: {　　
			'$route' (to, from) {　　　　　
				var toDepth = to.path.split('/').length　　　　
				var fromDepth = from.path.split('/').length　
				this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'　　　　
			}　　
		}
	};
</script>

<style>
	#app {
		font-family: 微软雅黑;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		padding: 0;
	}
	
	body {
		margin: 0;
		padding: 0;
	}
	
	.child-view {
		position: absolute;
		height: 100%;
		width: 100%;
		transition: all 0.25s cubic-bezier(0.55, 0, 0.1, 1);
	}
	
	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		-webkit-transform: translate3d(100%, 0, 0);
		transform: translate3d(100%, 0, 0);
	}
	
	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		-webkit-transform: translate3d(-100%, 0, 0);
		transform: translate3d(-100%, 0, 0);
	}
</style>