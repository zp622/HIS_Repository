import request from '@/utils/request'

export const checkOldPasswordPath = '/api/User/validatePwd'
export const updatePasswordPath = '/api/User/updPwd'

// 修改密码时，校验输入的旧密码是否正确
export function checkOldPassword (jobNumber, oldPassword) {
  return request({
    url: checkOldPasswordPath,
    method: 'post',
    data: {
      jobNumber: jobNumber,
      password: oldPassword
    },
    params: {}
  })
}

// 修改密码
export function updatePassword (formInfo) {
  return request({
    url: updatePasswordPath,
    method: 'post',
    data: {
      jobNumber: formInfo.jobNumber,
      password: formInfo.newPwd
    },
    params: {}
  })
}
