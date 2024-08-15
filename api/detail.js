// 获取电影详情
export const getMovieDetail = async (id) => {
  try {
	console.log('getMovieDetail request');
    const response = await uni.$http.post('/detailmovie',{
		id:id});
	
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

// 获取电影短评
export const getMovieComment = async (id,start,count) => {
  try {
	console.log('getMovieComment request');
    const response = await uni.$http.post('/commentmovie',{
		id:id,start:start,count:count});
	
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

// 获取电影短评
export const getMoviePhoto = async (id,start,count) => {
  try {
	console.log('getMoviePhoto request');
    const response = await uni.$http.post('/photomovie',{
		id:id,start:start,count:count});
	
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

// 提交影视片段资源
export const postMovieSource = async (sid,source,uname,email,note,title) => {
  try {
	console.log('postMovieSource request');
    const response = await uni.$http.post('/sourcemovie',{
		sid:sid,url:source,user:uname,email:email,note:note,title:title});
	
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


// 获取影视片段资源
export const getMovieSource = async (sid) => {
  try {
	console.log('getMovieSource request');
    const response = await uni.$http.get('/mvsource/'+sid);
	
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