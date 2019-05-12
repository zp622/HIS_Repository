import request from '@/utils/request'

export const patientRegisterPath = '/api/User/userLogin'

export function patientRegister (formInfo) {
  return request({
    url: patientRegisterPath,
    method: 'post',
    data: {
      cardType: formInfo.cardType,
      cardId: formInfo.cardNo,
      name: formInfo.name,
      sex: formInfo.sex,
      birthday: formInfo.birthday,
      phone: formInfo.phone,
      address: formInfo.address,
      allergyMedicine: formInfo.allergy,
      famous: formInfo.nation
    },
    params: {}
  })
}
