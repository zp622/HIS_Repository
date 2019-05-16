import request from '@/utils/request'

export const editRecordsInfoPath = '/api/MedicalRecord/updRecord'
export const addRecordsInfoPath = '/api/MedicalRecord/addRecord'
export const queryRecordsInfoPath = '/api/MedicalRecord/getRecord'

/* 新增病历信息 */
export function addRecordsInfo (formInfo) {
  return request({
    url: addRecordsInfoPath,
    method: 'post',
    data: {
      patientNo: formInfo.patientNo,
      registerNo: formInfo.bookNo,
      patientName: formInfo.name,
      department: formInfo.dept,
      creator: formInfo.creator
    },
    params: {}
  })
}

/* 查询病历信息 */
export function queryRecordsInfo (formInfo) {
  var currentPage = 1
  var pageSize = 1000000
  var obj = {'patientNo': formInfo.patientNo, 'registerNo': formInfo.registerNo}
  return request({
    url: queryRecordsInfoPath,
    method: 'post',
    data: {
      'medicalRecord': obj,
      'currentPage': currentPage,
      'pageSize': pageSize
    },
    params: {}
  })
}

/* 填写病历信息 修改 */
export function editRecordsInfo (formInfo) {
  return request({
    url: editRecordsInfoPath,
    method: 'post',
    data: {
      registerTime: formInfo.registerTime,
      registerNo: formInfo.registerNo,
      patientNo: formInfo.patientNo,
      patientName: formInfo.patientName,
      hospital: formInfo.hospital,
      department: formInfo.department,
      visitTime: formInfo.visitTime,
      doctor: formInfo.doctor,
      chiefAction: formInfo.chiefAction,
      presentIllness: formInfo.presentIllness,
      historyIllness: formInfo.historyIllness,
      phyExam: formInfo.phyExam,
      tentDiag: formInfo.tentDiag,
      trpl: formInfo.trpl,
      auxiExam: formInfo.auxiExam,
      updater: formInfo.updater
    },
    params: {}
  })
}

/* 查询病历信息 病历信息管理 */
export function manageQueryRecordsInfo (formInfo, currentPage, pageSize) {
  var obj = {'patientNo': formInfo.patientNo, 'registerNo': formInfo.registerNo, 'patientName': formInfo.patientName}
  return request({
    url: queryRecordsInfoPath,
    method: 'post',
    data: {
      'medicalRecord': obj,
      'currentPage': currentPage,
      'pageSize': pageSize
    },
    params: {}
  })
}
