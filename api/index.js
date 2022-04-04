import {
  request,
  uploadAvatar
} from '../utils/request';

// 注册
const register = (data) => {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  })
}

// 修改用户信息
const updateUser = (data) => {
  return request({
    url: '/user',
    method: 'put',
    data,
  })
}

// 上传
const login = (data) => {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

// 获取新闻
const queryNews = (data) => {
  return request({
    url: '/news/query',
    method: 'post',
    data,
  })
}

// 充值
const rechargeApi = (data) => {
  return request({
    url: '/user/recharge',
    method: 'put',
    data,
  })
}

// 充值
const queryRechargeHistory = (data) => {
  return request({
    url: '/recharge',
    method: 'get',
    data,
  })
}

// 查询科室
const getSection = (data) => {
  return request({
    url: '/section',
    method: 'get',
    data,
  })
}

// 查询门诊
const getOutpatient = (data) => {
  return request({
    url: '/outpatient',
    method: 'get',
    data,
  })
}

// 查询预约医生
const queryTwo = (data) => {
  return request({
    url: '/reserve/queryTwo',
    method: 'get',
    data,
  })
}
// 查询预约医生
const addReserve = (data) => {
  return request({
    url: '/reserve/save',
    method: 'post',
    data,
  })
}

// 查询预约医生
const getUserInfo = (data) => {
  return request({
    url: '/user/getOne',
    method: 'get',
    data,
  })
}

/**
 * 用户查询自己的预约列表
 * @param {*} data 
 */
const queryUserAppointment = (data) => {
  return request({
    url: '/reserve/query',
    method: 'get',
    data,
  })
}

// 修改医生
const updateDoctor = (data) => {
  return request({
    url: '/doctor',
    method: 'put',
    data
  });
};

// 添加评论
const addComment = (data) => {
  return request({
    url: '/message',
    method: 'post',
    data
  });
};

module.exports = {
  register,
  login,
  queryNews,
  uploadAvatar,
  rechargeApi,
  getSection,
  getOutpatient,
  queryTwo,
  addReserve,
  getUserInfo,
  queryUserAppointment,
  updateDoctor,
  updateUser,
  queryRechargeHistory,
  addComment,
}