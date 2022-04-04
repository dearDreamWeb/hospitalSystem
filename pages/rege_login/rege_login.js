const {
  register,
  login,
} = require('../../api/index');
const {
  uploadAvatar
} = require('../../utils/request')

var app = getApp();
Page({
  data: {
    // tab 切换
    tabArr: {
      curHdIndex: 2,
      curBdIndex: 2,
      defaultType: true,
      passwordType: true,
    },
    avatarUrl: '',
    showAvatarUrl: ''
  },
  //defaultType：眼睛状态   passwordType：密码可见与否状态
  eyeStatus: function () {
    if (this.data.defaultType) {
      this.setData({
        passwordType: false,
        defaultType: false,
      })
    } else {
      this.setData({
        passwordType: true,
        defaultType: true,
      })
    }
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad');

  },

  /**
   * 头像上传
   */
  uploadAvatarHandle: async function () {
    const res = await uploadAvatar();
    if (!res.success) {
      wx.showToast({
        title: '上传失败',
      })
      return;
    }

    this.setData({
      ...this.data,
      avatarUrl: res.data.name,
      showAvatarUrl: res.data.absolutePath
    })
  },
  /**
   * 注册
   * @param {*} e 
   */
  RegisterInfo: async function (e) {
    console.log("RegisterInfojson:" + e.detail.value)
    const {
      name,
      phone,
      pwd,
      sex,
      age
    } = e.detail.value;

    if (!name || !phone || !pwd || !sex || !age) {
      wx.showToast({
        title: '请完善个人信息',
        icon: 'error',
        mask: true
      })
      return;
    }
    const reg = /^1[0-9]{10}$/;
    if (!reg.test(phone)) {
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
    const res = await register({
      name,
      phone,
      pwd,
      sex,
      age,
      avatarUrl: this.data.avatarUrl
    })
    if (!res.success) {
      wx.showToast({
        title: res.message,
      })
      return;
    }
    wx.showToast({
      title: '注册成功',
    })
    this.setData({
      tabArr: {
        ...this.tabArr,
        curHdIndex: 2,
        curBdIndex: 2,
      }
    })
  },

  /**
   * 登录
   * @param {*} e 
   */
  UserLogin: async function (e) {
    const {
      phone,
      pwd,
      userType
    } = e.detail.value;
    console.log(e.detail.value);
    if (!userType) {
      wx.showToast({
        title: '用户类型未选择',
      })
      return;
    }

    const res = await login({
      phone,
      pwd,
      type: userType
    })
    if (!res.success) {
      wx.showToast({
        title: res.message,
      })
      return;
    }
    const {
      token,
      userInfo,
      doctorInfo
    } = res.data;
    if(userType === 'ORDINARY_USER'){
      wx.setStorageSync('userInfo', userInfo);
      app.globalData.userInfo = userInfo
    }else{
      wx.setStorageSync('doctorInfo', doctorInfo);
      app.globalData.doctorInfo = doctorInfo
    }
    wx.setStorageSync('token', token);
    app.globalData.token = token
    wx.showToast({
      title: '登录成功',
      success: () => {
        setTimeout(() => {
          wx.switchTab({
            url: '../index/index'
          })
          
        }, 1000)
      }
    })

  },
  //tab切换
  tab: function (e) {
    //var dataId = e.currentTarget.dataset.id;
    var dataId = e.currentTarget.id;
    var obj = {};
    // dataId为1时为注册，为2时为登录
    obj.curHdIndex = dataId;
    obj.curBdIndex = dataId;
    this.setData({
      tabArr: obj
    })
  },
  showok: function () {
    wx.showToast({
      title: '信息提交成功',
      icon: 'success',
      duration: 2000
    })
  }
})