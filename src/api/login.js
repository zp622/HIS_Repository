import request from '@/utils/request'

export const loginPath = '/api/User/userLogin'
export const logoutPath = '/api/User/exitLogin'
export function loginByUsername (username, password) {
  return request({
    url: loginPath,
    method: 'post',
    data: {
      jobNumber: username,
      password: password
    },
    params: {}
  })
}

// 退出登录
export function logout (jobNumber) {
  return request({
    url: logoutPath,
    method: 'post',
    data: {
      'jobNumber': jobNumber
    }
  })
}
