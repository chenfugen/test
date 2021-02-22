<template lang="html">
<div class="account">
	<!-- 表单组件 -->
	<formComp v-if='createForm' ref='filterForm' :inline='true' :formConf='filterFormConf'></formComp>
	<!-- 搜索按钮 -->
	<el-button icon="el-icon-search" size='small' type='primary' @click='getTableData' circle></el-button>
	<!-- 添加按钮 -->
	<el-button icon="el-icon-plus" size='small' type='primary' @click='handleAdd' circle></el-button>
	<!-- 表格组件 -->
	<tableComp ref='accountTable' :tableConf='tableConf' :tableActConf='tableActConf' class="marginTop"></tableComp>
	<!-- 弹窗 -->
	<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" >
		<div v-loading="loading">
			<formComp ref='addFormConf' :rules='addRules' v-if='createForm' v-show='act == "add"' :formConf='addFormConf' :autoSubmit='false' :labelWidth='"120px"' :handleAferSubmit='getTableData'></formComp>
			<formComp ref='editFormConf' :rules='editRules' v-if='createForm' v-show='act == "edit"' :formConf='addFormConf' :autoSubmit='false' :labelWidth='"120px"' :handleAferSubmit='getTableData'></formComp>
			<el-form  v-show='act == "add"||act == "pwd"' ref='pForm' :model='pForm' status-icon :rules='pRule' :label-width='"120px"'>
				<el-form-item prop='account' v-if='act == "add"' label='登陆账号：'>
					<el-input class="input" v-model='pForm.account'/>
				</el-form-item>
				<el-form-item prop='password' label='密码：'>
					<el-input type='password' show-password class="input" v-model='pForm.password'/>
				</el-form-item>
				<el-form-item prop='rePassword' label='重复密码：'>
					<el-input type='password' show-password class="input" v-model='pForm.rePassword'/>
				</el-form-item>
			</el-form>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</div>
