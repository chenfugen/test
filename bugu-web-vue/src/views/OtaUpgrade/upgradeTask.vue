<template lang="html">
<div class="upgradeTask">
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
			<formComp ref='formConf' :rules='formRule' :formConf='formConf' :autoSubmit='false' :labelWidth='"120px"' ></formComp>
		</div>
		<!-- 组件外表单 -->
		<el-form ref='formPlus' :model="formPlus" :rules='formPlusRules' :label-width="'120px'" class="demo-form-inline">
			<el-form-item label="产品型号：" prop='productKey'>
				<el-select  v-model="formPlus.productKey" @change='getTargetVersion' size='small' style="width:200px;">
					<el-option v-for='(item,index) in productList' :key='index' :value='item.productKey' :label='item.label'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="起始版本：" prop='upgradableVersion'>
				<el-input type='textarea' disabled v-model="formPlus.choseUpgradableVersion"></el-input>
				<el-Button type='text' size='small' @click='handleChoseUpgradeVer()'>选择版本</el-Button>
			</el-form-item>
			<el-form-item label="目标版本：" prop='targetVersion'>
				<el-select  v-model="formPlus.targetVersion">
					<el-option v-for='(item,index) in firmwareList' :key='index' :value='item.firmwareVersion'>{{item.firmwareVersion}}</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="升级设备：" prop='upgradeAll'>
				<el-radio v-model="formPlus.upgradeAll" :label="1">全部设备</el-radio>
  				<el-radio v-model="formPlus.upgradeAll" :label="2">部分设备（任务创建后选择）</el-radio>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
	<!-- 其他弹窗 -->
	<el-dialog :title="dialogPlusTitle" :visible.sync="dialogPlusVis" >
		<el-input v-model='deviceFilter' size='small' class="deviceFilterInput" placeholder='请输入设备SN码以筛选设备'></el-input>
		<el-button icon="el-icon-search" size='small' type='primary' @click='getDeviceList' class="margin-left"/>
		<el-transfer v-if='act == "choseFirmware"' v-model="formPlus.upgradableVersion" :titles='["已选择","未选择"]' :data="firmwareList" :props='{key:"firmwareVersion",label:"firmwareVersion"}'></el-transfer>
		<el-transfer v-loading="dialogLoading" v-if='act == "chosedevice"' v-model="formPlus.deviceList" :data="deviceList" :titles='["未选择","已选择"]' :props='{key:"deviceId",label:"deviceName"}'></el-transfer>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogPlusVis = false">取 消</el-button>
			<el-button type="primary" @click="handleBackForm">确 定</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
