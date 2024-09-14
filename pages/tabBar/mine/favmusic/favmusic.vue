<template>
	<view class="wrapper">
		<view class="myaudio">
				<my-audio ref="audio" :src="vsrc" :title="song" :subTitle="sing" @audioPlay="onAudioPlay" @audioEnd="onAudioEnd"></my-audio>
		</view>
		<view class="title-box">
			<view class="my-button">
				<button type="primary" size="mini" style="color:#ffffff;backgroundColor:#ffaa7f;borderColor:#1AAD19" @click="playAllClick">播放全部</button>
			</view>
			<view class="title">
				收藏 {{ myfavs.length }}&nbsp;&nbsp;&nbsp;播放列表 {{ playlist.length }} 
			</view>
		</view>
		<uni-list>
		  <template v-for="(item, index) in myfavs" :key="item.id" >
		    <!-- 正常的列表项 -->
		    <uni-list-item direction="row" :title="item.song" >
		      <template v-slot:body>
		        <view class="uni-list-box uni-content">
		          <view class="l-title uni-ellipsis-2" @tap="onSongClick(item)">{{item.song}}</view>
		          <view class="uni-note">
		            <text>{{item.sing}}</text>
					<view>
						<uni-icons type="heart"  :color="item.color || heartColor"  size="24" @tap="onFavClick(index)"></uni-icons>
						<uni-icons type="plus" :color="item.pcolor || plusColor" size="24" style="padding-left:30rpx;" @tap="onPlusClick(index)"></uni-icons>
						<image @tap="onPlayClick(index)" src="@/static/images/play.svg"
							style="padding-left:30rpx; width: 42rpx;height: 48rpx;top:8rpx;">
						</image>
					</view>
					
		          </view>
		        </view>
		      </template>
		      <template v-slot:footer>
		        <view class="uni-thumb" style="margin: 0;">
		          <image :src="item.cover" mode="aspectFill"></image>
		        </view>
		      </template>
		    </uni-list-item>
		  </template>
		</uni-list>
	
	</view>
</template>

<script>
	import favorites from '@/utils/audiofavorites';
	export default {
		data() {
			return {
				vsrc: '',
				song:'空',
				sing:'空',
				playlist: [],
				myfavs:[],
				currentIndex:0,
				heartColor: '#ffaa00', // 初始颜色
				plusColor: '#444444', // 初始颜色
			}
		},
		onLoad() {
			console.log('favmusic onload');
			favorites.initAudioFavorites();
			this.myfavs = favorites.getAllAudioFavorites();
			// 为每一项添加 color 字段
			this.myfavs.forEach(item => {
                item.color = this.heartColor;
				item.pcolor = this.plusColor;
            });
			if(this.myfavs.length > 0){
				
			}
		},
		onUnload() {
		    console.log('favmusic onUnload');
			this.$refs.audio.audioDestroy();
		},
		methods: {
			onAudioPlay(){
				console.log('onAudioPlay');
			},
			onAudioEnd(){
				console.log('onAudioEnd');
				if(this.playlist.length > 0){
					this.currentIndex++;
					if(this.currentIndex < this.playlist.length ){
						this.song = this.playlist[this.currentIndex].song;
						this.sing = this.playlist[this.currentIndex].sing;
						this.vsrc = this.playlist[this.currentIndex].url;
						this.$refs.audio.audioPause();
						this.$refs.audio.audioPlay();
					}
				}
			},
			onPlayClick(index){
				console.log('onPlayClick');
				this.song = this.myfavs[index].song;
				this.sing = this.myfavs[index].sing;
				this.vsrc = this.myfavs[index].url;
				this.$refs.audio.audioPause();
				this.$refs.audio.audioPlay();
			},
			playAllClick() {
				console.log('playAllClick');
				 // 将 myfavs 中的所有内容添加到 playlist 中，并去重
				this.myfavs.forEach(item => {
					item.pcolor = '#ffaa00'; // 改为选中色
					if (!this.playlist.includes(item)) {
						this.playlist.push(item);
					}
            	});
				if(this.playlist.length > 0){
					this.currentIndex = 0;
					this.song = this.playlist[this.currentIndex].song;
					this.sing = this.playlist[this.currentIndex].sing;
					this.vsrc = this.playlist[this.currentIndex].url;
					this.$refs.audio.audioPause();
					this.$refs.audio.audioPlay();
					uni.showToast({
									title: '添加至列表成功',
									icon: 'none',
									duration: 2000
								});
				}
				
			},
			onFavClick(idx){
				console.log('onFavClick');
				console.log(idx);
				const currentIcon = this.myfavs[idx];
				if (currentIcon.color === this.heartColor) {
					currentIcon.color = '#444444'; // 改为灰色
					favorites.removeAudioFavorite(this.myfavs[idx].id);
					uni.showToast({
									  title: '取消收藏成功',
									  icon: 'none',
									  duration: 2000
									});
				}else{
					currentIcon.color = this.heartColor;
					favorites.addAudioFavorite(this.myfavs[idx]);
					uni.showToast({
									  title: '加入收藏成功',
									  icon: 'none',
									  duration: 2000
									});
				}
				
				
			},
			onPlusClick(idx){
				console.log('onPlusClick');
				const item = this.myfavs[idx];
				if (item.pcolor === this.plusColor) {
					if(this.vsrc === ''){
						this.song = item.song;
						this.sing = item.sing;
						this.vsrc = item.url;
						this.currentIndex = 0;
					}
					item.pcolor = '#ffaa00'; // 改为选中色
					if (!this.playlist.includes(item)) {
						this.playlist.push(item);
					}
					uni.showToast({
									  title: '已添加至播放列表',
									  icon: 'none',
									  duration: 2000
									});
				}else{
					item.pcolor = this.plusColor;
					this.playlist = this.playlist.filter(itm => itm !== item);
					//console.log(this.playlist.length);
				}
			},
		    onSongClick(item){
				console.log("onSongClick");
				uni.navigateTo({ url: '/pages/tabBar/mine/playsong/playsong?url='+item.url+
			                   '&song='+item.song +'&sing='+item.sing+'&cover='+item.cover+'&id='+item.id });
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/uni-ui.scss';
	.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #F4F4F4;
	}
	.title-box{
		display: flex;
		flex-direction: row;
		padding-left: 10rpx;
		padding-right: 10rpx;
		margin-top: 15rpx;
	}

	.title{
		flex: 1.2;
		padding: 10rpx;
		font-size: 28rpx;
		color: #000000;
	}

	.my-button{
		flex: 0.5;
	}
	
	.uni-list-box {
		margin-top: 0;
	}
	
	.l-title {
		font-weight: bold;
		font-size: 30rpx;
		color: #3b4144;
	}
	
	.uni-content {
		padding-right: 10rpx;
	}
	
	.uni-note {
		display: flex;
		margin: 0;
		justify-content: space-between;
	}
	
	.thumb-image {
		width: 100%;
		height: 100%;
	}
	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;  /*nowrap;：强制文本在一行内显示，不允许换行*/
		text-overflow: ellipsis;
	}
	
	/*多行文本的省略效果*/
	.uni-ellipsis-2 {
		overflow: hidden;
		/*表示当文本内容超出所在容器的宽度时，用省略号来代替超出的部分*/
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
