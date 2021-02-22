<template lang="html">
<div class="role">
	<!-- 表单组件 -->
	<formComp ref='filterForm' :inline='true' :formConf='filterFormConf'></formComp>
	<!-- 搜索按钮 -->
	<el-button icon="el-icon-search" size='small' type='primary' @click='getTableData' circle></el-button>
	<!-- 添加按钮 -->
	<el-button icon="el-icon-plus" size='small' type='primary' @click='handleAdd' circle></el-button>
	<!-- 表格组件 -->
	<tableComp ref='accountTable' :tableConf='tableConf' :tableActConf='tableActConf' class="marginTop"></tableComp>
	<!-- 弹窗 -->
	<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" >
		<div>
			<formComp ref='addFormConf' v-show='act == "add"' :rules='formRule' :labelWidth='"140px"' :formConf='addFormConf' :autoSubmit='true' :submitUrl='addUrl' @handleAferSubmit='handleAferSubmit("addFormConf")'></formComp>
			<formComp ref='editFormConf' v-show='act == "edit"' :rules='formRule' :labelWidth='"140px"' :formConf='addFormConf' :autoSubmit='true' :submitUrl='editUrl' @handleAferSubmit='handleAferSubmit("editFormConf")'></formComp>
			<div v-show='act == "editTree"' >
				<el-tree ref='tree' :data="treeList" :default-checked-keys='checkTree' :node-key='"id"' :props="treeProps" show-checkbox default-expand-all></el-tree>
			</div>
		</div>
		<span slot="footer" v-show='act!="info"' class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
import staticData from '../../staticData/roleStatic'
import tableComp from '@/components/tableComp'
import formComp from '@/components/formComp'
export default {
	name: 'role',
	data() {
		return {
			act: '',
			dialogTitle: '',
			addUrl: this.$api.roleAdd,
			editUrl: this.$api.menuUpdate,
			dialogVisible: false,
			treeList: [],
			checkTree: [],
			formPer: {},
			treeProps: {
				children: 'childList',
				label: 'name'
			},
			formRule: {
				name: [{
						required: true,
						message: '请输入角色名称',
						trigger: 'blur'
					},
					{
						min: 2,
						max: 10,
						message: '长度在 2 到 10 个字符',
						trigger: 'blur'
					}
				],
				state: [{
					required: true,
					message: '请填写角色状态',
					trigger: 'blur'
				}],
				isRoot: [{
					required: true,
					message: '请填写是否为root用户',
					trigger: 'blur'
				}],
			},
			tableConf: staticData.tableConf,
			tableActConf: staticData.tableActConf,
			filterFormConf: staticData.filterFormConf,
			addFormConf: staticData.addFormConf,
			editFormConf: staticData.editFormConf,
		}
	},
	components: {
		"tableComp": tableComp,
		"formComp": formComp
	},
	mounted() {
		this.getTableData()
	},
	methods: {
		// 获取表格数据
		getTableData() {
			this.$refs.accountTable.getTableData(this.$api.rolePage, this.$refs.filterForm.handleSubmit())
		},
		// 提交表单后回调函数
		handleAferSubmit(name) {
			this.$refs[name].resetForm()
			this.dialogVisible = false
			this.act = ''
			this.dialogTitle = ''
			this.getTableData()
		},
		// 编辑
		handleEdit(row) {
			this.act = 'edit'
			this.dialogTitle = '角色编辑'
			this.dialogVisible = true
			this.$nextTick(() => {
				this.$refs.editFormConf.handleDataEnter(row)
			})
		},
		// 添加
		handleAdd() {
			this.act = 'add'
			this.dialogTitle = '添加角色'
			this.dialogVisible = true
		},
		// 提交表单
		handleSubmit() {
			if (this.act == 'editTree') {
				let list = this.$refs.tree.getCheckedNodes(),
					menuIds = []
				for (let i = 0, len = list.length; i < len; i++) {
					menuIds.push(list[i].id)
				}
				this.$Ax.post(this.$api.roleMenuUpdate, {
					menuIds: JSON.stringify(menuIds),
					roleId: this.formPer.id
				}).then(res => {
					this.$message(res.msg)
					this.dialogVisible = false
				}).catch(err => {
					// eslint-disable-next-line
					console.log(err);
				})
			} else {
				this.$refs[this.act + 'FormConf'].handleSubmit()
			}
		},
		// 编辑角色权限
		handleEditPer(row) {
			this.$Ax.get(this.$api.roleMenuList, {
				params: {
					roleId: row.id
				}
			}).then(res => {
				this.act = 'editTree'
				this.formPer = row
				this.treeList = res.data
				this.checkTree = this.handleGetCheckList(this.treeList)
				this.dialogTitle = '角色权限编辑'
				this.dialogVisible = true
			}).catch(err => {
				// eslint-disable-next-line
				console.log(err);
			})
		},
		// 获取勾选的节点
		handleGetCheckList(tree) {
			let list = []
			for (let i in tree) {
				if (tree[i].isPermission == 'Y') {

					list.push(tree[i].id)
				}
				if (tree[i].childList != null) {
					let childList = this.handleGetCheckList(tree[i].childList)
					list = list.concat(childList)
				}
			}
			return list
		},
		// 判断是否可编辑权限
		judgeEditPer(row) {
			if (row.isRoot == 'Y') {
				return true
			} else {
				return false
			}
		}
	}
}
</script>

<style lang="css" scoped>
</style>
