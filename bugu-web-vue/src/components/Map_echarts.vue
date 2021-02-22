<!--  -->
<template>
<div :id="'map_echarts_' + id" :style="mapSize"></div>
</template>

<script>
import {
	provinceMap
} from "@/utils/provinceMap";
const BAIDU_MAP_APPKEY = "yt6molK8QKGzm8Sf4WNEQg88WObAADv3";
let mapid = 0;
let myChart = null;
let map = null;
let provinceName = "";
let mydata = [{
		name: "北京",
		value: randomData()
	},
	{
		name: "天津",
		value: randomData()
	},
	{
		name: "上海",
		value: randomData()
	},
	{
		name: "重庆",
		value: randomData()
	},
	{
		name: "河北",
		value: randomData()
	},
	{
		name: "河南",
		value: randomData()
	},
	{
		name: "云南",
		value: randomData()
	},
	{
		name: "辽宁",
		value: randomData()
	},
	{
		name: "黑龙江",
		value: randomData()
	},
	{
		name: "湖南",
		value: randomData()
	},
	{
		name: "安徽",
		value: randomData()
	},
	{
		name: "山东",
		value: randomData()
	},
	{
		name: "新疆",
		value: randomData()
	},
	{
		name: "江苏",
		value: randomData()
	},
	{
		name: "浙江",
		value: randomData()
	},
	{
		name: "江西",
		value: randomData()
	},
	{
		name: "湖北",
		value: randomData()
	},
	{
		name: "广西",
		value: randomData()
	},
	{
		name: "甘肃",
		value: randomData()
	},
	{
		name: "山西",
		value: randomData()
	},
	{
		name: "内蒙古",
		value: randomData()
	},
	{
		name: "陕西",
		value: randomData()
	},
	{
		name: "吉林",
		value: randomData()
	},
	{
		name: "福建",
		value: randomData()
	},
	{
		name: "贵州",
		value: randomData()
	},
	{
		name: "广东",
		value: randomData()
	},
	{
		name: "青海",
		value: randomData()
	},
	{
		name: "西藏",
		value: randomData()
	},
	{
		name: "四川",
		value: randomData()
	},
	{
		name: "宁夏",
		value: randomData()
	},
	{
		name: "海南",
		value: randomData()
	},
	{
		name: "台湾",
		value: randomData()
	},
	{
		name: "香港",
		value: randomData()
	},
	{
		name: "澳门",
		value: randomData()
	}
];
let optionMap = {
	backgroundColor: "#FFFFFF",
	title: {
		text: "全国数据",
		subtext: ""
	},
	tooltip: {
		trigger: "item"
	},

	//左侧小导航图标
	visualMap: {
		type: "piecewise",
		show: true,
		x: "left",
		y: "center",
		splitList: [{
				start: 500,
				end: 600
			},
			{
				start: 400,
				end: 500
			},
			{
				start: 300,
				end: 400
			},
			{
				start: 200,
				end: 300
			},
			{
				start: 100,
				end: 200
			},
			{
				start: 0,
				end: 100
			}
		],
		color: ["#5475f5", "#9feaa5", "#85daef", "#74e2ca", "#e6ac53", "#9fb5ea"]
	},

	//配置属性
	series: [{
		name: "china_map",
		type: "map",
		map: "china",
		roam: false,
		label: {
			normal: {
				show: true //省份名称
			},
			emphasis: {
				show: false
			}
		},
		data: mydata //数据
	}]
};
let option = {
	// backgroundColor: '#404a59',
	title: {
		text: "全国设备分布",
		left: "center",
		textStyle: {
			color: "#fff"
		}
	},
	bmap: {
		center: [114.31, 30.52],
		zoom: 12,
		roam: true
	},
	series: [{
		name: "baidu_map",
		type: "scatter",
		coordinateSystem: "bmap",
		data: []
	}]
};
export default {
	props: {
		height: {
			type: [String, Number],
			default: 700
		},
		width: {
			type: [String, Number],
			default: 1000
		}
	},
	data() {
		return {
			id: "",
			publicPath: process.env.BASE_URL
		};
	},
	computed: {
		mapSize() {
			let height =
				typeof this.height === "number" ? this.height + "px" : this.height;
			let width =
				typeof this.width === "number" ? this.width + "px" : this.width;
			return `width:${width};height:${height};`;
		}
	},
	created() {
		this.id = mapid++;
		this.$nextTick(function() {
			this.initChart();
		});
	},
	methods: {
		setOption(option) {
			myChart.setOption(option);
		},
		initChart() {
			myChart = echarts.init(document.getElementById("map_echarts_" + this.id));
			myChart.on("click", val => {
				if (val.seriesName === "china_map") {
					addScript(val.name, this).then(() => {
						provinceName = val.name;
						const series = [{
							name: "province_map",
							map: val.name,
							data: getMockData(val.name)
						}];
						myChart.setOption({
							series
						});
					});
				} else if (val.seriesName === "province_map" && val.name) {
					myChart.clear();
					myChart.setOption(option);
					map = myChart
						.getModel()
						.getComponent("bmap")
						.getBMap();
					// map.clearOverlays();
					getBoundary(val.name);
					let points = []; // 添加海量点数据
					let arr = [119.201, 120.167, 30.0, 30.28];
					let data = Array(4000)
						.fill(1)
						.map(el => {
							return [random(arr[0], arr[1]), random(arr[2], arr[3]), 2];
						});
					for (let i = 0; i < data.length; i++) {
						points.push(new BMap.Point(data[i][0], data[i][1]));
					}
					let options = {
						size: BMAP_POINT_SIZE_SMALL,
						shape: BMAP_POINT_SHAPE_STAR,
						color: "#d340c3"
					};
					let pointCollection = new BMap.PointCollection(points, options); // 初始化PointCollection
					pointCollection.addEventListener("click", function(e) {
						alert("单击点的坐标为：" + e.point.lng + "," + e.point.lat); // 监听点击事件
					});
					map.addOverlay(pointCollection); // 添加Overlay
				}
			});
			this.setOption(optionMap);
		}
	}
};

