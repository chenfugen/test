/*
*
*   created By Xu Peng
*
*/
<template>
<div class="register-box-container">
	<el-form :model="registerForm" :rules="rules">
		<el-form-item prop="userName">
			<el-input autofocus placeholder="用户名" :minlength="1" v-model="registerForm.userName">
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input autocomplete="off" placeholder="密码" show-password :minlength="1" v-model="registerForm.password">
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-input>
		</el-form-item>
		<el-form-item prop="repassword">
			<el-input autocomplete="off" placeholder="重复密码" show-password :minlength="1" v-model="registerForm.repassword">
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-input>
		</el-form-item>
		<el-form-item prop="code">
			<div class="verification-code-container">
				<el-input placeholder="验证码" v-model="registerForm.code"></el-input>
				<div class="verification-code">5622</div>
			</div>
		</el-form-item>
		<div style="margin-top:15px;">
			<el-button type="primary" style="width:100%" @click.stop="register">注册</el-button>
		</div>
	</el-form>
</div>
</template>

<script>
export default {
	data() {
		let validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else {
				callback();
			}
		};
		let validateCheckPass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else if (value !== this.registerForm.password) {
				callback(new Error("两次输入密码不同"));
			} else {
				callback();
			}
		};
		return {
			rules: {
				password: [{
					validator: validatePass,
					trigger: "change"
				}],
				repassword: [{
					validator: validateCheckPass,
					trigger: "change"
				}],
			},
			registerForm: {},
		};
	},
	methods: {
		register() {},
	},
}
</script>
<style lang='less'>
.register-box-container {
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
