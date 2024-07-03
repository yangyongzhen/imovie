<template>
	<view class="content">
		<view class="uni-margin-wrap">
			<!-- <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration"  lazy-render>
				
				<swiper-item v-for="item in swiperList" :key="item.id">
				    <image :src="item.imageUrl" :alt="item.title" mode="widthFix" class="swiper-image"></image>
					 <view class="swiper-desc" v-if="item.description">{{ item.description }}</view>
				</swiper-item>
				
			</swiper> -->
			<view class="search-bar-box">
			 <uni-search-bar 
			       @confirm="onSearch" 
			       placeholder="搜索" 
			       @input="onInput" 
			       :focus="focus" 
			       :maxlength="50" 
			       @blur="onBlur" 
			       :clearbutton="true"
			     />
			</view>
			
			<view class="title">
				<view class="title-item">
					即将上映
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
			        <view  v-for="(item, index) in soonList"
			        :key="index"
			        @click="goToDetail(item.id)" class="movie-item">
			          <image :src="item.cover" class="movie-item-img" mode="heightFix" />
			          <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
					  <view class="movie-rate">
					  	<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
					  	</uni-rate>
					  	<text class="movie-rate-t">{{item.rate}}</text>
					  </view>
			        </view>
			  </view>  
			  </scroll-view>
			  <!-- 最新上映====================== -->
			  <view class="title">
			  	<view class="title-item">
			  		最新上映
			  	</view>
			  	<view class="title-more" @click="goToMore(2)">
			  		查看更多 >
			  	</view>
			  </view>
			  <scroll-view
			     :scroll-x="true"
			     :show-scrollbar="false"
			     class="scroll"
			   >
			   <view class="movie-box">
			         <view  v-for="(item, index) in newsList"
			         :key="index"
			         @click="goToDetail(item.id)" class="movie-item">
			           <image class="movie-item-img" :src="item.cover" mode="heightFix" />
			           <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
			  					  <view class="movie-rate">
			  					  	<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
			  					  	</uni-rate>
			  					  	<text class="movie-rate-t">{{item.rate}}</text>
			  					  </view>
			         </view>
			   </view>  
			   </scroll-view>
			   <!-- 正在热映 -->
			  <view class="title">
			  	<view class="title-item">
			  		正在热映
			  	</view>
			  	<view class="title-more" @click="goToMore(3)">
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
			           <image class="movie-item-img" :src="item.cover" mode="heightFix" />
			           <view class="movie-item-title">{{ ellipsis(item.title) }}</view>
			  					  <view class="movie-rate">
			  					  	<uni-rate :readonly="true" :value="item.rate/2" size=12 active-color="#ffaa00" color="#DADADA">
			  					  	</uni-rate>
			  					  	<text class="movie-rate-t">{{item.rate}}</text>
			  					  </view>
			         </view>
			   </view>  
			   </scroll-view>
			   <!-- 一周热榜====================== -->
			   <view class="title">
			   	<view class="title-item">
			   		一周热榜
			   	</view>
			   	<view class="title-more" @click="goToMore(4)">
			   		查看更多 >
			   	</view>
			   </view>
			   <scroll-view
			      :scroll-x="true"
			      :show-scrollbar="false"
			      class="scroll"
			    >
			    <view class="movie-box">
			          <view  v-for="(item, index) in weekList"
			          :key="index"
			          @click="goToDetail(item.id)" class="movie-item">
			            <image class="movie-item-img" :src="item.cover" mode="heightFix" />
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
	import { getSwiperList, getTop250,getNowHot,getSoonMovie,getWeekMovie,getNewMovie } from '@/api/home.js';
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				// 轮播图的数据列表，默认为空数组
				swiperList:[],
				soonList:[], //即将上映
				weekList:[], //一周热榜
				newsList:[], //最新上映
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
				console.log("goToDetail:")
				console.log(id)
				uni.navigateTo({
					url: `../index/detail/detail?id=${id}`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			
			goToMore(item) {
				console.log(item)
				uni.navigateTo({
					url: `../index/moreMovie/moreMovie?item=${item}`,
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
			getNowHot(0,10,"郑州").then(result => {
				//this.swiperList = item;
				console.log("getNowHot,result:");
				console.log(result);
				this.hotList = result.data; 
			});
			getSoonMovie(0,10).then(result => {
				//this.swiperList = item;
				console.log("getSoonMovie,result:");
				console.log(result);
				this.soonList = result.data; 
			});
			getWeekMovie(0,10).then(result => {
				//this.swiperList = item;
				console.log("getWeekMovie,result:");
				console.log(result);
				this.weekList = result.data; 
			});
			
			getNewMovie(0,10).then(result => {
				//this.swiperList = item;
				console.log("getNewMovie,result:");
				console.log(result);
				this.newsList = result.data; 
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
			font-size: 30rpx;
		}
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
		margin-top: 15rpx;
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
	
	.movie-item-img {
		border-radius: 10rpx;
	}
	.movie-item-title {
	  color: #606266;
	  font-size: 18rpx;
	  font-weight: bold;
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
	
	.search-bar-box {
	  background-color: #55aaff; 
	  padding: 6rpx;
	  border-radius: 4rpx; 
	}
</style>
