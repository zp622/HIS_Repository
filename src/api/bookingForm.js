import request from '@/utils/request'
import {formatDateForBook} from '../utils'

export const cardNoCheckPath = '/api/Patient/getAll'
export const bookingFormPath = '/api/BookingForm/addBookForm'
export const selectDoctorListPath = '/api/Member/getAll'
export const queryBookFormDataPath = '/'
export const queryResidualNumberPath = 'api/BookingForm/queryHasCount'

/* 验证是否存在当前患者信息 否则需要注册 */
export function cardNoCheck (formInfo) {
  var obj = {'cardId': formInfo.cardNo, 'cardType': formInfo.cardType}
  var currentPage = 1
  var pageSize = 1000000
  return request({
    url: cardNoCheckPath,
    method: 'post',
    data: {
      patient: obj,
      currentPage: currentPage,
      pageSize: pageSize
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
      /* registerNo: '', // query
      waitingNo: '', // query
      address: '', // query */
      patientNo: formInfo.patientNo,
      patientName: formInfo.name,
      registerFee: '10元',
      registerType: formInfo.bookType,
      registerDept: formInfo.bookDept,
      doctor: formInfo.doctor,
      registerTime: formatDateForBook(formInfo.bookDate) + ' ' + formInfo.bookTime,
      creator: formInfo.creator
    }
  })
}
/* 查询医生名单 */
export function selectDoctorList (formInfo) {
  var params = {}
  switch (formInfo.bookType) {
    case '主任医师号':
      params.bookType = '主任'
      break
    case '副主任医师号':
      params.bookType = '副主任'
      break
    default:
  }
  var obj = {'titleRank': params.bookType, 'belongDept': formInfo.bookDept}
  var currentPage = 1
  var pageSize = 1000000
  return request({
    url: selectDoctorListPath,
    method: 'post',
    data: {
      member: obj,
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

/* 查询挂号单信息 */
export function queryBookFormData (queryForm, currentPage, pageSize) {
  if (queryForm.date === '' || queryForm.date === undefined) {

  } else {
    queryForm.date = formatDateForBook(queryForm.date)
  }
  return request({
    url: queryBookFormDataPath,
    method: 'post',
    data: {
      bookingForm: queryForm,
      currentPage: currentPage,
      pageSize: pageSize
    },
    params: {}
  })
}

/* 查询该科室 该医生 该日期下 是否还有剩余的挂号名额 */
export function queryResidualNumber (formInfo) {
  var obj = {'registerDept': formInfo.bookDept, 'doctor': formInfo.doctor, 'registerTime': formatDateForBook(formInfo.bookDate) + ' ' + formInfo.bookTime, 'registerType': formInfo.bookType}
  var currentPage = 1
  var pageSize = 1000000
  return request({
    url: queryResidualNumberPath,
    method: 'post',
    data: {
      bookingForm: obj,
      currentPage: currentPage,
      pageSize: pageSize
    },
    params: {}
  })
}
