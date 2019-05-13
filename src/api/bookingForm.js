import request from '@/utils/request'
import {formatDateForBook} from '../utils'

export const cardNoCheckPath = '/api/User/'
export const bookingFormPath = '/api/User/'
export const selectDoctorListPath = '/'

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
      creator: ''
    }
  })
}
/* 查询医生名单 */
export function selectDoctorList (formInfo) {
  return request({
    url: selectDoctorListPath,
    method: 'post',
    data: {
      registerType: formInfo.bookType,
      refisterDept: formInfo.bookDept
    }
  })
}
