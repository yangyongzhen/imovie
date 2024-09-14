# lime-choosefile 文件选择
- 文件选择UTS API系参考小程序chooseFile API实现的，用法保持一致，目前仅支持uniappX(web,安卓)

## 安装
在插件市场导入即可

## 使用
使用方法跟小程序的一样
```ts 
import { chooseFile, ChooseFileOption } from '@/uni_modules/lime-choose-file'

const images = ref<string[]>([])
const onClick = () => {
	chooseFile({
		type: 'image',
		success(res){
			images.value = res.tempFiles.map((item):string => item.path)
			console.log('res', res.tempFiles)
		},
		fail(err){
			console.log('err', err)
		}
	} as ChooseFileOption)
}
```


## API
因为直接参照小程序`chooseFile`API，所以可以直接按[chooseFile](https://uniapp.dcloud.net.cn/api/media/file.html#choosefile)文档来