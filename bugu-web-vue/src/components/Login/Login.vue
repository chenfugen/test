/*
*
*   created By Xu Peng
*
*/
<template>
<div class="login-box-container">
	<el-form ref="login" :model="loginForm" :rules="rules">
		<el-form-item prop="userName">
			<el-input autofocus placeholder="用户名" :minlength="1" v-model="loginForm.userName">
				<i slot="prefix" class="el-input__icon iconfont icon-xiazai"></i>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input autocomplete="off" placeholder="密码" show-password :minlength="1" v-model="loginForm.password">
				<i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
			</el-input>
		</el-form-item>
		<el-form-item prop="code">
			<div class="verification-code-container">
				<el-input autocomplete="off" placeholder="验证码" v-model="loginForm.code"></el-input>
				<div class="verification-code">5622</div>
			</div>
		</el-form-item>
		<div>
			<el-checkbox v-model="loginForm.keep">保持登录</el-checkbox>
		</div>
		<div style="margin-top:15px;">
			<el-button :loading="loading" type="primary" style="width:100%" @click.stop="login">登录</el-button>
		</div>
	</el-form>
</div>
</template>

<script>
export default {
	data() {
		let validateName = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入用户名"));
			} else {
				callback();
			}
		};
		let validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else {
				callback();
			}
		};
		let validateCode = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入验证码"));
			} else {
				callback();
			}
		};
		return {
			loading: false,
			rules: {
				userName: [{
					validator: validateName,
					trigger: "change"
				}],
				password: [{
					validator: validatePass,
					trigger: "change"
				}],
				code: [{
					validator: validateCode,
					trigger: "change"
				}],
			},
			loginForm: {
				userName: "",
				password: "",
				code: "",
				keep: ""
			}
		};
	},
	methods: {
		login() {
			let valid = this.$refs['login'].validate()
			valid.then(async (val) => {
					this.loading = true
					const res = await fetch('http://localhost:8080/user/login')
					this.loading = false
					this.$emit('on-submit', this.loginForm)
				})
				.catch((val) => {
					console.log(val)
				})
		}
	}
};
</script>
<style lang='less'>
.login-box-container {
    width: 350px;
    margin: 0 auto;
    .verification-code-container {
        display: flex;
        .el-input {
            width: 200px;
        }
        .verification-code {
            flex: 1;
            margin-left: 15px;
            background: #ccc;
            border-radius: 10px;
            text-align: center;
            overflow: hidden;
        }
    }
}
</style>
