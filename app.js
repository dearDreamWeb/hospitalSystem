//app.js
var app = getApp()
App({
  data: {
    users: []

  },

  onLaunch: async function () {
    const userInfo = wx.getStorageSync('userInfo');
    const token = wx.getStorageSync('token');
    this.globalData.userInfo = userInfo;
    this.globalData.token = token;
    if (!userInfo || !userInfo.id || !token) {
      wx.showToast({
        title: '请登录',
      })
      wx.navigateTo({
        url: '/pages/rege_login/rege_login',
      })
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    token: '',
  },
  /**
   * 封装请求头
   */
  getHeader() {
    var protocol = this.globalData.protocol
    var host = this.globalData.host
    var port = this.globalData.port
    var header = protocol + host + ':' + port
    console.log('header:' + header)
    return header;
  },
  fliteremoji: function (str) {
    str = str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")
  },
  showToast(title, duration, icon) {
    wx.showToast({
      title: title ? title : '网络繁忙，请扫后重试！',
      duration: duration || 1000,
      icon: icon || 'none'
    })
  }
})