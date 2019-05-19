import request from '@/utils/request'

export const queryDeptInfoPath = '/api/Department/getDept'
export const addDeptInfoPath = '/api/Department/addDept'
export const editDeptInfoPath = '/api/Department/updDept'
export const delDeptInfoPath = '/api/Department/delDept'

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

/* 新增科室信息 */
export function addDeptInfo (formInfo) {
  return request({
    url: addDeptInfoPath,
    method: 'post',
    data: {
      deptNo: formInfo.deptNo,
      deptName: formInfo.deptName,
      address: formInfo.address,
      manager: formInfo.manager,
      phone: formInfo.phone,
      introduction: formInfo.introduction,
      members: formInfo.members,
      creator: formInfo.creator
    },
    params: {}
  })
}

/* 修改科室信息 */
export function editDeptInfo (formInfo) {
  return request({
    url: editDeptInfoPath,
    method: 'post',
    data: {
      deptNo: formInfo.deptNo,
      deptName: formInfo.deptName,
      address: formInfo.address,
      manager: formInfo.manager,
      phone: formInfo.phone,
      introduction: formInfo.introduction,
      members: formInfo.members,
      updater: formInfo.updater
    },
    params: {}
  })
}

/* 删除科室信息 */
export function delDeptInfo (rows) {
  return request({
    url: delDeptInfoPath,
    method: 'post',
    data: rows,
    params: {}
  })
}
