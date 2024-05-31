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
				<view>
					查看更多 >
				</view>
			</view>
			 <scroll-view
			     scroll-x
			    :scroll-y="false"
			    :show-scrollbar="false"
			    class="scroll"
			  >
			    <uni-grid :column="4" :show-border="false">
			      <uni-grid-item
			        v-for="(item, index) in hotList"
			        :key="index"
			        @click="goToDetail(item.id)"
			      >
			        <view class="grid-item">
			          <image :src="item.imageUrl" mode="aspectFill" />
			          <view class="grid-item-title">{{ item.title }}</view>
			        </view>
			      </uni-grid-item>
			    </uni-grid>
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
		
	}
	
	.scroll{
		height:300rpx;
		width: 100%;
	}
	
	.grid-item {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  width: 150rpx;
	  height: 280rpx;
	}
	
	.grid-item-title {
	  color: #606266;
	  font-size: 12rpx;
	  margin-top: 10rpx;
	}
</style>
