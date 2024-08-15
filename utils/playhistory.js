// utils/playhistory.js

let playHistory = [];

// 初始化播放历史记录
function initPlayHistory() {
  const storedPlayHistory = uni.getStorageSync('playHistory');
  if (storedPlayHistory) {
    playHistory = storedPlayHistory;
  }
}

// 保存播放历史记录到本地存储
function savePlayHistory() {
  uni.setStorageSync('playHistory', playHistory);
}

// 添加播放记录
function addPlayRecord(item) {
  // 检查是否已存在相同记录，如果存在则移除旧记录
  playHistory = playHistory.filter(record => record.id !== item.id);
  // 添加新记录到最前面
  playHistory.unshift(item);
  savePlayHistory();
}

// 获取播放记录数量
function getPlayRecordCount() {
  return playHistory.length;
}

// 删除播放记录
function removePlayRecord(id) {
  playHistory = playHistory.filter(record => record.id !== id);
  savePlayHistory();
}

// 获取所有播放记录
function getAllPlayRecords() {
  return playHistory;
}

// 导出方法
export default {
  initPlayHistory,
  addPlayRecord,
  getPlayRecordCount,
  removePlayRecord,
  getAllPlayRecords
};
