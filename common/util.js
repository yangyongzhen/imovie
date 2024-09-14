function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

function ellipsis(value){
	if (!value) return '';
	if (value.length > 7) {
		return value.slice(0, 6) + '...'
	}
	return value
}

// 图片防盗链问题解决
function attachImageUrl(srcUrl) {
	if (srcUrl !== undefined) {
	  return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
	}
}

/**
 * 格式化日期时间
 * @param {Date} date - 要格式化的日期对象，默认为当前日期时间
 * @param {string} format - 格式化字符串，支持的占位符有：
 *   - YYYY: 年份（4位）
 *   - MM: 月份（2位，补0）
 *   - DD: 日期（2位，补0）
 *   - HH: 小时（2位，补0）
 *   - mm: 分钟（2位，补0）
 *   - ss: 秒数（2位，补0）
 * @returns {string} 格式化后的日期时间字符串
 */
function formatDate(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return format
        .replace('YYYY', year)
        .replace('MM', String(month).padStart(2, '0'))
        .replace('DD', String(day).padStart(2, '0'))
        .replace('HH', String(hours).padStart(2, '0'))
        .replace('mm', String(minutes).padStart(2, '0'))
        .replace('ss', String(seconds).padStart(2, '0'));
}
/**
 * 歌词解析
 * @param {lrcContent} string - 歌词内容
 * @returns {lyrics} 对象数组
 */
function parseLyric(lrcContent) {
    const lines = lrcContent.split('\n');
    const lyrics = [];

    lines.forEach(line => {
        const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/);
        if (match) {
            const minutes = parseInt(match[1]);
            const seconds = parseInt(match[2]);
            const milliseconds = parseInt(match[3]);

            const time = minutes * 60 * 1000 + seconds * 1000 + milliseconds;

            // 提取歌词文本
            const text = line.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '').trim();
            lyrics.push({ time, text });
        }
    });

    return lyrics;
}

export {
	formatTime,
	formatDate,
	formatLocation,
	dateUtils,
	attachImageUrl,
	ellipsis,
	parseLyric
}
