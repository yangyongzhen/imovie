
// 获取音乐榜单
export const getTopWyMusic = async (start,count) => {
  try {
	console.log('getTopWyMusic request');
	const response = await uni.$http.post('/musicmenus',{
		kind:"topWyMusic",start:start,count:count});
	console.log(response);
    if (response.statusCode !== 200) {
      uni.showToast({
        title: '数据请求失败! ',
        duration: 1500,
        icon: 'none',
      });
      return [];
    }
    return response.data;
  } catch (error) {
    console.error('Network request failed:', error);
    uni.showToast({
      title: '网络请求失败! ',
      duration: 1500,
      icon: 'none',
    });
    return [];
  }
};

// 音乐搜索
export const searchMusic = async (q,start,count) => {
  try {
	console.log('searchMusic request');
	const response = await uni.$http.post('/musicsearch',{
		q:q,start:start,count:count});
	console.log(response);
    if (response.statusCode !== 200) {
      uni.showToast({
        title: '数据请求失败! ',
        duration: 1500,
        icon: 'none',
      });
      return [];
    }
    return response.data;
  } catch (error) {
    console.error('Network request failed:', error);
    uni.showToast({
      title: '网络请求失败! ',
      duration: 1500,
      icon: 'none',
    });
    return [];
  }
};

// 音乐歌词搜索
export const searchLyric = async (id,kind) => {
  try {
	console.log('searchLyric request');
	const response = await uni.$http.get('/musicsearchlrc',{
		id:id,kind:kind });
	console.log(response);
    if (response.statusCode !== 200) {
      uni.showToast({
        title: '数据请求失败! ',
        duration: 1500,
        icon: 'none',
      });
      return [];
    }
    return response.data;
  } catch (error) {
    console.error('Network request failed:', error);
    uni.showToast({
      title: '网络请求失败! ',
      duration: 1500,
      icon: 'none',
    });
    return [];
  }
};