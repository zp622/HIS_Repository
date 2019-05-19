import request from '@/utils/request'
import {formatDate} from '../utils'

export const queryEmployeeInfoPath = '/api/Member/getAll'
export const addEmployeeInfoPath = '/api/Member/addMember'
export const editEmployeeInfoPath = '/api/Member/updMember'

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

/* 新增员工信息 */
export function addEmployeeInfo (formInfo) {
  return request({
    url: addEmployeeInfoPath,
    method: 'post',
    data: {
      id: formInfo.id,
      name: formInfo.name,
      sex: formInfo.sex,
      famous: formInfo.famous,
      birthday: formatDate(formInfo.birthday),
      titleRank: formInfo.titleRank,
      careerExperience: formInfo.careerExperience,
      address: formInfo.address,
      email: formInfo.email,
      phone: formInfo.phone,
      workDate: formatDate(formInfo.workDate),
      degree: formInfo.degree,
      jobNumber: formInfo.jobNumber,
      creator: formInfo.creator,
      belongDept: formInfo.belongDept
    },
    params: {}
  })
}

/* 修改员工信息 */
export function editEmployeeInfo (obj) {
  var formInfo = obj
  if (typeof formInfo.birthday === 'string') {
    formInfo.birthday = new Date(formInfo.birthday.replace(/-/g, '/'))
  } else {

  }
  if (typeof formInfo.workDate === 'string') {
    formInfo.workDate = new Date(formInfo.workDate.replace(/-/g, '/'))
  } else {

  }
  return request({
    url: editEmployeeInfoPath,
    method: 'post',
    data: {
      id: formInfo.id,
      name: formInfo.name,
      sex: formInfo.sex,
      famous: formInfo.famous,
      birthday: formatDate(formInfo.birthday),
      titleRank: formInfo.titleRank,
      careerExperience: formInfo.careerExperience,
      address: formInfo.address,
      email: formInfo.email,
      phone: formInfo.phone,
      workDate: formatDate(formInfo.workDate),
      degree: formInfo.degree,
      jobNumber: formInfo.jobNumber,
      updater: formInfo.updater,
      belongDept: formInfo.belongDept
    },
    params: {}
  })
}
