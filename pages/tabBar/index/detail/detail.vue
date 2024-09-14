<template>
	<view>
		<view v-if="isLoaded">
			
		<view class="banner">
			<image class="banner-img" :src="mv.images"  mode="heightFix"></image>
			<view class="banner-title">
				{{mv.title}}({{mv.year}})
				<view  class="banner-title-small">
					{{mv.genre}} / {{mv.countries}}
				</view>
				
				<view class="banner-fav">
					<view class="my-fav">
						<uni-icons size="18" type="plus" color="#ffaa00"/>
						<uni-badge class="uni-badge-left-margin" :text="mv.wish_count" :offset="[-5, -5]" type="info" :maxNum="100000" absolute="rightTop" size="small">
							<view class="box"><text class="my-fav-text">想看</text></view>
						</uni-badge>
						<!-- <text class="uni-fav-text">想看</text> -->
					</view>
					<view class="my-fav">
						<uni-icons size="18" type="star" color="#ffaa00" />
						<uni-badge class="uni-badge-left-margin" :text="mv.collect_count" :offset="[-5, -5]" type="info" :maxNum="100000" absolute="rightTop" size="small">
							<view class="box"><text class="my-fav-text">看过</text></view>
						</uni-badge>
						<!-- <text class="uni-fav-text">看过</text> -->
					</view>
				</view>
				<view class="banner-fav">
					<view class="my-fav" @click="goToVideoPlay">
						<uni-icons size="18" type="videocam" color="#ff007f" />
						<view class="box"><text class="my-fav-text">播放</text></view>
						<!-- <text class="uni-fav-text">想看</text> -->
					</view>
					<view class="my-fav" @click="goToshareSource">
						<uni-icons size="18" type="link" color="#00aa00" />
					    <view class="box"><text class="my-fav-text" >贡献源</text></view>
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
		<view class="sub-title-box" >
			<view class="sub-title" >
				简介
			</view>
			<view class="my-uni-fav">
				<uni-fav :checked="isFavorited" class="favBtn"  bgColor="#dddddd" bgColorChecked="#ffaa00" @click="favClick"/>
			</view>
			<!-- <view class="my-fav-collect">
				<uni-icons size="18" type="star" />
				<view class="box"><text class="my-fav-text">收藏</text></view>
			</view> -->
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
		 
		 <view class="sub-title" >
		 	剧照
		 </view>
		 <scroll-view
		    :scroll-x="true"
		    :show-scrollbar="false"
		    class="scroll"
		  >
		 	<view class="cast-box">
		 		  <view  v-for="(item, index) in photo.data"
		 		  :key="index" class="cast-item">
		 			<image class="cast-item-img" :src="item.icon"  :data-src="item.image" mode="heightFix"  @click="previewImage" />
		 		  </view>
		 	</view>
		  </scroll-view>
		 
		 <view class="comment-list">
			 <view class="comment-title">
				 <text class="sub-title">短评</text>
				 <text style="font-size: 28rpx;">全部 {{cmt.total}} ></text>
			 </view>
		     <view class="comment-item" v-for="(item, index) in cmt.data" :key="cmt.data.id">
		          <view class="comment-user">
					  <image class="avatar" :src="item.author.avatar" mode="aspectFill"></image>
					  <view class="username">{{ item.author.name }}</view>
				  </view>
		         <view class="comment-content">
		             <view class="rating">
		                 <uni-rate :readonly="true" :value="item.rate/2" size=14 active-color="#ffaa00" color="#DADADA">
		                 </uni-rate>
		             </view>
		             <view :class="['comment-text', { 'folded-comment': item.isFolded }]"  @click="toggleComment(index)" >{{ item.content }}</view>
		             <view class="like-count">赞 {{ item.useful_count }}</view>
					  <view class="divider__line"></view>
		         </view>
				
		     </view>
			
		     <view class="load-more" @click="loadMoreComments">
				 <text style="font-size: 30rpx; font-weight: bold;">查看全部短评</text>
				 <text> > </text>
			 </view>
		 </view>
	</view>
	</view>

</template>

