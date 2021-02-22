/*
*
*   created By Xu Peng
*
*/
<template>
<div class="authorized-item">
	<el-checkbox v-model="checkValue" @change="handleChange" v-bind="$attrs">
		<slot></slot>
	</el-checkbox>
</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
		},
		item: {
			type: null
		},
	},
	data() {
		return {
			checkValue: this.value,
		};
	},
	methods: {
		handleChange(val, e) {
			this.$emit('input', val)
			this.$emit('on-change', this.item)
		},
	},
};
</script>
<style lang='less'>
.authorized-item {
    display: inline-block;
    min-width: 100px;
}
</style>
