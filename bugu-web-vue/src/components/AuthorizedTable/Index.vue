/*
*
*   created By Xu Peng
*
*/
<template>
<div class="authorized-table-container">
	<el-table border :data="permissionData" :span-method="cellMerge">
		<template v-for="i in ans">
			<el-table-column width="200" :label="titleList[i-1]" :key="i">
				<template slot-scope="scope">
					<authorized-item v-if="scope.row[i-1]" :item="scope.row[i-1]" @on-change="change" v-model="scope.row[i-1].power">{{ scope.row[i-1].name }}</authorized-item>
				</template>
			</el-table-column>
		</template>
		<el-table-column :label="titleList[ans]" min-width="200">
			<template slot-scope="scope">
				<template v-if="scope.row[ans]">
					<authorized-item v-for="item in scope.row[ans]" :key="item.id" style="margin-right: 15px;" :item="item" @on-change="change" v-model="item.power">{{item.name}}</authorized-item>
				</template>
			</template>
		</el-table-column>
	</el-table>
</div>
</template>

<script>
import AuthorizedItem from "./AuthorizedItem.vue";
export default {
	components: {
		"authorized-item": AuthorizedItem
	},
	props: {
		data: {
			type: Array,
			default: () => []
		},
		titleList: {
			type: Array,
			default: () => []
		},
		deep: {
			type: Number,
		},
	},
	data() {
		return {
			permissionData: [],
			ans: this.deep || 2,
		};
	},
	watch: {
		deep: {
			immediate: true,
			handler(value) {
				this.ans = value
			}
		},
		data: {
			immediate: true,
			handler(value) {
				if (value.length) {
					let temp = formatData(value, this.deep)
					this.permissionData = temp.permissionData
					if (!this.deep) {
						this.ans = temp.ans
					}
				}
			}
		}
	},
	computed: {
		computedSpan() {
			let arr = [];
			for (let j = 0; j <= this.ans - 2; j++) {
				let map = new Map();
				for (let i = 0; i < this.permissionData.length; i++) {
					let times =
						(map.get(this.permissionData[i][j].id) &&
							map.get(this.permissionData[i][j].id).times) ||
						0;
					map.set(this.permissionData[i][j].id, {
						times: times + 1,
						index: i
					});
				}
				arr.push(map);
			}
			return arr;
		}
	},
	methods: {
		change(val, e) {
			this.$emit("on-change", val);
		},
		cellMerge({
			row,
			column,
			rowIndex,
			columnIndex
		}) {
			if (columnIndex <= this.ans - 2) {
				let map = this.computedSpan[columnIndex];
				let obj = map.get(row[columnIndex].id);
				if (obj.index - obj.times + 1 === rowIndex) {
					return [obj.times, 1];
				} else {
					return [0, 0];
				}
			}
		}
	}
};

function formatData(data, deep) {
	let arr = [];
	let temp = {
		childList: data
	};
	// 获取树的深度，如果确定可以直接设置，0为1层，
	let ans = deep || getDeep(temp);
	for (let i = 0; i < data.length; i++) {
		arr.push(...createItem(data[i], ans));
	}
	return {
		permissionData: arr,
		ans
	};

	function getDeep(node) {
		let ans = 0;
		dfs(node, 0);
		return ans - 1;

		function dfs(node, deep) {
			if (!node.childList) {
				ans = Math.max(ans, deep);
				return;
			} else {
				for (let i = 0; i < node.childList.length; i++) {
					dfs(node.childList[i], deep + 1);
				}
			}
		}
	}
}

function createItem(data, ans) {
	let arr = [];
	// 将数据格式化为表格数据
	dfs(data, 0);
	return arr;

	function dfs(node, deep, temp = {}) {
		temp[deep] = node;
		// console.log(node,deep,temp);
		if (deep === ans) return;
		if (!node.childList || deep === ans - 1) {
			if (deep === ans - 1) {
				temp[deep + 1] = node.childList;
			}
			arr.push(temp);
			return;
		} else {
			for (let i = 0; i < node.childList.length; i++) {
				let obj = Object.assign({}, temp);
				dfs(node.childList[i], deep + 1, obj);
			}
		}
	}
}
</script>
<style lang='less'>
.authorized-table-container {}
</style>
