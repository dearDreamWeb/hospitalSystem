import {request} from '../utils/request';

// 上传
const register = (data) => {
  return request({
    url: '/user/register',
    method: 'post',
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

module.exports = {
  register,
  login
}

