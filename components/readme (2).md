

欢迎使用 my-audio 在线音乐播放器 不支持倍速 使用uni.createInnerAudioContext()方法搭建
插件内有my-video支持倍速 使用uni.createVideoContext()方法搭建
https://iconoir.com/ ,svg图标库
因为uni-notice-bar 默认上下太宽了
我修改了此插件得默认样式
.uni-noticebar {
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		align-items: center;
		// padding: 10px 12px; //这里注释了
		// margin-bottom: 10px; //这里注释了
	}


## props (组件属性)

  属性  | 类型 | 默认值 | 备注
------------- | ------------- | ---------
autoplay  |Boolean| false | 是否自动播放(只支持微信内置浏览器,小程序，app)
src  |String| '' | 音频地址
title  |String| 默认文件名 | 标题
titleFontSize  |Number| 35rpx | 标题字体大小
titleColor  |String| #303030 | 标题文字颜色
titleBackgroundColor  |String| white | 标题背景色
titleScroll  |Boolean| false | 标题是否滚动
titleScrollSpeed  |Number| 100 | 标题是否滚动
subTitle  |String| 默认文件名 | 副标题
subTitleFontSize  |Number| 35rpx | 副标题字体大小
subTitleColor  |String| #6C7996 | 标题文字颜色
subTitleColor  |String| #6C7996 | 标题文字颜色
isCollectBtn  |Boolean| false | 显示收藏按钮
isShareBtn  |Boolean| false | 显示分享按钮
activeColor  |String| #bf41a2 | 滑块左侧已选择部分的线条颜色
backgroundColor  |String| #f1c38b | 滑块右侧背景条的颜色


## 组件事件

  事件  | 事件内容
------------- | -------------
@audioPlay | 音频播放事件
@audioPause | 音频暂停事件
@audioEnd | 音频自然播放结束事件
@change | 音频播放状态监听（返回true/false）
@audioCanplay | 音频进入可以播放状态，但不保证后面可以流畅播放
@audioError | 播放器错误
@audioCollec | 点击收藏按钮
@audioShare | 点击分享按钮

## ref 事件
  事件  | 事件内容
------------- | -------------
audioPlay() | 播放
audioPause() | 暂停
changePlayProgress() | 跳转到指定位置
handleFastRewind() | 退回15秒
handleFastForward() | 快进15秒
handleLoopPlay() | 开启/关闭循环播放
handleChageSpeed() | 切换倍速播放  按照0.5/0.8/1.0/1.25/1.5/2.0 顺序取值 只有 my-video 支持
audioDestroy() | 销毁innerAudioContext()实例

```html
<my-audio isCountDown ref="audio" src="音频路径" title="标题名称" subTitle="副标题名称" ></my-audio>
<my-video isCountDown ref="audio" src="音频路径" title="标题名称" subTitle="副标题名称" ></my-audio>

//项目为vue2时 调用跳转到音乐15s位置方法，如下:
this.$refs.audio.changePlayProgress(15)

//项目为vue3时 请通过value形式调用子组件方法
```

#### View代码
```html
<my-audio ref="audio" src="音频路径"  title="标题名称" subTitle="副标题名称"></sy-audio>
<my-video ref="audio" src="音频路径"  title="标题名称" subTitle="副标题名称"></my-video>

//项目为vue2时 src为本地路径时，使用require方法，如下:
<my-audio :src="require('@/static/audio.mp3')"></sy-audio>
<my-video :src="require('@/static/audio.mp3')"></my-video>

//项目为vue3时 src为本地路径时，使用自定义方法，如下:
<my-audio :src="toUrl('../../static/audio.mp3')"></sy-audio>
<my-video :src="toUrl('../../static/audio.mp3')"></my-video>
methods: {
	toUrl(src){
		return new URL(src, import.meta.url).href
	}
}
```

> my-audio my-video 将会持续更新，欢迎大家踊跃提出宝贵建议；
