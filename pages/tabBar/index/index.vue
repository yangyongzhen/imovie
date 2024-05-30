<template>
	<view class="content">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration"  lazy-render>
				
				<swiper-item v-for="item in swiperList" :key="item.id">
				    <image :src="item.imageUrl" :alt="item.title" mode="widthFix" class="swiper-image"></image>
					 <view class="swiper-desc" v-if="item.description">{{ item.description }}</view>
				</swiper-item>
				
			</swiper>
			<uni-notice-bar scrollable="true" text="这里是滚动显示的公告内容" speed:='30' style="margin-top: 5rpx;"></uni-notice-bar>
		</view>
	</view>
</template>

<script>
	import { getSwiperList, getTop250,getNowHot } from '@/api/home.js';
	export default {
		data() {
			return {
				title: 'Hello',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				// 轮播图的数据列表，默认为空数组
				swiperList:[],
			    swiperList1: [
			            {
			              id: 1,
			              imageUrl: '/static/swiper/1.jpg',
			              title: '标题1',
			              description: '描述1',
			            },
			            {
			              id: 2,
			              imageUrl: '/static/swiper/2.jpg',
			              title: '标题2',
			              description: '描述2',
			            },
			            {
			              id: 3,
			              imageUrl: '/static/swiper/3.jpg',
			              title: '标题3',
			              description: '描述3',
			            }]
			}
		},
		async onLoad() {
			console.log("onLoad")
			//console.log(this.swiperList)
		},
		methods: {
				
		},
		mounted() {
			console.log("mounted")
			getSwiperList().then(item => {
				this.swiperList = item;
			});
			getTop250(0,5).then(item => {
				//this.swiperList = item;
			});
			
			getNowHot(0,2,"郑州").then(result => {
				//this.swiperList = item;
				console.log("getNowHot,result:");
				console.log(result);
			});
			
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.uni-margin-wrap {
			width: 690rpx;
			width: 100%;
		}
	.swiper {
		height: 300rpx;
	}
	
	.swiper-image{
		width: 100%; 
		height: auto;
	}
	
	.swiper-desc {
	  position: absolute;
	  bottom: 20px;
	  left: 0;
	  right: 0;
	  color: #fff;
	  background-color: rgba(0, 0, 0, 0.5);
	  padding: 10px;
	  text-align: center;
	}
	
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
