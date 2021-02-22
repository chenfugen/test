/*
*
*   created By Xu Peng
*
*/
<template>
  <div class="code-container-box">
		<h4 v-if="title">{{ title }}</h4>
		<div class="code-container" :class="{show: showCode}">
			<slot></slot>
		</div>
		<div class="code-button" :class="{hide: showCode}" @click.stop="showCode = !showCode">
			{{ showCode ? 'Hide Code' : 'Show Code' }}
		</div>
	</div>
</template>

<script>
export default {
	props: ['title'],
  data() {
    return {
			showCode: false,
		};
  }
};
</script>
<style lang='less'>
.code-container-box {
	border: 1px solid #eee;
	box-shadow: 0 0 3px rgba(160, 121, 121, 0.1) inset;
	padding: 0 10px;
	margin: 10px 0;
	&:hover {
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}
	h4 {
		text-align: center;
		border-bottom: 1px solid #f3f3f3;
		padding-bottom: 1.33em;
	}
	.code-container {
		overflow: hidden;
		height: 0;
		transition: height 0.5s;
		&.show {
			height: auto;
			transition: height 0.5s;
		}
	}
	.code-button {
		width: 50%;
		margin: 10px auto;
		cursor: pointer;
		padding: 12px;
		text-align: center;
		border: 1px solid #ccc;
		background: #78c4d6;
		border-radius: 10px;
		&:hover {
			background: rgba(120, 196, 214, 0.9);
		}
		&.hide {
			background: #3eaf7c;
			color: #fff;
			&:hover {
				background: rgba(62, 175, 124, 0.9);
			}
		}
	}
}
</style>