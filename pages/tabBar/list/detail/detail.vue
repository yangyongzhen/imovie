<template>
	<view>
		
	</view>
</template>

<script>
	import { getZhihuDetail } from '@/api/zhihu.js';
	export default {
		data() {
			return {
				id:""
			}
		},
		onLoad(params) {
			console.log('detail onload');
			console.log(params);
			this.id = params.id;
		},
		methods: {
			
		},
		mounted() {
			console.log("mounted")
			console.log(this.id)
			getZhihuDetail(this.id).then(result => {
				console.log("getZhihuDetail,result:");
				console.log(result);
			});
		}
	}
</script>

<style>
	page {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			background-color: #efeff4;
			min-height: 100%;
			height: auto;
		}
		
	.banner {
		position: relative;
		margin: 0 15px;
		height: 180px;
		overflow: hidden;
	}

	.banner-img {
		position: absolute;
		width: 100%;
	}

	.banner-title {
		display: flex;
		align-items: center;
		position: absolute;
		padding: 0 15px;
		width: 100%;
		bottom: 0;
		height: 30px;
		font-size: 14px;
		color: #fff;
		background: rgba(0, 0, 0, 0.4);
		overflow: hidden;
		box-sizing: border-box;
	}

	.uni-ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.article-title {
		padding: 20px 15px;
		padding-bottom: 0;
	}

	.article-content {
		padding: 15px;
		font-size: 15px;
		overflow: hidden;
	}
</style>
