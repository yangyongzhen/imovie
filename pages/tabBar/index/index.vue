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
			
			<view class="title">
				<view class="title-item">
					影院热映
				</view>
				<view class="title-more">
					查看更多 >
				</view>
			</view>
			 <scroll-view
			    :scroll-x="true"
			    :show-scrollbar="false"
			    class="scroll"
			  >
			  <view class="moive-box">
			        <view  v-for="(item, index) in hotList"
			        :key="index"
			        @click="goToDetail(item.id)" class="moive-item">
			          <image :src="item.imageUrl" mode="heightFix" />
			          <view class="moive-item-title">{{ item.title }}</view>
					  <view class="moive-rate">
					  	<uni-rate disabled="true" :value="item.rate/2" size=14 active-color="#D81E06" color="#DADADA">
					  	</uni-rate>
					  	<text class="moive-rate-t">{{item.rate}}</text>
					  </view>
			        </view>
			  </view>  
			  </scroll-view>
		</view>
	</view>
</template>

<script>
	import { getSwiperList, getTop250,getNowHot } from '@/api/home.js';
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				// 轮播图的数据列表，默认为空数组
				swiperList:[],
			    hotList: [
			            {
			              id: 1,
			              imageUrl: '/static/grid/1.jpg',
			              title: '标题1',
			              description: '描述1',
			            },
			            {
			              id: 2,
			              imageUrl: '/static/grid/2.jpg',
			              title: '标题2',
			              description: '描述2',
			            },
			            {
			              id: 3,
			              imageUrl: '/static/grid/3.jpg',
			              title: '标题3',
			              description: '描述3',
			            },
						{
						  id: 4,
						  imageUrl: '/static/grid/4.jpg',
						  title: '标题4',
						  description: '描述4',
						},
						,
						{
						  id: 5,
						  imageUrl: '/static/grid/5.jpg',
						  title: '标题5',
						  description: '描述5',
						}
						]
			}
		},
		async onLoad() {
			console.log("onLoad")
			//console.log(this.swiperList)
		},
		methods: {
			goToDetail(id){
				
			}
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

	.title{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	.title-item{
		font-weight: bold;
	}
	.title-more{
		 color: #00aaff;
	}
	
	.scroll{
		height:320rpx;
		width: 100%;
		white-space: nowrap;
		margin-top:15rpx;
	}
	
	.moive-box{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	
	.moive-item {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  width: 200rpx;
	  height: 320rpx;
	  margin-right: 22rpx;
	}
	.moive-item-title {
	  color: #606266;
	  font-size: 10rpx;
	  margin-top: 10rpx;
	}
	.moive-rate {
		height: 40rpx;
		line-height: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15rpx;
	}
	
	.moive-rate-t {
		margin-right: 4rpx;
	}
</style>
