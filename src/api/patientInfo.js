import request from '@/utils/request'

export const queryPatientInfoPath = '/api/Patient/getAll'
export const editPatientInfoPath = '/api/Patient/editPatient'
/*
export const selectDoctorListPath = '/api/Member/getAll'
export const queryBookFormDataPath = '/api/BookingForm/getBookingForm'
export const queryResidualNumberPath = '/api/BookingForm/queryHasCount'
export const editBookingFormPath = '/api/BookingForm/updBookingForm'
*/

/* 查询患者信息 */
export function queryPatientInfo (formInfo, currentPage, pageSize) {
  var obj = {'cardType': formInfo.cardType, 'cardId': formInfo.cardNo, 'patientNo': formInfo.patientNo, 'name': formInfo.name, 'phone': formInfo.phone}
  return request({
    url: queryPatientInfoPath,
    method: 'post',
    data: {
      patient: obj,
      currentPage: currentPage,
      pageSize: pageSize
    },
    params: {}
  })
}

/* 修改患者信息 */
export function editPatientInfo (formInfo) {
  return request({
    url: editPatientInfoPath,
    method: 'post',
    data: {
      patientNo: formInfo.patientNo,
      cardType: formInfo.cardType,
      cardId: formInfo.cardId,
      name: formInfo.name,
      sex: formInfo.sex,
      famous: formInfo.famous,
      phone: formInfo.phone,
      address: formInfo.address,
      allergyMedicine: formInfo.allergyMedicine,
      updater: formInfo.updater
    },
    params: {}
  })
}
