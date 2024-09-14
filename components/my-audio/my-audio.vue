<template>
	<view class="audio_container">
		<view class="audio-title"
			style="width: 100%; text-align: left; font-size: 36rpx;font-weight: bold;padding: 0rpx 0rpx; position: relative;">
			<uni-notice-bar single :scrollable="titleScroll" :size="titleFontSize"
				:background-color="titleBackgroundColor" :color="titleColor" :speed="titleScrollSpeed" :text="title"
				class="uni-noticebar" style="padding: 0px; margin-bottom: 0px;">
			</uni-notice-bar>
			<uni-fav v-show="isCollectBtn" :checked="isFavorited" class="favBtn"  bgColor="#dddddd" bgColorChecked="#ffaa00" @click="handleCollec"
				style="color:#848484; position: absolute;top: 0rpx;right: 0px;"></uni-fav>
		</view>
		<view class="audio-subTitle"
			:style="'font-size: '+subTitleFontSize+';font-weight: bold;padding: 0rpx 0rpx 4rpx 0rpx;position: relative;'">
			<uni-notice-bar single :scrollable="titleScroll" :size="titleFontSize"
				:background-color="titleBackgroundColor" :color="subTitleColor" :speed="titleScrollSpeed"
				:text="localSubTitle" class="uni-noticebar">
			</uni-notice-bar>
			<uni-icons v-show="isShareBtn" @click="handleShare" type="redo" size="20"
				style="color:#848484;position: absolute;top: 0rpx;right: 0px;"></uni-icons>
		</view>
		<view>
			<slider :backgroundColor='backgroundColor' :activeColor='activeColor' @change="handleSliderChange"
				:value="sliderIndex" :max="maxSliderIndex" block-color="#343434" block-size="16" />
		</view>
		<view style="padding: 0rpx 15rpx 0rpx 15rpx ; display: block; ">
			<view style="float: left; font-size: 20rpx;color:#848484;">
				{{currentTimeText}}
			</view>
			<view style="float: right;font-size: 20rpx;color:#848484;">
				{{totalTimeText}}
			</view>
		</view>
		<view style="margin-top: 70rpx;">
			<uni-grid :column="5" :showBorder="false" :square="false">
				<uni-grid-item>
					<view class="uni-grid-icon">
						<image @tap="handleFastRewind" src="../../static/images/playlist.svg"
							style="width: 48rpx;height: 48rpx;top:6rpx;">
						</image>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="uni-grid-icon">
						<image @tap="handleFastRewind" src="../../static/images/get-back.svg"
							style="width: 48rpx;height: 48rpx;top:6rpx;">
						</image>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="uni-grid-icon">
						<image @tap="handleChangeAudioState" v-show="!isPlaying" src="../../static/images/play.svg"
							style="width: 48rpx;height: 48rpx;top:6rpx;">
						</image>
						<image @tap="handleChangeAudioState" v-show="isPlaying" src="../../static/images/pause.svg"
							style="width: 48rpx;height: 48rpx;top:6rpx;">
						</image>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="uni-grid-icon">
						<image @tap="handleFastForward" src="../../static/images/fast-forward.svg"
							style="width: 48rpx;height: 48rpx;top:6rpx;">
						</image>
					</view>
				</uni-grid-item>
				<uni-grid-item>
					<view class="uni-grid-icon">
						<image @tap="handleLoopPlay" src="../../static/images/Loop.svg"
							style="width: 48rpx;height: 48rpx; top:6rpx; ">
						</image>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view v-show="isShowLrc">
		   <scroll-view class="lyrics" scroll-y :scroll-top="scrollTop" :current="currentLineIndex" ref="lyricsContainer" >
				<block v-for="(line, index) in lyrics" :key="index">
				  <view :class="{ 'active': currentLineIndex === index }">{{ line.text }}</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'my-audio',
		//audioPlay开始播放
		//audioPause停止播放
		//audioEnd音频自然播放结束事件
		//audioCanplay音频进入可以播放状态，但不保证后面可以流畅播放
		//change播放状态改变 返回值false停止播放 true开始播放
		//audioError 播放器错误
		//audioCollec 音频收藏
		emits: ['audioPlay', 'audioPause', 'audioEnd', 'audioCanplay', 'change', 'audioError','audioCollec'],
		props: {
			//标题文字
			title: {
				type: String,
				default: '空'
			},
			//标题默认字体大小
			titleFontSize: {
				type: Number,
				default: 35
			},
			//标题文字颜色
			titleColor: {
				type: String,
				default: '#303030'
			},
			//标题背景色
			titleBackgroundColor: {
				type: String,
				default: 'white'
			},
			//标题是否滚动
			titleScroll: {
				type: Boolean,
				default: false
			},
			//标题滚动速度
			titleScrollSpeed: {
				type: Number,
				default: 100
			},

			subTitle: {
				type: String,
				default: '空'
			},
			subTitleColor: {
				type: String,
				default: '#6C7996'
			},
			subTitleFontSize: {
				type: String,
				default: "30rpx"
			},
			//是否自动播放
			autoplay: {
				type: Boolean,
				default: false
			},
			//滑块左侧已选择部分的线条颜色
			activeColor: {
				type: String,
				default: '#7C7C7C'
			},
			//滑块右侧背景条的颜色
			backgroundColor: {
				type: String,
				default: '#E5E5E5'
			},

			//音频地址
			src: {
				type: [String, Array],
				default: ''
			},

			//是否倒计时
			isCountDown: {
				type: Boolean,
				default: false
			},

			//音乐封面
			audioCover: {
				type: String,
				default: ''
			},
			//是否显示收藏按钮
			isCollectBtn: {
				type: Boolean,
				default: false
			},
			//状态是否是已收藏
			isFavorited: {
				type: Boolean,
				default: false
			},
			//是否显示分享按钮
			isShareBtn: {
				type: Boolean,
				default: false
			},
			
			//是否显示歌词
			isShowLrc: {
				type: Boolean,
				default: false
			},
			
			//歌词信息
			lyrics: {
				type: [Array],
				default: []
			},
		},
		data() {
			return {
				totalTimeText: '00:00', //视频总长度文字
				currentTimeText: '00:00:00', //视频已播放长度文字

				isPlaying: false, //播放状态

				sliderIndex: 0, //滑块当前值
				maxSliderIndex: 100, //滑块最大值

				IsReadyPlay: false, //是否已经准备好可以播放了

				isLoop: false, //是否循环播放

				speedValue: [0.5, 0.8, 1.0, 1.25, 1.5, 2.0],
				speedValueIndex: 2,
				playSpeed: '1.0', //播放倍速 可取值：0.5/0.8/1.0/1.25/1.5/2.0

				currentLineIndex: 0,
				localSubTitle:this.subTitle,
				shortLrc:'',
				scrollTop: 0, // 初始滚动位置
				stringObject: (data) => {
					return typeof(data)
				},
				innerAudioContext: uni.createInnerAudioContext()
			}
		},
		watch: {
		    subTitle(newVal) {
		      this.localSubTitle = newVal;
			  }
		},
		async mounted() {
			this.innerAudioContext.src = typeof(this.src) == 'string' ? this.src : this.src[0];
			if (this.autoplay) {
				if (!this.src) return console.error('src cannot be empty，The target value is string or array')

				// #ifdef H5
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					const jweixin = require('../../utils/jweixin');

					jweixin.config({});
					jweixin.ready(() => {
						WeixinJSBridge.invoke('getNetworkType', {}, (e) => {
							this.innerAudioContext.play();

						})
					})
				}
				// #endif

				// #ifndef H5
				this.innerAudioContext.autoplay = true;
				// #endif
			}

			//音频播放事件
			this.innerAudioContext.onPlay(() => {
				this.isPlaying = true;
				this.$emit('audioPlay')

				this.$emit('change', {
					state: true
				});

				setTimeout(() => {
					this.maxSliderIndex = parseFloat(this.innerAudioContext.duration).toFixed(2);

				}, 100)
			});

			//音频暂停事件
			this.innerAudioContext.onPause(() => {
				this.$emit('audioPause');
				this.$emit('change', {
					state: false
				});
			});

			//音频自然播放结束事件
			this.innerAudioContext.onEnded(() => {
				this.isPlaying = !this.isPlaying;
				this.$emit('audioEnd');

				if (this.isLoop) {
					this.changePlayProgress(0);
					this.innerAudioContext.play();
				}
			});

			//音频进入可以播放状态，但不保证后面可以流畅播放
			this.innerAudioContext.onCanplay((event) => {

				this.IsReadyPlay = true;

				this.$emit('audioCanplay');
				
				let duration = this.innerAudioContext.duration;

				//console.log('总时长', duration)

				//将当前音频长度秒转换为00：00：00格式
				this.totalTimeText = this.getFormateTime(duration);
				this.maxSliderIndex = parseFloat(duration).toFixed(2);

				//console.log(this.getFormateTime(duration))
				
				//console.log('总时长1', this.totalTimeText)

				//防止视频无法正确获取时长
				setTimeout(() => {
					duration = this.innerAudioContext.duration;

					//将当前音频长度秒转换为00：00：00格式
					this.totalTimeText = this.getFormateTime(duration);
					this.maxSliderIndex = parseFloat(duration).toFixed(2);
					
					//console.log('总时长2', this.totalTimeText)
				}, 300)
				
			});

			//音频播放错误事件
			this.innerAudioContext.onTimeUpdate((res) => {
				this.sliderIndex = parseFloat(this.innerAudioContext.currentTime).toFixed(2);
				this.currentTimeText = this.getFormateTime(this.innerAudioContext.currentTime);
				//更新歌词
				const currentTime = this.innerAudioContext.currentTime * 1000; // 转换为毫秒
				this.updateLyrics(currentTime);
			});

			//音频播放错误事件
			this.innerAudioContext.onError((res) => {
				console.log(res.errMsg);
				console.log(res.errCode);
				this.$emit('change', {
					state: false
				});
				this.audioPause();

				this.$emit('audioError', res);
			});

		},
		methods: {
			//销毁innerAudioContext()实例
			audioDestroy() {
				console.log("audioDestroy")
				if (this.innerAudioContext) {
					if (this.isPlaying && !this.innerAudioContext.paused) {
						this.audioPause();
					}
					this.innerAudioContext.destroy();
					this.isPlaying = false;
				}
			},
			//点击变更播放状态
			handleChangeAudioState() {
				if(this.src ===''){
					uni.showToast({
									title: '无播放资源',
									icon: 'none',
									duration: 1000
								});
					return;
				}
				if (this.isPlaying && !this.innerAudioContext.paused) {
					this.audioPause();
				} else {
					this.audioPlay();
				}
			},
			//开始播放
			audioPlay() {
				this.$nextTick(() => {
					this.innerAudioContext.src = this.src;
					setTimeout(() => {
						this.innerAudioContext.play();
						this.isPlaying = true;
					}, 100); // 100毫秒
				});
				
			},
			//暂停播放
			audioPause() {
				this.innerAudioContext.pause();
				this.isPlaying = false;
			},
			//变更滑块位置
			handleSliderChange(e) {
				this.changePlayProgress(e.detail ? e.detail.value : e)
			},
			//更改播放倍速
			handleChageSpeed() {
				//获取播放倍速列表长度
				let speedCount = this.speedValue.length;
				//如果当前是最大倍速，从-1开始
				if (this.speedValueIndex == (speedCount - 1)) {
					this.speedValueIndex = -1;
				}
				//最新倍速序号
				this.speedValueIndex += 1;
				//获取最新倍速文字
				this.playSpeed = this.speedValue[this.speedValueIndex].toFixed(1);
				//暂停播放
				this.audioPause();
				//变更播放倍速
				this.innerAudioContext.playbackRate(this.speedValue[this.speedValueIndex]);
				//开始播放
				this.audioPlay();
			},
			//快退15秒
			handleFastRewind() {
				if (this.IsReadyPlay) {
					let value = parseInt(this.sliderIndex) - 15;
					this.changePlayProgress(value >= 0 ? value : 0);
				}
			},
			//快进15秒
			handleFastForward() {
				if (this.IsReadyPlay) {
					let value = parseInt(this.sliderIndex) + 15;
					this.changePlayProgress(value <= this.innerAudioContext.duration ? value : this.innerAudioContext
						.duration);
				}
			},
			//开启循环播放
			handleLoopPlay() {
				this.isLoop = !this.isLoop;
				if (this.isLoop) {
					uni.showToast({
						title: '已开启循环播放',
						duration: 1000
					});
				} else {
					uni.showToast({
						title: '取消循环播放',
						duration: 1000
					});
				}
			},
			//更改播放进度
			changePlayProgress(value) {
				this.innerAudioContext.seek(value);
				this.sliderIndex = value;
				this.currentTimeText = this.getFormateTime(value);
			},
			//秒转换为00:00:00
			getFormateTime(time) {
				let ms = time * 1000; // 1485000毫秒
				let date = new Date(ms);

				// 注意这里是使用的getUTCHours()方法，转换成UTC(协调世界时)时间的小时
				let hour = date.getUTCHours();
				// let hour = date.getHours(); 如果直接使用getHours()方法，则得到的时分秒格式会多出来8个小时（在国内开发基本都是使用的是东八区时间），getHours()方法会把当前的时区给加上。
				let minute = date.getMinutes();
				let second = date.getSeconds();

				let formatTime =
					`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;

				return formatTime;
			},
			handleCollec() {
				this.$emit('audioCollec');
			},
			handleShare() {
				this.$emit('audioShare');
			},
			updateLyrics(currentTime) {
			    for (let i = 0; i < this.lyrics.length; i++) {
			        if (currentTime >= this.lyrics[i].time) {
			          this.currentLineIndex = i;
					  this.shortLrc = this.lyrics[i].text;
					  this.localSubTitle = this.subTitle + ' : '+this.shortLrc
			        } else {
			          break;
			        }
			    }
				this.scrollLyrics();
			},
			scrollLyrics() {
			    const lineHeight = 30; // 每行歌词的高度
			    this.scrollTop = this.currentLineIndex * lineHeight;
			},
		},
		onLoad() {
			console.log("onLoad")
		},
		onUnload() {
			console.log("onUnload")
			this.audioDestroy()
		},
		onHide() {
			console.log("onHide")
			this.audioDestroy()
		},
		beforeDestroy() {
			console.log("beforeDestroy")
			this.audioDestroy()
		}
	}
</script>

<style lang="scss" scoped>
	.audio_container {
		box-shadow: 0 0 10rpx #c3c3c3;
		padding: 30rpx 20rpx 30rpx 20rpx;

		.audio-title {
			font-size: 28rpx;
		}

		.uni-noticebar {
			padding: 0px;
			padding-right: 50rpx;
			margin-bottom: 0px;
			display: inline-block;
		}


		.audio-subTitle {
			width: 100%;
			text-align: left;
			font-size: 40rpx;
			color: blue;
		}

		.speed-text {
			position: absolute;
			top: 0rpx;
			left: 30rpx;
			right: 0;
			color: #475266;
			font-size: 16rpx;
			font-weight: 600;
		}

		.uni-grid-icon {
			text-align: center;
		}
		
		.lyrics {
		  margin-top: 20px;
		  height: 660rpx; /* 设置歌词容器的高度 */
		  // overflow: hidden; /* 隐藏溢出的歌词 */
		  overflow-y: auto; /* 允许垂直滚动 */
		  position: relative;
		  font-size: 32rpx;
		  line-height: 1.8;
		  text-align: center;
		}
		.lyrics view {
		  transition: color 1.2s ease; /* 添加平滑颜色变化效果 */
		}
		
		.lyrics .active {
		  color: #00aa00;
		  font-size: 45rpx;
		  font-weight: bold;
		}

	}
</style>