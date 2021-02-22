<template lang="html">
<div class="firmware">
	<!-- 表单组件 -->
	<formComp ref='filterForm' :inline='true' :formConf='filterFormConf'></formComp>
    <!-- 操作按钮 -->
    <el-button icon="el-icon-search" size='small' type='primary' @click='getTableData' circle/>
    <el-button icon="el-icon-plus" size='small' type='primary' @click='handleAdd' circle/>
	<!-- 表格组件 -->
	<tableComp ref='table' :tableConf='tableConf' :tableActConf='tableActConf' class="marginTop"></tableComp>
    <!-- 弹窗 -->
	<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" >
		<div v-loading="loading">
			<formComp ref='addFormConf' :rules='formRule' v-if='createForm' :formConf='addFormConf' :autoSubmit='false' :labelWidth='"120px"' ></formComp>
			<el-form ref='firmwareForm' :model="firmwareForm" :rules='firmwareFormRule' class="demo-form-inline" label-width='120px'>
				<el-form-item label='上传固件：' prop='downLoadUrl'>
					<el-upload
						class="upload-demo"
						:action="uploadUrl"
						:data='uploadData'
						:accept='".bin"'
						:on-success='handleOnSuccess'
						:before-upload='handleBeforeUpload'
						:file-list="fileList">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传.bin文件，且不超过</div>
					</el-upload>
					<!--
					action:'上传地址'
					data：附带参数
					accept:接受文件类型
					on-success:上传成功回调，
					on-error:上传失败回调
					on-error:上传失败回调
				 -->
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
import tableComp from '@/components/tableComp'
import formComp from '@/components/formComp'
import staticData from '@/staticData/firmwareStatic.js'
export default {
	name: 'firmware',
	data() {
		return {
			productList: [{
				productKey: '1',
				label: '测试产品A',
				productModule: 'moduleA',
			}, {
				productKey: '2',
				label: '测试产品B',
				productModule: 'moduleB',
			}],
			loading: false, // 控制表单loading
			dialogVisible: false, // 控制渲染弹窗
			createForm: true, // 控制渲染表单组件
			dialogTitle: '', // 弹窗标题
			form: { // 新增/编辑 表单
				productKey: '',
				firmwareModel: '',
				firmwareVersion: '',
				downLoadUrl: '',
				type: '',
				description: '',
				crcSign: '',
				fileSize: '',
				id: '',
			},
			uploadData: { // 上传文件附带参数
			},
			firmwareForm: { // 外加表单 文件地址
				downLoadUrl: '',
			},
			formRule: {
				productKey: [{
					required: true,
					message: '请选择产品',
					trigger: 'change'
				}],
				firmwareVersion: [{
					required: true,
					message: '请填写固件版本',
					trigger: 'change'
				}],
				downLoadUrl: [{
					required: true,
					message: '请填写固件下载地址',
					trigger: 'change'
				}],
				type: [{
					required: true,
					message: '请选择固件类型',
					trigger: 'change'
				}],
			}, // 表单校验规则
			firmwareFormRule: {
				downLoadUrl: [{
					required: true,
					message: '请上传文件',
					trigger: 'change'
				}],
			},
			fileList: [], // 已上传文件列表（用于编辑数据回写）
			tableConf: staticData.tableConf, // 表格配置数据
			tableActConf: staticData.tableActConf, // 表格操作配置
			addFormConf: staticData.addFormConf, // 新增/编辑 表单配置项
			filterFormConf: staticData.filterFormConf // 筛选表单配置项
		}
	},
	computed: {
		uploadUrl() {
			return this.$api.file_upload
		}
	},
	components: {
		'tableComp': tableComp,
		'formComp': formComp
	},
	mounted() {
		this.getTableData()
	},
	methods: {
		getTableData() { // 获取表格数据
			let api = this.$api.ota_firmware_page,
				para = this.$refs.filterForm.handleSubmit()
			this.$refs.table.getTableData(api, para)
		},
		handleAdd() { // 新增
			this.dialogTitle = '添加新固件'
			this.dialogVisible = true
		},
		handleSubmit() { // 提交表单
			let para = this.$refs.addFormConf.handleSubmit()
			if (para) {
				for (let i in this.productList) {
					if (this.productList[i].productKey == para.productKey) {
						para.firmwareModel = this.productList[i].productModule
					}
				}
			}
			this.$refs.firmwareForm.validate((valid) => {
				if (valid) {
					para.downLoadUrl = this.firmwareForm.downLoadUrl
					let api = this.$api.ota_firmware_save
					this.$Ax.post(api, para).then(res => {
						// eslint-disable-next-line
						this.dialogVisible = false
					}).catch(err => {
						// eslint-disable-next-line
						console.log(err);
					})
				} else {
					return false;
				}
			});
		},
		handleBeforeUpload(file) { //文件上传前的回调
			if (file.size > 1024000) {
				this.$message.error('文件大小不可超过1024KB,请重新选择。')
				return false
			} else {
				return true
			}
		},
		handleEdit(row) { // 编辑
			this.dialogTitle = '编辑'
			let api = this.$api.ota_firmware_detail,
				para = {
					id: row.id
				},
				infoData = {}
			this.$Ax.get(api, {
				params: para
			}).then(res => {
				// eslint-disable-next-line
				this.dialogVisible = true
				infoData = res.data
			}).catch(err => {
				// eslint-disable-next-line
				console.log(err);
			}).then(() => {
				this.$refs.addFormConf.handleDataEnter(infoData)
			})
		},
		handleDelete(row) { // 删除
			this.$confirm('此操作将删除该固件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let api = this.$api.ota_firmware_delete,
					para = {
						id: row.id
					}
				this.$Ax.post(api, para).then(res => {
					// eslint-disable-next-line
					this.$message[res.success ? 'success' : 'error'](res.msg)
					this.getTableData()
				}).catch(err => {
					// eslint-disable-next-line
					console.log(err);
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		handleOnSuccess(response, file, fileList) { // 上传前
			this.firmwareForm.downLoadUrl = file.response.data
		},
		handleForbidden(row) { // 禁/启用
			this.$confirm('此操作将' + (row.status == 0 ? '启用' : '禁用') + '该固件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let api = this.$api.ota_firmware_forbidden,
					para = {
						id: row.id,
						status: row.status == 0 ? 1 : 0
					}
				this.$Ax.post(api, para).then(res => {
					// eslint-disable-next-line
					this.$message[res.success ? 'success' : 'error'](res.msg)
					this.getTableData()
				}).catch(err => {
					// eslint-disable-next-line
					console.log(err);
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		// 配合组件
		forbiddenBtnName(row) {
			if (row.status == 0) {
				return '启用'
			} else {
				return '停用'
			}
		},
		forbiddenBtnStyle(row) {
			if (row.status == 0) {
				return 'success'
			} else {
				return 'warning'
			}
		},
		deleteBtnStyle() {
			return 'warning'
		}
	}
}
</script>

<style scoped>
</style>
