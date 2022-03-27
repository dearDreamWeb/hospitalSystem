const {
  uploadAvatar,
  updateUser,
} = require('../../api/index')
const { resetUserInfo } = require('../../utils/tools')

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    avatarUrlInfo: '',
    showAvatarUrlInfo: ''
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      ...this.data,
      userInfo: app.globalData.userInfo,
      avatarUrlInfo: app.globalData.userInfo.avatarUrl,
      showAvatarUrlInfo: app.globalData.userInfo.avatarUrl
    })
  },

  /**
   * 修改个人信息
   * @param {*} options 
   */
  async updateUserInfo(e) {
    const {
      name,
      phone_number,
      pwd,
      sex,
      age,
    } = e.detail.value;
    const { avatarUrlInfo, userInfo } = this.data;
    const { id } = userInfo;

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
    const res = await updateUser({
      id, name,
      phone_number,
      pwd,
      sex,
      age,
      avatarUrl: avatarUrlInfo,
    })
    if (!res.success) {
      wx.showToast({
        title: '修改失败'
      })
      return;
    }
    resetUserInfo();
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
   async uploadAvatar(){
    const res = await uploadAvatar();
    const { absolutePath, name } = res.data;
    this.setData({
      ...this.data,
      avatarUrlInfo: name,
      showAvatarUrlInfo: absolutePath
    })
  },


})