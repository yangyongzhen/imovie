<template>
	<view>
		<view class="content">
			<view>
				<image class="cover" :src="cover" mode="aspectFill"></image>
			</view>
			<view class="myaudio">
				<my-audio ref="audio" :src="vsrc" :isShowLrc="true" :lyrics="lyric" :title="song" :subTitle="sing" :isCollectBtn="true" :isFavorited="isfaved" :onAudioCollec="handleAudioFav" ></my-audio>
			</view>
		    
		</view>
	</view>
</template>

<script>
import favorites from '@/utils/audiofavorites.js';
import { parseLyric } from '@/common/util.js';
import { searchLyric } from '@/api/music.js';
	export default {
		data() {
			return {
				id:'',
				vsrc:'',
				song:'',
				sing:'',
				cover:'',
				music:{},
				lyric:[],
				isfaved:false, //是否已收藏
			}
		},
		onLoad(params) {
			console.log('playsong onLoad');
			console.log(params);
			this.music = params;
			this.id = params.id;
			this.vsrc = params.url;
			this.song = params.song;
			this.sing = params.sing;
			this.cover = params.cover;

			favorites.initAudioFavorites();
			this.checkFavorite();
			//根据id搜索歌词
			searchLyric(this.id,"wy").then(result => {
				console.log("searchLyric,result:");
				console.log(result);
				this.lyric = parseLyric(result.data.lyric);
				console.log(this.lyric[0].time);
			});
		},
		onUnload() {
		    console.log('playsong onUnload');
			this.$refs.audio.audioDestroy();
		},
		mounted() {
			console.log("mounted")
		},
		methods: {
			checkFavorite() {
			    this.isfaved = favorites.isAudioFavorite(this.id);
			},
			 handleAudioFav() {
			    // 处理收藏事件
				console.log('handleAudioFav')
				if (this.isfaved) {
				    // 取消收藏逻辑
					favorites.removeAudioFavorite(this.id);
					this.isfaved = false;
				} else {
					this.music.id = this.id;
					favorites.addAudioFavorite(this.music);
					this.isfaved = true;
				}
			 }
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
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
	}
	.cover{
		border-radius: 10rpx;
	}
	.myaudio{
		width: 100%;
	}
	
	
</style>