<script>
	import { getMovieDetail,getMovieComment,getMoviePhoto } from '@/api/detail.js';
	import favorites from '@/utils/favorites.js';
	export default {
		data() {
			return {
				id:"",
				mv:{},
				cmt:{},
				photo:{},
				isLoaded:false,
				isFolded: true ,// 初始状态为折叠
				pageNum: 0, // 评论列表初始页数
				count:0,
				total:0,
				isFavorited: false,
			}
		},
		onLoad(params) {
			console.log('detail onload');
			console.log(params);
			this.id = params.id;
			favorites.initFavorites();
			this.checkFavorite();
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
			goToshareSource(){
				console.log("goToshareSource:")
				uni.navigateTo({url: `./sharesource/sharesource?id=${this.id}&title=${this.mv.title}`});
			},
			goToVideoPlay(){
				console.log("goToVideoPlay:")
				const mvString = encodeURIComponent(JSON.stringify(this.mv));
				uni.navigateTo({
					url: `./videoplay/videoplay?id=${this.id}&mv=${mvString}`
				})
			},
			toggleDescription() {
				this.isFolded = !this.isFolded;
			},
			toggleComment(index) {
				this.cmt.data[index].isFolded = false;
			},
			previewImage(e) {
			    const current = e.target.dataset.src; // 获取当前点击的图片url
				console.log(current)
				// 这里填写所有图片的url数组
				//const images =[]
				
			    const images = this.photo.data.map(item => item.image); 
				console.log(images)
			    uni.previewImage({
			      urls: images, // 需要预览的图片链接列表
			      current: current, // 当前显示图片的链接
			    });
			},
			loadMoreComments(){
				console.log("loadMoreComments:")
				console.log('page:'+this.pageNum);
				if(this.pageNum == this.total){
					return;
				}
				getMovieComment(this.id,this.pageNum,4).then(result => {
					console.log("getMovieComment,result:");
					console.log(result);
					//this.cmt = result;
					this.cmt.data = this.cmt.data.concat(result.data.map(comment => ({
					        ...comment,
					        isFolded: true, 
					})));
					
					this.pageNum += result.data.length;
				});
			},
			checkFavorite() {
			      this.isFavorited = favorites.isFavorite(this.id);
			},
			favClick(){
				if (this.isFavorited) {
				    // 取消收藏逻辑
					favorites.removeFavorite(this.id);
					this.isFavorited = false;
				} else {
					this.mv.id = this.id;
					favorites.addFavorite(this.mv);
					this.isFavorited = true;
				}
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
			
			getMovieComment(this.id,0,4).then(result => {
				console.log("getMovieComment,result:");
				console.log(result);
				this.cmt = result;
				this.cmt.data = result.data.map(comment => ({
				        ...comment,
				        isFolded: true, // 添加默认折叠状态
				        // 可以在这里添加更多字段
				}));
				this.total = result.total;
				this.pageNum += result.data.length;
			});
			
			getMoviePhoto(this.id,0,15).then(result => {
				console.log("getMoviePhoto,result:");
				console.log(result);
				this.photo = result;
			});
		}
	}
</script>

<style lang="scss">
	page {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			background-color: #f8f4f5;
			min-height: 100%;
			width: 100%;
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
		width: 240rpx;
		height: 300rpx;
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
	.my-fav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 90px;
		height: 25px;
		line-height: 25px;
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
	
	.my-fav-text {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		height: 25px;
		line-height: 25px;
		align-items: center;
		justify-content: center;
		font-size: 16px;
	}
	.my-uni-fav {
		margin-right: 20rpx;
	}
	.favBtn {
		width: 80px;
		height: 25px;
		font-size: 28px;
		line-height: 25px;
		text-align: center;
		border-radius: 3px;
		padding: 10rpx;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
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
	
	.sub-title-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.sub-title {
		padding-left: 20rpx;
		font-size: 40rpx;
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
	    -webkit-line-clamp: 4; /* 控制显示行数 */
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
		margin: 20rpx;
		background-color: white;
	}
	
	.comment-title {
	    display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;

	}
	
	.comment-item {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		
	}
	.comment-user {
	    display: flex;
		flex-direction: row;
	}
	
	.avatar {
	    width: 50rpx;
	    height: 50rpx;
	    border-radius: 50%;
	    margin-right: 20rpx;
	}
	
	.comment-content {
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
		line-height: 1.2;
	}
	
	.folded-comment {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 6; /* 控制显示行数 */
	    -webkit-box-orient: vertical;
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
	    margin-top: 15rpx;
		padding-bottom: 30rpx;
	}
	
	.divider__line{
	    background-color: #CCCCCC;
		opacity: 0.3; /* 设置透明度为50% */
	    height: 0.2rpx;
	    width: 100%;
		margin-top: 20rpx;
		margin: auto;
	    z-index: 100;
	}
	
	.load-more {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	    padding: 0rpx 20rpx 0rpx 20rpx;
	    cursor: pointer;
		margin-bottom: 10rpx;
	}
</style>
