import request from '@/utils/request'

export const queryEmployeeInfoPath = '/api/Member/getAll'

/* 查询员工信息 */
export function queryEmployeeInfo (queryForm, currentPage, pageSize) {
  var obj = {'jobNumber': queryForm.jobNumber, 'name': queryForm.name, 'titleRank': queryForm.titleRank, 'belongDept': queryForm.dept}
  return request({
    url: queryEmployeeInfoPath,
    method: 'post',
    data: {
      member: obj,
      currentPage: currentPage,
      pageSize: pageSize
    },
    params: {}
  })
}
