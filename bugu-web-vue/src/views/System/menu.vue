<template lang="html">
<div class="permission">
	<!-- 表单组件 -->
	<formComp ref='filterForm' :inline='true' :formConf='filterFormConf'></formComp>
	<!-- 筛选外加条件 -->
	<el-form class="demo-form-inline">
		<el-form-item>
			<el-cascader size='small' :options="treeList" :props='cascaderProps' :placeholder='"父级菜单"' v-model='checkMenu' style='width:250px' filterable clearable></el-cascader>
		</el-form-item>
	</el-form>
	<!-- 返回父级 -->
	<!-- <el-button v-show='pid!=""' icon="el-icon-back" size='small' type='primary' @click='handleBackPid' circle></el-button> -->
	<!-- 搜索按钮 -->
	<el-button icon="el-icon-search" size='small' type='primary' @click='getTableData' circle></el-button>
	<!-- 添加按钮 -->
	<el-button icon="el-icon-plus" size='small' type='primary' @click='handleAdd' circle></el-button>
	<!-- 查看树形按钮 -->
	<el-button icon="el-icon-document" size='small' type='primary' @click='handleViewTree' circle></el-button>
	<!-- 表格组件 -->
	<tableComp ref='accountTable' :tableConf='tableConf' :tableActConf='tableActConf' class="marginTop"></tableComp>
	<!-- 弹窗 -->
	<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" @close='handleResetData()'>
		<div>
			<formComp ref='addFormConf' v-show='act == "add"' :labelWidth='"140px"' :formConf='addFormConf' :rules="formRule"></formComp>
			<formComp ref='editFormConf' v-show='act == "edit"' :labelWidth='"140px"' :formConf='addFormConf'></formComp>
			<formComp ref='infoFormConf' v-show='act == "info"' :labelWidth='"140px"' :formConf='infoFormConf'></formComp>
			<div v-show='act != "tree"'>
				<el-form :rules='pFormRule' ref='pForm' class="demo-form-inline" label-width='140px'>
					<el-form-item label="是否为操作接口：" prop='isOperation'>
						<el-switch v-model="pForm.isOperation" active-text="是" inactive-text="否" :active-value='"Y"' :inactive-value='"N"'>
						</el-switch>
			        </el-form-item>
					<el-form-item label="操作接口标示：" v-show='pForm.isOperation == "Y"'>
						<el-select class='formInput' size='small' allow-create filterable v-model='pForm.operationCode'  placeholder="可不选，也可自定义" clearable :disabled='act=="info"'>
			                <el-option v-for='item in actCode' :key='item.value' :value="item.value" :label='item.label'></el-option>
			            </el-select>
			        </el-form-item>
			        <el-form-item label="父级菜单：" >
						<span></span>
						<el-cascader size='small' :options="treeList" :props='cascaderProps' :change-on-select='true' v-model='pForm.pid' style='width:250px' :disabled='act=="info"' filterable clearable></el-cascader>
			        </el-form-item>
			    </el-form>
			</div>
			<div v-show='act == "tree"' >
				<el-tree :data="treeList" :props="treeProps" default-expand-all></el-tree>
			</div>
		</div>
		<span slot="footer" v-show='act!="info"&&act!="tree"' class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
