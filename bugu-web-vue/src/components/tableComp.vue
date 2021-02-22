<template lang="html">
<div class="tableComp clearfloat">
    <el-table :data="tableData" stripe fit style="width: 100%" :empty-text='"暂无数据"' v-loading='tableLoading'>
        <el-table-column v-for='(item,index) in tableConf' :key='index' align='center' :prop="item.prop" :label="item.label">
            <template slot-scope="scsJScope">
                <span>{{dealData(scsJScope.row[item.prop],item.dealMethod)}}</span>
            </template>
        </el-table-column>
        <el-table-column v-for='(actItem) in tableActConf' align='center' :label="actItem.label" :key="actItem.label">
            <template slot-scope="scope">
				<span v-for='(actItemC) in actItem.child' :key="actItemC.methodsName">
					<el-button :class="['tableBtn','btn-'+actBtnStyle(scope.row,actItemC)]"
						@click="handleClick(scope.row,actItemC.methodsName)"
						type="text"
						size="small"
						:disabled='judgeDisable(scope.row,actItemC.judgeFun)'>
						{{actBtnName(scope.row,actItemC)}}
					</el-button>
				</span>
            </template>
        </el-table-column>
    </el-table>
    <div class="block">
    <el-pagination
        class="marginTop right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
	name: 'tableComp',
	props: {
		tableConf: {
			type: Array,
			required: true
		},
		tableActConf: {
			type: Array,
			required: false
		}
	},
	data() {
		return {
			tableLoading: false,
			tableData: [],
			currentPage: 1,
			pageSize: 10,
			total: 0,
			para: {},
			api: '',
		}
	},
	mounted() {},
	methods: {
		handleInputData(listData, pageNum, pageSize, total) { // 直接放入数据
			this.tableData = listData
			this.currentPage = pageNum
			this.pageSize = pageSize
			this.total = total
		},
		handleSizeChange(val) { // 修改表格页大小
			this.pageSize = val
			this.getTableData(this.api, this.para)
		},
		handleCurrentChange(val) { // 翻页
			this.currentPage = val
			this.getTableData(this.api, this.para)
		},
		getTableData(api, para) { // 获取表格数据
			this.tableLoading = true
			this.para = para
			this.api = api
			this.$Ax.get(api, {
				params: {
					pageSize: this.pageSize,
					pageNum: this.currentPage,
					...para
				}
			}).then(res => {
				this.tableData = res.data.list
				this.total = res.data.total
				this.tableLoading = false
			}).catch(err => {
				// eslint-disable-next-line
				console.log(err);
			})
		},
		handleClick(row, methodsName) { // 点击操作栏按钮 （调用所在父组件的方法）
			this.$parent[methodsName](row)
		},
		dealData(data, methodsName) { // 处理表格内数据
			if (!methodsName) {
				return this.$Utils.dealNullData(data)
			}
			return this.$Utils[methodsName](data)
		},
		judgeDisable(row, methodsName) { // 判断按钮是否可用
			if (methodsName) {
				return this.$parent[methodsName](row)
			}
			return false
		},
		actBtnName(row, actItemC) { // 处理按钮名称
			if (actItemC.actBtnName) {
				return this.$parent[actItemC.actBtnName](row)
			} else {
				return actItemC.label
			}
		},
		actBtnStyle(row, actItemC) {
			if (actItemC.actBtnStyle) {
				return this.$parent[actItemC.actBtnStyle](row)
			} else {
				return ''
			}
		}
	}
}
</script>

<style scoped>
.tableBtn {
	margin-left: 5px;
}
</style>
