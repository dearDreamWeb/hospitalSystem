const { getMessageByDoctorId } = require('../../api/index')
const { formatTime } = require('../../utils/tools');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryComments();
  },

  async queryComments() {
    const doctorInfo = app.globalData.doctorInfo;
    const res = await getMessageByDoctorId({doctorId:doctorInfo.id});
    if(!res.success){
      return;
    }
    const list = res.data.items.map((item)=>{
      return{
        ...item,
        createTime: formatTime(item.createTime),
      }
    });
    this.setData({
      ...this.data,
      commentList:list
    })
  },

})