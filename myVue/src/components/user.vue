<template>
	<div>
	<mt-header title="电话薄" fixed>
		<router-link to="/"  slot="left">
			<mt-button icon="back">返回</mt-button>
		</router-link>
		<mt-button icon="more" slot="right"></mt-button>
	</mt-header>
	<mt-index-list class="content">
		<mt-index-section v-for="item in users" :index="item.index" :key="item.id">
			<mt-cell v-for="use in item.user" @click.native="telPhone(use.tel)" :title="use.name" :key="use.id"></mt-cell>
		</mt-index-section>
	</mt-index-list>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui'; //引入
	var users = [{
			"index": "A",
			"user": [{
					"name": "a1",
					"tel": "15868411710"
				},
				{
					"name": "a2",
					"tel": "15868411711"
				},
				{
					"name": "a3",
					"tel": "15868411712"
				}
			]
		},
		{
			"index": "B",
			"user": [{
					"name": "b1",
					"tel": "15868411714"
				},
				{
					"name": "b2",
					"tel": "15868411715"
				},
				{
					"name": "b3",
					"tel": "15868411716"
				}
			]
		},
		{
			"index": "C",
			"user": [{
					"name": "c1",
					"tel": "15868411717"
				},
				{
					"name": "c2",
					"tel": "15868411718"
				},
				{
					"name": "c3",
					"tel": "15868411719"
				}
			]
		},
		{
			"index": "D",
			"user": [{
					"name": "d1",
					"tel": "15868411720"
				},
				{
					"name": "d2",
					"tel": "15868411721"
				},
				{
					"name": "d3",
					"tel": "15868411722"
				}
			]
		},
		{
			"index": "E",
			"user": [{
					"name": "e1",
					"tel": "15868411720"
				},
				{
					"name": "e2",
					"tel": "15868411721"
				},
				{
					"name": "e3",
					"tel": "15868411722"
				}
			]
		},
		{
			"index": "F",
			"user": [{
					"name": "f1",
					"tel": "15868411720"
				},
				{
					"name": "f2",
					"tel": "15868411721"
				},
				{
					"name": "f3",
					"tel": "15868411722"
				}
			]
		}

	]
	export default {
		data() {
			return {
				users: users
			}
		},
		methods: {
			telPhone: function(tel) {
				MessageBox.confirm(tel,"拨号").then(function() {
					alert(1)
				})
			}
		}
	}
</script>

<style>
	* {
		margin: 0px;
		padding: 0px;
	}
	
	.content {
		margin-top: 41px;
	}
</style>