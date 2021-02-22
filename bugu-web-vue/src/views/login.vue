<template>
<div class="login clearfloat">
	<el-card class="login_card right">
		<div class="login_LOGO"></div>
		<el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm">
			<el-form-item prop="account">
				<el-input ref='accountIP' placeholder='用户名' @keyup.enter.native="handleFocus('pwdIP')" v-model="loginForm.account"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input ref='pwdIP' placeholder='密码' @keyup.enter.native="handleFocus('validateBoxIP')" v-model="loginForm.password" type="password"></el-input>
			</el-form-item>
			<el-form-item prop="code" class="clearfloat" v-loading="validateLoading">
				<el-input ref='validateBoxIP' placeholder='验证码' v-model="loginForm.code" @keyup.enter.native="handleLogin('validateBoxIP')" class="validateBoxIP"></el-input>
				<img id="validateBox" @click='handleFreshCode' class="right" :src="'/api/web/verify/code/image?codeRandom=' + codeRandom" alt="">
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleLogin()">提交</el-button>
				<el-button @click="handleReset('loginForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</div>
</template>
<script>
export default {
	name: 'login',
	data() {
		const checkCode = (rule, value, callback) => {
			if (value == '') {
				return callback(new Error('请填写验证码'))
			} else {
				let api = this.$api.code_check,
					para = {
						code: value
					}
				this.$Ax.get(api, {
					params: para
				}).then(res => {
					if (res.data) {
						callback()
					} else {
						this.handleFreshCode()
						return callback(new Error('验证码错误'))
					}
				}).catch(err => {
					// eslint-disable-next-line
					console.log(err);
				})
			}
		};
		return {
			img: '',
			focus: 'account',
			validateLoading: false,
			codeRandom: 0,
			flagSubmit: false,
			loginForm: {
				account: '',
				password: '',
				code: '',
			},
			rules: {
				account: [{
					required: true,
					message: '用户名不能为空',
					trigger: 'blur'
				}],
				password: [{
					required: true,
					message: '密码不能为空',
					trigger: 'blur'
				}],
				code: [{
					validator: checkCode,
					trigger: 'blur'
				}],
			}
		}
	},
	created() {},
	computed: {
		code() {
			return this.$store.state.login.code
		},
	},
	mounted() {},
	methods: {
		// 登录相关
		handleLogin() {
			this.flagSubmit = true
			this.$refs['loginForm'].validate((valid) => {
				if (valid) {
					this.$store.dispatch('handleLogin', this.loginForm)
				} else {
					if (this.loginForm.account == '') {
						this.$refs.accountIP.focus()
					} else if (this.loginForm.password == '') {
						this.$refs.pwdIP.focus()
					} else if (this.loginForm.code == '') {
						this.$refs.validateBoxIP.focus()
					}
					return false;
				}
			});
		},
		// 刷新验证码
		handleFreshCode() {
			this.validateLoading = true
			this.codeRandom = Math.random()
			const timer = setTimeout(() => {
				this.validateLoading = false
			}, 500);
		},
		// 控制焦点
		handleFocus() {
			if (this.loginForm.account == '') {
				this.$refs.accountIP.focus()
			} else if (this.loginForm.password == '') {
				this.$refs.pwdIP.focus()
			} else if (this.loginForm.code == '') {
				this.$refs.validateBoxIP.focus()
			} else {
				this.handleLogin()
			}
		},
		// 重置表单
		handleReset(form) {
			this.$refs[form].resetFields()
		}
	}
}
</script>
<style scope>
.login_card {
	width: 400px;
	height: 450px;
	margin-right: 200px;
	margin-top: 100px;
}

.login_LOGO {
	background-image: url('../assets/logo.jpg');
	background-size: 100% 100%;
	width: 100px;
	height: 100px;
	line-height: 80px;
	font-size: 30px;
	text-align: center;
	margin: 0 auto;
}

.validateBoxIP {
	width: 45%;
}

#validateBox {
	border-radius: 5px;
	width: 150px;
	height: 68px;
}
</style>
