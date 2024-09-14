<template>
	<view class="content">
		<view class="uni-margin-wrap">
			<view  v-for="(itm, index) in slicedList"  :key="index">
				<view class="title">
					<view class="title-item">
						{{itm.title}}
					</view>
				</view>
				<scroll-view
				   :scroll-x="true"
				   :show-scrollbar="false"
				   class="scroll"
				 >
				 <view class="movie-box">
				       <view  v-for="(item, index) in itm.movies"
				       :key="index"
				       @click="goToDetail(item.sid)" class="movie-item">
				         <trigger-lazyLoad :src="item.cover" width="165rpx" class="movie-item-img" mode="heightFix" />
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
	</view>
</template>

<script>
	import { getMovieMenus} from '@/api/collect.js';
	
	export default {
		data() {
			return {
				soonList:[], //即将上映
				mvList:[], //合集列表
			}
		},
		onLoad() {
			console.log("onLoad")
			//console.log(this.swiperList)
		},
		computed: {
			slicedList() {
			    return this.mvList.slice(1); // 从索引1开始截取数组
			}
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

		},
		mounted() {
			console.log("mounted")
			getMovieMenus("menu1").then(result => {
				console.log("getMovieMenus,result:");
				//console.log(result);
				this.mvList = result; 
				console.log(this.mvList[0].title);
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
	  font-size: 20rpx;
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
</style>
