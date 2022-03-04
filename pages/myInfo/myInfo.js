var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 修改个人信息
   * @param {*} options 
   */
  updateUserInfo: (e) => {
    const {
      name,
      phone_number,
      pwd,
      sex,
      age,
    } = e.detail.value;

    if (!name || !phone_number || !pwd || !sex || !age) {
      wx.showToast({
        title: '请完善个人信息',
        icon: 'error',
        mask: true
      })
      return;
    }
    const reg = /^1[0-9]{10}$/;
    if (!reg.test(phone_number)) {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'error',
        mask: true
      })
      return;
    }
    const regAge = /^[1-9][0-9]{0,2}$/
    if (!regAge.test(age)) {
      wx.showToast({
        title: '年龄输入错误',
        icon: 'error',
        mask: true
      })
      return;
    }
    wx.showToast({
      title: '修改成功',
      success: () => {
        setTimeout(() => {
          wx.switchTab({
            url: '../index/index'
          })
        }, 1000)
      }
    })
  },

  /**
   * 上传头像
   */
  uploadAvatar: () => {
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data
            //do something
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      ...this.data,
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})