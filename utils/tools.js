const {
    getUserInfo,
} = require('../api/index');

/**
 * 重置用户自己的数据
 * @returns 
 */
const resetUserInfo = async () => {
    const res = await getUserInfo();
    if (!res.success) {
        return;
    }
    wx.setStorageSync('userInfo', res.data);
    app.globalData.userInfo = res.data
}

/**
 * 日期格式化
 * @param {*} date 
 * @returns 
 */
const formatTime = date => {
    var date = new Date(date);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const second = date.getSeconds().toString().padStart(2, '0')

    return `${[year, month, day].join('-')} ${hour}:${minute}:${second}`;
}

module.exports = { resetUserInfo, formatTime }