function getMockData(name) {
	return echarts.getMap(name).geoJson.features.map(el => {
		return {
			name: el.properties.name,
			value: randomData()
		};
	});
}

function randomData() {
	return Math.round(Math.random() * 500);
}
// 对应市级地图边界变色
function getBoundary(name) {
	let bdary = new BMap.Boundary();
	bdary.get(name, function(rs) {
		//获取行政区域
		// map.clearOverlays();        //清除地图覆盖物
		let count = rs.boundaries.length; //行政区域的点有多少个
		for (let i = 0; i < count; i++) {
			let ply = new BMap.Polygon(rs.boundaries[i], {
				strokeWeight: 2, //设置多边形边线线粗
				strokeOpacity: 1, //设置多边形边线透明度0-1
				StrokeStyle: "solid", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
				strokeColor: "#ff0000", //设置多边形边线颜色
				fillColor: "#00ffff", //设置多边形填充颜色
				fillOpacity: 0.01
			}); //建立多边形覆盖物
			map.addOverlay(ply); //添加覆盖物
			map.setViewport(ply.getPath()); //调整视野
		}
	});
}
// 动态引入省级地图数据
function addScript(province, self) {
	return new Promise((resolve, reject) => {
		if (provinceMap[province]) {
			let script = document.createElement("script");
			script.src =
				self.publicPath + "map/province/" + provinceMap[province] + ".js";
			script.onload = function() {
				resolve();
				script = null;
			};
			script.onerror = function() {
				reject(`下载${province}地图失败`);
				script = null;
			};
			document.head.appendChild(script);
		}
	});
}

function random(min, max) {
	return Math.random() * (max - min) + min;
}
</script>
<style lang='less'>
</style>
