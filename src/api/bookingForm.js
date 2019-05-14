import request from '@/utils/request'
import {formatDateForBook} from '../utils'

export const cardNoCheckPath = '/api/User/'
export const bookingFormPath = '/api/User/'
export const selectDoctorListPath = '/'
export const queryBookFormDataPath = '/'
export const editRecordsInfoPath = '/'

/* 验证是否存在当前患者信息 否则需要注册 */
export function cardNoCheck (cardNo) {
  return request({
    url: cardNoCheckPath,
    method: 'post',
    data: {
      cardId: cardNo
    },
    params: {}
  })
}
/* 挂号 */
export function bookingForm (formInfo) {
  return request({
    url: bookingFormPath,
    method: 'post',
    data: {
      registerNo: '', // query
      waitingNo: '', // query
      address: '', // query
      patientNo: formInfo.patientNo,
      registerFee: '10元',
      registerType: formInfo.bookType,
      refisterDept: formInfo.bookDept,
      doctor: formInfo.doctor,
      registerTime: formatDateForBook(formInfo.bookDate, formInfo.bookTime),
      creator: formInfo.creator
    }
  })
}
/* 查询医生名单 */
export function selectDoctorList (formInfo) {
  return request({
    url: selectDoctorListPath,
    method: 'post',
    data: {
      titleRank: formInfo.bookType,
      belongDept: formInfo.bookDept
    }
  })
}

/* 查询挂号单信息 */
export function queryBookFormData (queryForm) {
  return request({
    url: queryBookFormDataPath,
    method: 'post',
    data: {
      registerTime: queryForm.bookTime,
      registerNo: queryForm.bookNo,
      patientNo: queryForm.patientNo
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
      registerTime: formInfo.bookTime,
      registerNo: formInfo.bookNo,
      patientNo: formInfo.patientNo,
      patientName: formInfo.patientName,
      hospital: formInfo.hospital,
      department: formInfo.department,
      visit_time: formInfo.visitTime,
      doctor: formInfo.doctor,
      chiefAction: formInfo.chiefAction,
      presentIllness: formInfo.presentIllness,
      historyIllness: formInfo.historyIllness,
      phyExam: formInfo.phyExam,
      tentDiag: formInfo.tentDiag,
      trpl: formInfo.trpl,
      tuxiExam: formInfo.tuxiExam,
      creator: formInfo.creator
    },
    params: {}
  })
}