import tableComp from '@/components/tableComp'
import formComp from '@/components/formComp'
import staticData from '@/staticData/upgradeTaskStatic.js'
export default {
	name: 'upgradeTask',
	data() {
		return {
			dialogTitle: '',
			act: '',
			deviceChoseForm: {},
			dialogVisible: false,
			dialogPlusTitle: '',
			dialogPlusVis: false,
			loading: false,
			dialogLoading: false,
			createForm: true,
			productList: [{
					productKey: '1',
					label: '测试产品A',
					productModule: 'moduleA',
				},
				{
					productKey: '2',
					label: '测试产品B',
					productModule: 'moduleB',
				}
			],
			formRule: {
				taskName: [{
					required: true,
					message: '请输入任务名称',
					trigger: 'change'
				}],
				type: [{
					required: true,
					message: '请输入任务类型',
					trigger: 'change'
				}],
				upgradeWay: [{
					required: true,
					message: '请选择升级方式',
					trigger: 'change'
				}]
			},
			formPlusRules: {
				productKey: [{
					required: true,
					message: '请选择需要升级的产品型号',
					trigger: 'change',
				}],
				targetVersion: [{
					required: true,
					message: '请选择目标版本',
					trigger: 'change'
				}],
				upgradableVersion: [{
					required: true,
					message: '请选择固件类型',
					trigger: 'change'
				}],
				upgradeAll: [{
					required: true,
					message: '请选择升级设备',
					trigger: 'change'
				}],
			},
			form: { // 添加表单
				taskName: '',
				productKey: '',
				productModel: '',
				firmwareVersion: '',
				upgradeWay: '',
				upgradeAll: '',
				deviceList: [],
				type: '',
			},
			formPlus: {
				productKey: '',
				targetVersion: '',
				upgradableVersion: [],
				choseUpgradableVersion: '',
				upgradeAll: '',
			},
			firmwareList: [],
			deviceList: [],
			deviceFilter: '',
			tableConf: staticData.tableConf,
			tableActConf: staticData.tableActConf,
			filterFormConf: staticData.filterFormConf,
			formConf: staticData.formConf,
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
		getTableData() {
			let api = this.$api.ota_task_page
			let para = this.$refs.filterForm.handleSubmit()
			this.$refs.table.getTableData(api, para)
		},
		getDeviceList() {
			this.dialogLoading = true
			let api = this.$api.ota_device_list,
				para = {
					productKey: this.deviceChoseForm.productKey,
					taskId: this.deviceChoseForm.id,
					sncode: this.deviceFilter
				}
			this.$Ax.get(api, {
				params: para
			}).then(res => {
				this.deviceList = res.data;
				this.dialogLoading = false
			}).catch(err => {
				console.log(err);
			})
		},
		getTargetVersion(value) {
			let params = this.$refs.formConf.handleSubmit()
			if (params) {
				let api = this.$api.ota_firmware_list,
					para = {
						productKey: this.formPlus.productKey,
						type: params.type,
						status: 1
					}
				this.$Ax.get(api, para).then(res => {
					this.firmwareList = res.data
				}).catch(err => {
					console.log(err);
				})
			}

		},
		handleAdd() {
			this.dialogTitle = '新增任务'
			this.dialogVisible = true
		},
		handleEdit(row) {
			this.dialogTitle = '编辑任务'
			this.dialogVisible = true
			this.loading = true
			let api = this.$api.ota_task_detail,
				para = {
					id: row.id
				}
			this.$Ax.get(api, {
				params: para
			}).then(res => {
				this.$refs.formConf.handleDataEnter(res.data)
				this.formPlus.productKey = res.data.productKey
				this.formPlus.choseUpgradableVersion = res.data.upgradableVersion
				this.formPlus.upgradableVersion = res.data.upgradableVersion.split(',')
				this.formPlus.targetVersion = res.data.targetVersion
				this.formPlus.upgradeAll = res.data.upgradeAll
				this.loading = false
			}).catch(err => {
				console.log(err);
			})
		},
		handleSubmit() {
			let para = {
					...this.formPlus,
					...this.$refs.formConf.handleSubmit()
				},
				api = this.$api.ota_task_save
			para.upgradableVersion = para.choseUpgradableVersion
			this.$Ax.post(api, para).then(res => {
				this.$message[res.success ? 'success' : 'error'](res.msg)
				this.getTableData()
				this.dialogVisible = false
			}).catch(err => {
				console.log(err);
			})
		},
		handleChoseUpgradeVer() {
			let params = this.$refs.formConf.handleSubmit()
			if (params.type != '') {
				let para = {
						productKey: this.formPlus.productKey,
						type: params.type,
						firmwareVersion: params.firmwareVersion,
						status: params.status,
					},
					api = this.$api.ota_firmware_list
				this.$Ax.get(api, para).then(res => {
					this.firmwareList = res.data
					this.dialogPlusTitle = '选择版本'
					this.act = 'choseFirmware'
					this.dialogPlusVis = true
				}).catch(err => {
					console.log(err);
				})
			}
		},
		handleBackForm() {
			for (let item in this.formPlus.upgradableVersion) {
				this.formPlus.choseUpgradableVersion = this.formPlus.choseUpgradableVersion + this.formPlus.upgradableVersion[item] + ','
			}
			this.dialogPlusVis = false
		},
		handleChooseDevice(row) {
			let api = this.$api.ota_device_list,
				para = {
					productKey: row.productKey,
					taskId: row.id
				}
			this.$Ax.get(api, {
				params: para
			}).then(res => {
				this.deviceList = res.data;
				this.deviceChoseForm = row;
				this.act = 'chosedevice';
				this.dialogPlusTitle = '查看设备';
				this.dialogPlusVis = true;
			}).catch(err => {
				console.log(err);
			})
		},
		handleForbidden(row) {
			this.$confirm('此操作将' + (row.status == 1 ? '禁用' : '启用') + '该任务, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let api = this.$api.ota_task_forbidden,
					para = {
						id: row.id,
						status: row.status == 1 ? 0 : 1
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
		handleDelete(row) {
			this.$confirm('此操作将删除该任务, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let api = this.$api.ota_task_delete,
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
		judgeEditDisbale(row) { // 判断编辑按钮禁用
			if (row.status == 1) {
				return true
			} else {
				return false
			}
		},
		deleteBtnStyle(row) { // 判断删除按钮样式
			return 'warning'
		},
		forbiddenBtnStyle(row) { // 判断禁用按钮样式
			if (row.status == 1) {
				return 'warning'
			} else {
				return 'success'
			}
		},
		forbiddenBtnName(row) { // 判断禁用按钮文字
			if (row.status == 1) {
				return '禁用'
			} else {
				return '启用'
			}
		},
		judgeDeviceDisbale(row) { // 判断设备按钮状态
			if (row.upgradeAll == 1) {
				return true
			} else if (row.status == 1) {
				return true
			}
			return false
		}
	}
}
</script>

<style scoped>
.deviceFilterInput {
	width: 300px;
	margin-bottom: 20px;
}
</style>
