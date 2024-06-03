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
				<view class="title-more" @click="goToMore(1)">
					查看更多 >
				</view>
			</view>
			
			 <scroll-view
			    :scroll-x="true"
			    :show-scrollbar="false"
			    class="scroll"
			  >
			  <view class="movie-box">
			        <view  v-for="(item, index) in hotList"
			        :key="index"
			        @click="goToDetail(item.id)" class="movie-item">
			          <image :src="item.imageUrl" mode="heightFix" />
			          <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
					  <view class="movie-rate">
					  	<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
					  	</uni-rate>
					  	<text class="movie-rate-t">{{item.rate}}</text>
					  </view>
			        </view>
			  </view>  
			  </scroll-view>
			  <view class="title">
			  	<view class="title-item">
			  		豆瓣热门
			  	</view>
			  	<view class="title-more" @click="goToMore(1)">
			  		查看更多 >
			  	</view>
			  </view>
			  <scroll-view
			     :scroll-x="true"
			     :show-scrollbar="false"
			     class="scroll"
			   >
			   <view class="movie-box">
			         <view  v-for="(item, index) in hotList"
			         :key="index"
			         @click="goToDetail(item.id)" class="movie-item">
			           <image :src="item.imageUrl" mode="heightFix" />
			           <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
			  					  <view class="movie-rate">
			  					  	<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
			  					  	</uni-rate>
			  					  	<text class="movie-rate-t">{{item.rate}}</text>
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
			              imageUrl: '/static/hot/1.jpg',
			              title: '标题1',
			              description: '描述1',
						  rate:7
			            },
			            {
			              id: 2,
			              imageUrl: '/static/hot/2.jpg',
			              title: '标题2',
			              description: '描述2',
						  rate:9
			            },
			            {
			              id: 3,
			              imageUrl: '/static/hot/3.jpg',
			              title: '标题3',
			              description: '描述3',
						  rate:8
			            },
						{
						  id: 4,
						  imageUrl: '/static/hot/4.jpg',
						  title: '标题4',
						  description: '描述4',
						  rate:7
						},
						,
						{
						  id: 5,
						  imageUrl: '/static/hot/5.jpg',
						  title: '标题5',
						  description: '描述5',
						  rate:6
						}
						]
			}
		},
		async onLoad() {
			console.log("onLoad")
			//console.log(this.swiperList)
		},
		methods: {
			// 名称超出显示省略号
			ellipsis(value) {
				if (!value) return '';
				if (value.length > 7) {
					return value.slice(0, 6) + '...'
				}
				return value
			},
			goToDetail(id){
				
			},
			
			goToMore(item) {
				console.log(item)
				uni.navigateTo({
					url: '../index/hotMovie/hotMovie',
					animationType: 'pop-in',
					animationDuration: 200
				})
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
				this.hotList = result.list; 
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
	
	.movie-box{
		display: flex;
		flex-direction: row;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	
	.movie-item {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  width: 200rpx;
	  height: 330rpx;
	  margin-right: 22rpx;
	}
	.movie-item-title {
	  color: #606266;
	  font-size: 10rpx;
	  margin-top: 10rpx;
	}
	.movie-rate {
		height: 40rpx;
		line-height: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15rpx;
	}
	
	.movie-rate-t {
		margin-right: 4rpx;
		font-size: 8rpx;
	}
</style>
