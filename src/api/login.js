import request from '@/utils/request'

export const loginPath = '/api/User/userLogin'
export const logoutPath = ''

export function loginByUsername (username, password) {
  return request({
    url: loginPath,
    method: 'post',
    data: {
      JOB_NUMBER: username,
      PASSWORD: password
    },
    params: {}
  })
}

export function logout () {
  return request({
    url: logoutPath,
    method: 'post'
  })
}