import staticData from '../../staticData/menuStatic'
import tableComp from '@/components/tableComp'
import formComp from '@/components/formComp'
export default {
	name: 'permission',
	data() {
		return {
			act: '',
			pid: '',
			dialogTitle: '',
			editPName: '',
			pForm: {
				isOperation: '',
				operationCode: '',
				pName: '',
				pid: [],
			},
			showEditPid: false,
			dialogVisible: false,
			showActCode: false,
			actCode: [],
			treeList: [],
			checkMenu: [],
			editCheckMenu: [],
			pFormRule: {
				isOperation: [{
					required: true,
					message: '请选择是否为操作接口',
					trigger: 'blur'
				}],
			},
			formRule: {
				name: [{
						required: true,
						message: '请输入菜单名称',
						trigger: 'blur'
					},
					{
						min: 2,
						max: 10,
						message: '长度在 2 到 5 个字符',
						trigger: 'blur'
					}
				],
				url: [{
					required: true,
					message: '请输入菜单路径或请求地址（若无请填写#）',
					trigger: 'blur'
				}, ],
				sortNum: [{
					required: true,
					message: '请输入排序号',
					trigger: 'blur'
				}, ],
				isOperation: [{
					required: true,
					message: '请选择操作标示',
					trigger: 'blur'
				}],
				state: [{
					required: true,
					message: '请选择状态',
					trigger: 'blur'
				}],
			},
			cascaderProps: {
				children: 'childList',
				label: 'name',
				value: 'id'
			},
			treeProps: {
				children: 'childList',
				label: 'name'
			},
			tableConf: staticData.tableConf,
			tableActConf: staticData.tableActConf,
			filterFormConf: staticData.filterFormConf,
			addFormConf: staticData.addFormConf,
			editFormConf: staticData.editFormConf,
			infoFormConf: staticData.infoFormConf,
		}
	},
	components: {
		"tableComp": tableComp,
		"formComp": formComp
	},
	mounted() {
		this.menuOperationCode()
		this.getTableData()
		this.getTreeAll()
	},
	methods: {
		// 获取菜单类型
		menuOperationCode() {
			let api = this.$api.menuOperationCode
			this.$Ax.get(api)
				.then(res => {
					let list = []
					for (let i in res.data) {
						list.push({
							value: res.data[i].code,
							label: res.data[i].name
						})
					}
					this.actCode = list
				}).catch(err => {
					// eslint-disable-next-line
					console.log(err);
				})
		},
		// 获取所有菜单树形
		getTreeAll() {
			let api = this.$api.menuTree
			this.$Ax.get(api).then(res => {
				this.treeList = res.data
			}).catch(err => {
				// eslint-disable-next-line
				console.log(err);
			})
		},
		// 获取表格数据
		getTableData() {
			let api = this.$api.menuPage,
				para = this.$refs.filterForm.handleSubmit()
			para.pid = this.checkMenu[this.checkMenu.length - 1]
			this.editCheckMenu = [].concat(this.checkMenu)
			this.$refs.accountTable.getTableData(api, para)
		},
		// 获取子集列表
		getChildList(row) {
			let api = this.$api.menuPage,
				para = this.$refs.filterForm.handleSubmit()
			para.pid = row.id
			this.editCheckMenu.push(row.id)
			this.checkMenu.push(row.id)
			this.$refs.accountTable.getTableData(api, para)
		},
		// // 返回上级
		// handleBackPid() {
		// 	let api = this.$api.menuPage,
		// 		para = this.$refs.filterForm.handleSubmit()
		// 	para.pid = this.pid
		// 	this.editCheckMenu.push(row.id)
		// 	this.checkMenu.push(row.id)
		// 	this.$refs.accountTable.getTableData(api, para)
		// },
		// 编辑
		handleEdit(row) {
			this.act = 'edit'
			this.dialogTitle = '菜单编辑'
			this.$Ax.get(this.$api.menuDetail, {
				params: {
					id: row.id
				}
			}).then(res => {
				this.dialogVisible = true
				this.pForm.operationCode = res.data.operationCode
				this.pForm.pName = res.data.pname
				this.pForm.pid = [].concat(this.editCheckMenu)
				this.$nextTick(() => {
					this.$refs.editFormConf.handleChangeLoading(true)
					this.$refs.editFormConf.handleDataEnter(res.data, ['id'])
				})
			}).catch(err => {
				// eslint-disable-next-line
				console.log(err);
			})
		},
		// 添加
		handleAdd() {
			this.act = 'add'
			this.dialogTitle = '添加菜单'
			this.dialogVisible = true
			this.pForm.pid = [].concat(this.editCheckMenu)
			this.$nextTick(() => {
				this.$refs.addFormConf.resetForm()
			})
		},
		// 删除
		handleCreateChild(row) {
			this.pForm.pid = this.editCheckMenu.concat([row.id])
			this.act = 'add'
			this.dialogVisible = true
			this.dialogTitle = '添加子菜单'
		},
		// 提交表单
		handleSubmit() {
			let data = this.$refs[this.act + 'FormConf'].handleSubmit()
			if (data) {
				data.pid = this.pForm.pid[this.pForm.pid.length - 1]
				data.operationCode = this.pForm.operationCode
				data.isOperation = this.pForm.isOperation
				let api = this.act == 'edit' ? this.$api.menuUpdate : this.$api.menuAdd
				this.$Ax.post(api, data).then(res => {
					this.getTableData()
					this.getTreeAll()
					this.dialogVisible = false
				}).catch(err => {
					// eslint-disable-next-line
					console.log(err);
				})
			}
		},
		// 查看菜单详情
		handleInfo(row) {
			this.act = 'info'
			this.dialogTitle = '菜单详情'
			this.dialogVisible = true
			this.$nextTick(() => {
				this.$refs.infoFormConf.handleDataEnter(row)
			})
		},
		// 查看整个树形
		handleViewTree() {
			this.dialogTitle = '完整菜单'
			this.act = 'tree'
			this.dialogVisible = true
		},
		// 重制部分数据
		handleResetData() {
			this.dialogVisible = false
			this.getTableData()
			this.showEditPid = false
		},
		// 处理空数据
		handleDealNullData(data) {
			return this.$Utils.dealNullData(data)
		},
	}
}
</script>

<style lang="css" scoped>
</style>
