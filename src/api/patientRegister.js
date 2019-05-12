import request from '@/utils/request'
import {formatDate} from '../utils'

export const patientRegisterPath = '/api/Patient/addPatient'

export function patientRegister (formInfo) {
  return request({
    url: patientRegisterPath,
    method: 'post',
    data: {
      cardType: formInfo.cardType,
      cardId: formInfo.cardNo,
      name: formInfo.name,
      sex: formInfo.sex,
      birthday: formatDate(formInfo.birthday),
      phone: formInfo.phone,
      address: formInfo.address,
      allergyMedicine: formInfo.allergy,
      creator: formInfo.creator,
      famous: formInfo.nation
    },
    params: {}
  })
}
