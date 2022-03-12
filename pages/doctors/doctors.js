// pages/doctors/doctors.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clinicInfo: {}, // 门诊信息
    dateArr: [], // 日期列表
    dateSelected: 0, // 日期选择的索引
    doctorList: [{
      name: '王大力',
      avatarUrl: '',
      department: '外科',
      level: '主治医师',
      specialty: '邻学医床经验丰富，十余年之久。'
    }, {
      name: '王大力',
      avatarUrl: '',
      department: '外科',
      level: '主治医师',
      specialty: '邻学医床经验丰富，十余年之久。'
    }, {
      name: '王大力',
      avatarUrl: '',
      department: '外科',
      level: '主治医师',
      specialty: '邻学医床经验丰富，十余年之久。'
    }, {
      name: '王大力',
      avatarUrl: '',
      department: '外科',
      level: '主治医师',
      specialty: '邻学医床经验丰富，十余年之久。'
    }], // 医生列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      data
    } = options;
    let arr = [];
    const day = new Date().getTime();
    const dayTime = 1000 * 60 * 60 * 24;
    for (let i = 0; i < 7; i++) {
      arr.push(this.formatDate(day + dayTime * (i + 1)))
    }

    this.setData({
      ...this.data,
      clinicInfo: data,
      dateArr: arr
    })
  },

  /**
   * 日期处理
   * @param {*} date 
   */
  formatDate: function (date) {
    // const timeStamp
    const weekChineseArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const week = weekChineseArr[new Date(date).getDay()];
    const dateText = new Date(date).toLocaleDateString().replaceAll('/', '-');
    return {
      week,
      dateText
    }
  },

  dateSelectedHandler: function (e) {
    const {
      index
    } = e.currentTarget.dataset;
    this.setData({
      ...this.data,
      dateSelected: index
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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