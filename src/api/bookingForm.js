import request from '@/utils/request'

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
      registerNo: '',
      patientNo: formInfo.patientNo,
      registerFee: '10元',
      registerType: formInfo.bookType,
      refisterDept: formInfo.bookDept,
      creator: this.$store.getters.jobNumber
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
