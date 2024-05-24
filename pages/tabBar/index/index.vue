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
		</view>
		<uni-card>
			这是一个uni-card.
		</uni-card>
		<uni-badge text="1"></uni-badge>
		<uni-badge text="3" type="primary" :inverted="true"></uni-badge>
		
		<view class="uni-flex uni-row">
		                <view class="flex-item uni-bg-red">A</view>
		                <view class="flex-item uni-bg-green">B</view>
		                <view class="flex-item uni-bg-blue">C</view>
		            </view>
		</view>
</template>

<script>
	import { getSwiperList } from '@/api/home.js';
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
			console.log(this.swiperList)
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
