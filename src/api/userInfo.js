import request from '@/utils/request'

export const queryUserInfoPath = '/api/User/getAll'

export function queryUserInfo (queryForm, currentPage, pageSize) {
  var obj = { 'jobNumber': queryForm.jobNumber, 'name': queryForm.name, 'role': queryForm.role }
  return request({
    url: queryUserInfoPath,
    method: 'post',
    data: {
      user: obj,
      currentPage: currentPage,
      pageSize: pageSize
    },
    params: {}
  })
}