</template>
<script>
// import city from '../../staticData/city'
import tableComp from '@/components/tableComp'
import formComp from '@/components/formComp'
import staticData from '../../staticData/accountStatic'
export default {
	name: 'account',
	data() {
		const checkPwd = (rule, value, callback) => {
			if (value == '') {
				return callback(new Error('登陆密码不能为空'))
			} else {
				callback()
			}
		};
		const checkRePwd = (rule, value, callback) => {
			if (value != this.pForm.password) {
				return callback(new Error('两次密码输入不一致，请确认密码'))
			} else {
				callback()
			}
		};
		const checkAccount = (rule, value, callback) => {
			if (value == '') {
				return callback(new Error('登陆账号不能为空'))
			} else {
				this.$Ax.get(this.$api.admin_account_exists, {
					params: {
						account: value
					}
				}).then(res => {
					if (!res.data) {
						callback()
					} else {
						return callback(new Error('账号已存在，请修改账号'))
					}
				}).catch(err => {
					// eslint-disable-next-line
					console.log(err);
				})
			}
		};
		return {
			infoData: {},
			act: '',
			dialogTitle: '',
			createForm: false,
			editUrl: this.$api.admin_update,
			loading: false,
			addRules: {
				name: [{
					required: true,
					message: '请填写用户名',
					trigger: 'blur'
				}],
				roleId: [{
					required: true,
					message: '请选择所属角色',
					trigger: 'blur'
				}],
				state: [{
					required: true,
					message: '请选择用户状态',
					trigger: 'blur'
				}],
			},
			editRules: {
				name: [{
					required: true,
					message: '用户名',
					trigger: 'blur'
				}],
				account: [{
					required: true,
					message: '用户名',
					trigger: 'blur'
				}],
			},
			pForm: {
				password: '',
				rePassword: '',
				account: '',
			},
			pRule: {
				account: [{
					validator: checkAccount,
					trigger: 'blur'
				}],
				password: [{
					validator: checkPwd,
					trigger: 'blur'
				}],
				rePassword: [{
					validator: checkRePwd,
					trigger: 'blur'
				}],
			},
			dialogVisible: false,
			tableConf: staticData.tableConf,
			tableActConf: staticData.tableActConf,
			filterFormConf: staticData.filterFormConf,
			addFormConf: staticData.addFormConf,
		}
	},
	components: {
		'tableComp': tableComp,
		'formComp': formComp
	},
	mounted() {
		this.getRoleList()
	},
	methods: {
		// 获取角色立标
		getRoleList() {
			let api = this.$api.rolePage,
				para = {
					pageNum: 1,
					pageSize: 100000,
				}
			this.$Ax.get(api, para).then(res => {
				let list = []
				for (let i in res.data.list) {
					if (res.data.list[i].state == 'Y') {
						list.push(res.data.list[i])
					}
				}
				this.filterFormConf[1].selectList = list
				this.addFormConf[2].selectList = list
				this.createForm = true
			}).catch(err => {
				// eslint-disable-next-line
				console.log(err);
			}).then(() => {
				this.getTableData()
			})
		},
		// 获取表格
		getTableData() {
			let api = this.$api.admin_page,
				para = this.$refs.filterForm.handleSubmit()
			this.$refs.accountTable.getTableData(api, para)
		},
		// 编辑
		handleEdit(row) {
			let api = this.$api.admin_detail;
			this.act = 'edit'
			this.dialogTitle = '编辑'
			this.$Ax.get(api, {
				params: {
					id: row.id
				}
			}).then(res => {
				this.dialogVisible = true
				this.infoData = res.data
			}).catch(err => {
				// eslint-disable-next-line
				console.log(err);
			}).then(() => {
				this.$refs.editFormConf.handleDataEnter(this.infoData)
			})
		},
		// 添加
		handleAdd() {
			this.act = 'add'
			this.dialogTitle = '添加'
			this.dialogVisible = true
		},
		// 删除
		handleDelete(row) {
			let para = {
				name: row.name,
			}
			this.$confirm('确认删除该用户（' + row.name + '）？', '确认信息', {
				distinguishCancelAndClose: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消'
			}).then(() => {
				this.$Ax.post('/mock/deleteUser', para)
					.then(() => {
						this.getTableData()
					})
					.catch(err => {
						// eslint-disable-next-line
						console.log(err);
					})
			}).catch(() => {
				this.$message({
					type: 'success',
					message: '已取消删除'
				})
			});
		},
		// 修改密码
		handleEditPwd(row) {
			this.infoData = row
			this.act = 'pwd'
			this.dialogTitle = '修改密码'
			this.dialogVisible = true
		},
		// 提交表单
		handleSubmit() {
			if (this.act == 'add') {
				let para = this.$refs[this.act + 'FormConf'].handleSubmit(),
					api = ''
				api = this.$api.admin_add
				para = Object.assign(para, this.pForm)
				this.$refs.pForm.validate((valid) => {
					if (valid) {
						this.$Ax.post(api, para).then(res => {
							if (res.success) {
								this.$Message.success('创建成功')
							}
							this.dialogVisible = false
							this.resetForm()
							this.getTableData()
						}).catch(err => {
							// eslint-disable-next-line
							console.log(err);
						})
					}
				})
			} else if (this.act == 'edit') {
				let para = this.$refs[this.act + 'FormConf'].handleSubmit(),
					api = this.$api.admin_update
				para.id = this.infoData.id
				this.$Ax.post(api, para).then(() => {
					this.dialogVisible = false
					this.getTableData()
				}).catch(err => {
					// eslint-disable-next-line
					console.log(err);
				})
			} else {
				let para = {
						password: this.pForm.password,
						id: this.infoData.id
					},
					api = this.$api.reset_password
				this.$Ax.post(api, para).then(() => {
					this.dialogVisible = false
					this.resetForm()
					this.getTableData()
				}).catch(err => {
					// eslint-disable-next-line
					console.log(err);
				})
			}
		},
		// 重置表单
		resetForm() {
			this.$refs.pForm.resetFields();
		}
	}
}
</script>

<style scoped>
.input {
	width: 200px
}
</style>
