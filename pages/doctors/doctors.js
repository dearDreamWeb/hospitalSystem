const {
  queryTwo,
  addReserve,
} = require('../../api/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clinicInfo: {}, // 门诊信息
    dateArr: [], // 日期列表
    dateSelected: 0, // 日期选择的索引
    doctorList: [], // 医生列表
    appointmentData: [{
      startTime: 8,
      endTime: 10
    }, {
      startTime: 10,
      endTime: 12
    }, {
      startTime: 14,
      endTime: 16
    }, {
      startTime: 16,
      endTime: 18
    }],
    selectedTimeRange: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const {
      data
    } = options;
    const {
      outpatientName,
      id
    } = JSON.parse(data);


    let arr = [];
    const day = new Date().getTime();
    const dayTime = 1000 * 60 * 60 * 24;
    for (let i = 0; i < 7; i++) {
      arr.push(this.formatDate(day + dayTime * (i + 1)))
    }
    const {
      dateSelected,
      appointmentData,
    } = this.data;
    const date = arr[dateSelected];
    const newStartTime = `${date.dateText} ${appointmentData[0].startTime}:00:00`;
    const endStartTime = `${date.dateText} ${appointmentData[0].endTime}:00:00`;

    const params = {
      startTime: new Date(newStartTime).getTime() / 1000,
      endTime: new Date(endStartTime).getTime() / 1000,
      outpatientId: id,
      outpatient: outpatientName
    }
    const res = await queryTwo(params);

    this.setData({
      ...this.data,
      clinicInfo: JSON.parse(data),
      dateArr: arr,
      doctorList: res.data || []
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

  /**
   * 日期选择
   */
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
   * 时间段选择
   */
  timeSelectedHandler: function (e) {
    const {
      index,
      data
    } = e.currentTarget.dataset;
    const {
      startTime,
      endTime
    } = data;
    const {
      dateSelected,
      dateArr
    } = this.data;
    const date = dateArr[dateSelected];
    const newStartTime = `${date.dateText} ${startTime}:00:00`;
    const endStartTime = `${date.dateText} ${endTime}:00:00`;
    console.log(getTimeArr());
    console.log(new Date(newStartTime).getTime(),new Date(endStartTime).getTime());
    this.setData({
      ...this.data,
      selectedTimeRange: index
    })
  },

  getTimeArr(){
    const {
      selectedTimeRange,
      appointmentData,
      dateSelected,
      dateArr
    } = this.data;
    const date = dateArr[dateSelected];
    const newStartTime = `${date.dateText} ${appointmentData[selectedTimeRange].startTime}:00:00`;
    const endStartTime = `${date.dateText} ${appointmentData[selectedTimeRange].endTime}:00:00`;
    return [new Date(newStartTime).getTime()/1000,new Date(endStartTime).getTime()/100]
  },

  /***
   * 预约
   */
  async appointmentHandle(e) {
    const {
      data
    } = e.currentTarget.dataset;
    const {name,id} = data;
    const {
      clinicInfo,
      selectedTimeRange,
      appointmentData,
      dateSelected,
      dateArr
    } = this.data;
    const {outpatientName,sectionName} = clinicInfo;
    const date = dateArr[dateSelected];
    const newStartTime = `${date.dateText} ${appointmentData[selectedTimeRange].startTime}:00:00`;

    const params = {
      "reserveUser": name,
      "reserveTime": new Date(newStartTime).getTime()/1000,
      "reserveSection": sectionName,
      "reserveOutpatient": outpatientName,
      "doctorId": id,
      "status": 1,
      "reserveMoney": 22.112
    }
    const res = await addReserve(params)
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