import request from '@/utils/request'

export const queryDeptInfoPath = '/api/Department/getDept'

/* 查询科室信息 */
export function queryDeptInfo (queryForm, currentPage, pageSize) {
  var obj = {'deptName': queryForm.deptName, 'address': queryForm.floor}
  return request({
    url: queryDeptInfoPath,
    method: 'post',
    data: {
      department: obj,
      currentPage: currentPage,
      pageSize: pageSize
    },
    params: {}
  })
}
