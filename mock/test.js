// 界面A的Mock Data
import './better-mock/mock.mp.js'

export function mockTest(){
	console.log('mockTest')
    const data = Mock.mock('https://yyz.cn/api/v1/test',{
            // 属性 list 的值是一个数组，其中含有3个元素
            'list|3': [{
                'name|3': '钱学森',
                'age|1-100': 1,
                'isGay|4-6': true,
                'people|+1': ['黄种人', '黑种人', '白种人'],
                'sayHi': /[a-z][A-Z][0-9]/
            }]
        });
    // 输出结果
    console.log(JSON.stringify(data, null, 4));//使用四个空格缩进
	
	const data1 = Mock.mock('https://yyz.cn/api/v1/home/swiperdata',{
	        // 属性 list 的值是一个数组，其中含有3个元素
	        'list|3': [{
	            'id|+1': 1,
	            'imageUrl|+1': ['/static/swiper/1.jpg',
				 '/static/swiper/2.jpg', 
				 '/static/swiper/3.jpg'],
	            'title|4-6': '标题',
	            'description|2-3':'这是描述'
	        }]
	    });
	// 输出结果
	console.log(JSON.stringify(data1, null, 4));//使用四个空格缩进
}
