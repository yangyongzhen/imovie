<template>
	<view v-if="isLoaded">
			
		<view class="banner">
			<image class="banner-img" :src="mv.images"  mode="heightFix"></image>
			<view class="banner-title">
				{{mv.title}}({{mv.year}})
				<view  class="banner-title-small">
					{{mv.genre}} / {{mv.countries}}
				</view>
				<view class="banner-fav">
					<view class="uni-fav">
						<uni-icons size="18" type="plus" />
						<uni-badge class="uni-badge-left-margin" :text="mv.wish_count" :offset="[-5, -5]" type="info" :maxNum="100000" absolute="rightTop" size="small">
							<view class="box"><text class="uni-fav-text">想看</text></view>
						</uni-badge>
						<!-- <text class="uni-fav-text">想看</text> -->
					</view>
					<view class="uni-fav">
						<uni-icons size="18" type="star" />
						<uni-badge class="uni-badge-left-margin" :text="mv.collect_count" :offset="[-5, -5]" type="info" :maxNum="100000" absolute="rightTop" size="small">
							<view class="box"><text class="uni-fav-text">看过</text></view>
						</uni-badge>
						<!-- <text class="uni-fav-text">看过</text> -->
					</view>
				</view>
			</view>
		</view>
		<uni-card :is-shadow="false"   extra="豆瓣评分 >" margin="20rpx">
			<view class="movie-rate">
				<uni-rate :readonly="true" :value="mv.rate/2" size=20 active-color="#ffaa00" color="#DADADA">
				</uni-rate>
				<text class="movie-rate-t">{{mv.rate}}</text>
			</view>
		</uni-card>
		<view class="sub-title" >
			简介
		</view>
		<view class="description">
		    <view :class="{'folded': isFolded}" v-html="mv.summary">
				
		    </view>
		    <view @click="toggleDescription" class="toggle-button">
		        {{ isFolded ? '展开' : '收起' }}
		    </view>
		</view>
		<view class="sub-title" >
			影人
		</view>
		<scroll-view
		   :scroll-x="true"
		   :show-scrollbar="false"
		   class="scroll"
		 >
			<view class="cast-box">
				  <view  v-for="(item, index) in mv.cast"
				  :key="index"
				  @click="goToDetail(item.id)" class="cast-item">
					<image class="cast-item-img" :src="item.cover" mode="heightFix" />
					<view class="cast-item-name">{{ ellipsis(item.name) }}</view>
					<view class="cast-item-role">演员</view>
				  </view>
			</view>
		 </scroll-view>
		 
		 <view class="comment-list">
		     <view class="comment-item" v-for="(item, index) in cmt.data" :key="index">
		         <image class="avatar" :src="item.author.avatar" mode="aspectFill"></image>
		         <view class="comment-content">
		             <view class="username">{{ item.author.name }}</view>
		             <view class="rating">
		                 <uni-rate :readonly="true" :value="item.rate/2" size=14 active-color="#ffaa00" color="#DADADA">
		                 </uni-rate>
		             </view>
		             <view class="comment-text">{{ item.content }}</view>
		             <view class="like-count">赞 {{ item.useful_count }}</view>
		         </view>
		     </view>
		     <view class="load-more" @click="loadMoreComments">加载更多</view>
		 </view>
	</view>

</template>

<script>
	import { getMovieDetail,getMovieComment } from '@/api/detail.js';
	export default {
		data() {
			return {
				id:"",
				mv:{},
				cmt:{},
				isLoaded:false,
				isFolded: true // 初始状态为折叠
			}
		},
		onLoad(params) {
			console.log('detail onload');
			console.log(params);
			this.id = params.id;
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
			},
			toggleDescription() {
				this.isFolded = !this.isFolded;
			},
			loadMoreComments(){
				console.log("loadMoreComments:")
			}
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
			
			getMovieComment(this.id,0,2).then(result => {
				console.log("getMovieComment,result:");
				console.log(result);
				this.cmt = result;
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
		width: 200rpx;
		height: 250rpx;
	}

	.banner-title {
		display: flex;
		flex-direction: column;
		align-items: left;

		padding: 0 15px;
		width: 80%;
		bottom: 0;
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
	
	.banner-fav {
		display: flex;
		flex-direction: row;
	}
	.uni-fav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 90px;
		height: $fav-height;
		line-height: $fav-height;
		text-align: center;
		border-radius: 3px;
		background-color: white;
		padding: 10rpx;
		margin-top: 30rpx;
		margin-right: 30rpx;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}
	
	.uni-fav-text {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		height: $fav-height;
		line-height: $fav-height;
		align-items: center;
		justify-content: center;
		font-size: 16px;
	}

	.uni-ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.movie-rate {
		display: flex;
		align-items: center;
		padding: 10rpx;
		margin-bottom: 15rpx;
	}
	
	.movie-rate-t {
		margin-left: 14rpx;
		font-size: 58rpx;
		font-weight: bold;
	}
	.sub-title {
		padding-left: 20rpx;
		font-size: 42rpx;
		font-weight: bold;
	}

	.description {
		display: flex; /* 添加flex布局 */
		flex-direction: column; /* 设置为列方向 */
	    line-height: 1.5;
		padding: 20rpx;
		font-size: 28rpx;
	}
	
	.folded {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 3; /* 控制显示行数 */
	    -webkit-box-orient: vertical;
	}
	.toggle-button {
	    cursor: pointer;
	    margin-top: 20rpx;
		align-self: flex-end; /* 使按钮靠右对齐 */
	}
	
	.scroll{
		height:320rpx;
		width: 100%;
		white-space: nowrap;
		margin-top:15rpx;
	}
	.cast-box{
		display: flex;
		flex-direction: row;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	.cast-item {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  width: 200rpx;
	  height: 300rpx;
	  margin-right: 22rpx;
	}
	.cast-item-img {
		border-radius: 10rpx;
	}
	.cast-item-name {
	  color: #000000;
	  font-size: 18rpx;
	  font-weight: bold;
	  margin-top: 10rpx;
	}
	.cast-item-role {
	  color: #606266;
	  font-size: 18rpx;
	  font-weight: bold;
	  margin-top: 5rpx;
	}
	
	.comment-list {
	    display: flex;
	    flex-direction: column;
	    padding: 20rpx;
	}
	
	.comment-item {
	    display: flex;
	    margin-bottom: 20rpx;
	}
	
	.avatar {
	    width: 50rpx;
	    height: 50rpx;
	    border-radius: 50%;
	    margin-right: 20rpx;
	}
	
	.comment-content {
	    flex: 1;
	    display: flex;
	    flex-direction: column;
	    justify-content: space-between;
	}
	
	.username {
	    font-size: 32rpx;
	    color: #333;
	}
	
	.rating {
	    margin-top: 10rpx;
	}
	
	.comment-text {
	    font-size: 28rpx;
	    color: #666;
	    margin-top: 10rpx;
	}
	
	.like-count {
	    font-size: 24rpx;
	    color: #999;
	    margin-top: 10rpx;
	}
	
	.load-more {
	    text-align: center;
	    margin-top: 20rpx;
	    color: #007AFF;
	    cursor: pointer;
	}
</style>
