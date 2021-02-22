/*
*
*   created By Xu Peng
*
*/
<template>
<div class="notification-item-container">
	<div>
		<div class="notification-item" v-for="item in items" :key="item.id" @click.stop="handleMessageClick(item)">
			<div class="notification-item-title">这是这条通知的标题</div>
			<div class="notification-item-description">
				<div class="notification-item-description-detail">这里是这条信息的简要概述，限制一定长度</div>
				<div class="notification-item-description-date">2018/9/9</div>
			</div>
		</div>
	</div>
	<section class="notification-button">
		<div class="notification-button-left" @click.stop="handleMessageClear">清空</div>
		<div class="notification-button-right" @click.stop="handleMessageMore">查看更多</div>
	</section>
</div>
</template>
<script>
export default {
	name: 'NotificationItem',
	props: {
		title: {
			type: String,
			default: '',
		},
		name: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			items: [{
				x: 1
			}, {}, {}]
		};
	},
	methods: {
		handleMessageClick(item) {
			this.$emit('on-click', item)
		},
		handleMessageClear() {
			this.$emit('on-clear')
		},
		handleMessageMore() {
			this.$emit('on-getMore')
		},
	},
}
</script>
<style lang='less'>
.notification-item-container {
    .notification-item {
        border-bottom: 1px solid #e8e8e8;
        padding: 12px 24px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
            background: #e6f7ff;
        }
        &:last-child {
            border-bottom: none;
        }
        .notification-item-title {
            margin-bottom: 6px;
            color: rgba(0,0,0,.65);
        }
        .notification-item-description {
            color: rgba(0,0,0,.45);
            font-size: 12px;
            line-height: 1.5;
        }
    }
    .notification-button {
        height: 46px;
        color: rgba(0,0,0,.65);
        line-height: 46px;
        text-align: center;
        cursor: pointer;
        border-top: 1px solid #e8e8e8;
        border-radius: 0 0 4px 4px;
        transition: all 0.3s;
        div {
            display: inline-block;
            width: 50%;
            user-select: none;
            &:not(:only-child):last-child {
                border-left: 1px solid #e8e8e8;
            }
        }
    }
}
</style>
