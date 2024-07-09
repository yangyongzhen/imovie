<template>
	<view v-if="isLoaded">
			
		<view class="banner">
			<image class="banner-img" :src="mv.images"  mode="heightFix"></image>
			<view class="banner-title">
				{{mv.title}}({{mv.year}})
				<view  class="banner-title-small">
					{{mv.genre}} / {{mv.countries}}
				</view>
			</view>
		</view>
		<view class="movie-rate">
			豆瓣评分
			<uni-rate :readonly="true" :value="mv.rate/2" size=20 active-color="#ffaa00" color="#DADADA">
			</uni-rate>
			<text class="movie-rate-t">{{mv.rate}}</text>
		</view>
		<view class="movie-jianjie" >
			简介
		</view>
		<view class="movie-summary">
			{{mv.summary}}
		</view>
	</view>

</template>

<script>
	import { getMovieDetail } from '@/api/home.js';
	export default {
		data() {
			return {
				id:"",
				mv:{},
				isLoaded:false
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
			getMovieDetail(this.id).then(result => {
				console.log("getMovieDetail,result:");
				console.log(result);
				this.mv = result;
				this.isLoaded = true;
			});
		}
	}
</script>

<style>
	page {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			background-color: #f8f4f5;
			min-height: 100%;
			height: auto;
		}
		
	.banner {
		display: flex;
		flex-direction: row;
		margin: 10rpx 20rpx;
		width: 100%;
		overflow: hidden;
	}

	.banner-img {
		border-radius: 10rpx;
		width: 180rpx;
		height: 250rpx;
	}

	.banner-title {
		display: flex;
		flex-direction: column;
		align-items: left;

		padding: 0 15px;
		width: 80%;
		bottom: 0;
		height: 100rpx;
		font-size: 42rpx;
		font-weight: bold;
		color: #000000;
		
		overflow: hidden;
		box-sizing: border-box;
	}
	
	.banner-title-small {
		align-items: left;
		bottom: 0;
		margin-top: 5rpx;
		height: 40rpx;
		font-size: 22rpx;
		
		color: #606266;
		
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
	.movie-rate {
		display: flex;
		align-items: center;
		padding: 10px;
		height: 80rpx;
		line-height: 40rpx;
		
		margin-bottom: 15rpx;
	}
	
	.movie-rate-t {
		margin-left: 14rpx;
		font-size: 58rpx;
		font-weight: bold;
	}
	.movie-jianjie {
		padding: 10px;
		font-size: 42rpx;
		font-weight: bold;
	}
	.movie-summary {
		padding: 10px;
		font-size: 28rpx;
		overflow: hidden;
	}
</style>
