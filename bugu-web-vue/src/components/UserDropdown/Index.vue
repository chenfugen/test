/*
*
*   created By Xu Peng
*
*/
<template>
<el-dropdown trigger="hover" @command="handleCommand">
	<span class="user-dropdown">{{userName}}</span>
	<el-dropdown-menu slot="dropdown" class="user-dropdown-menu">
		<template v-for="(item, index) in items">
			<el-dropdown-item :key="index" :divided="index === items.length - 1" :command="item.command">
				<span>
					<i :class="item.iconClass" class="left-icon"></i>
					<span>{{ item.label }}</span>
				</span>
			</el-dropdown-item>
		</template>
	</el-dropdown-menu>
</el-dropdown>
</template>

<script>
export default {
	data() {
		return {
			items: [{
					iconClass: "iconfont icon-xiazai",
					label: "个人中心",
					command: 'user'
				},
				{
					iconClass: "iconfont icon-mima",
					label: "消息记录",
					command: 'message'
				},
				{
					iconClass: "iconfont icon-caozuo_zhuxiao_tuichudenglu",
					label: "退出登录",
					command: 'logout'
				}
			]
		};
	},
	computed: {
		userName() {
			return this.$Store.state.user.userName
		}
	},
	methods: {
		handleCommand(command) {
			switch (command) {
				case 'logout':
					this.$Store.dispatch('handleLogout')
					break;
				case 'user':
					// do some logic
					break;
				case 'message':
					// do some logic
					break;
				default:
			}
		},
	},
};
</script>
<style lang='less'>
.user-dropdown {
    display: inline-block;
}
.user-dropdown-menu {
    &.el-dropdown-menu {
        .el-dropdown-menu__item {
            padding: 0 12px;
            min-width: 160px;
            .left-icon {
                line-height: 0;
                vertical-align: -1px;
            }
        }
        .el-dropdown-menu__item--divided {
            &:before {
                margin: 0 -12px;
            }
        }
    }
}
</style>
