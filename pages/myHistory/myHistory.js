const app = getApp();
const {
  queryUserAppointment
} = require('../../api/index')
const { formatTime } = require('../../utils/tools');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    options: [
      {
        status: -1,
        text: '全部'
      },
      {
        status: 0,
        text: '取消预约'
      },
      {
        status: 1,
        text: '预约成功'
      },
      {
        status: 2,
        text: '问诊成功'
      },
    ],
    selected: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.queryList();
  },

  async queryList() {
    const { selected, options } = this.data;
    const {
      userInfo,
      doctorInfo
    } = app.globalData;
    const params = {
      page: 1,
      pageSize: 100000,
    }
    if(userInfo){
      params.phone = userInfo.phone
    }else{
      params.doctorId = doctorInfo.id
    }
    if (options[selected].status !== -1) {
      params.status = options[selected].status
    }
    const res = await queryUserAppointment(params);
    if (!res.success) {
      return;
    }
    let list = res.data.items || [];
    list = list.map((item) => {
      return {
        ...item,
        reserveTime: formatTime(item.reserveTime * 1000),
      }
    })
    this.setData({
      ...this.data,
      list
    })
  },
  
  changeStatus(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      ...this.data,
      selected: index
    },()=>{
      this.queryList();
    })
  },

  jumpToMsg(e){
    const {
      data
    } = e.currentTarget.dataset
    console.log(data)
    wx.navigateTo({
      url: `/pages/msg/msg?info=${JSON.stringify(data)}`,
    })
  }
})