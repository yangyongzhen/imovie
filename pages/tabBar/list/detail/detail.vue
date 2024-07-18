<template>
 
    <view>
		<view class="banner">
			 <image class="banner-img" :src="article.image" mode="widthFix"></image>
			 <view class="banner-title">{{ article.title }}</view>
		</view>
		<view class="article">
			<view class="author-info">
			  <text>作者：{{ article.author }}</text>
			  <text v-if="article.bio">，{{ article.bio }}</text>
			</view>
			<view class="content">
			  <view v-for="(item, index) in article.content" :key="index">
				<view v-if="item.types === 'p'" class="paragraph">{{ item.value }}</view>
				<view v-else-if="item.types === 'p.strong'" class="strong-paragraph">{{ item.value }}</view>
				<image class="content-image" :src="item.value" mode="widthFix"></image>
			  </view>
			</view>
		</view>
	</view>
</template>


<script>
	import { getZhihuDetail } from '@/api/zhihu.js';
	export default {
		data() {
			return {
				id:"",
				article:{}
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
				this.article = result;
			});
		}
	}
</script>

<style scoped>
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
		width: 100%;
		height: 550rpx;
		overflow: hidden;
	}

	.banner-img {
		position: absolute;
		width: 100%;
		height: auto;
		object-fit: cover;
		display: block;
		margin-bottom: 30rpx;
	}

	.banner-title {
		display: flex;
		align-items: center;
		position: absolute;
		padding: 0 15px;
		width: 100%;
		bottom: 10rpx;
		height: 110rpx;
		font-size: 30rpx;
		color: #fff;
		background: rgba(0, 0, 0, 0.4);
		overflow: hidden;
		box-sizing: border-box;
	}

	/* 文章容器样式 */
	.article {
	  padding: 20rpx;
	  font-family: Arial, sans-serif;
	}
	
	/* 标题样式 */
	.title {
	  font-size: 24px;
	  font-weight: bold;
	  color: #333;
	  margin-bottom: 10px;
	}
	
	/* 作者信息样式 */
	.author-info {
	  font-size: 24rpx;
	  color: #999;
	  margin-top: 10px;
	  margin-bottom: 20px;
	}
	
	/* 内容容器样式 */
	.content {
	  margin-top: 10rpx;
	}
	
	/* 段落样式 */
	.paragraph {
	  font-size: 30rpx;
	  color: #666;
	  line-height: 1.6;
	  margin-bottom: 10rpx;
	}
	
	/* 粗体段落样式 */
	.strong-paragraph {
	  font-size: 30rpx;
	  color: #333;
	  font-weight: bold;
	  line-height: 1.6;
	  margin-bottom: 10rpx;
	}
	
	/* 内容图片样式 */
	.content-image {
	  width: 100%;
	  height: auto;
	  margin-bottom: 20rpx;
	}
</style>
