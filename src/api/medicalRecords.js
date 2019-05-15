import request from '@/utils/request'

export const editRecordsInfoPath = '/'
export const addRecordsInfoPath = '/api/MedicalRecord/addRecord'

/* 新增病历信息 */
export function addRecordsInfo (formInfo) {
  return request({
    url: addRecordsInfoPath,
    method: 'post',
    data: {
      patientNo: formInfo.patientNo,
      registerNo: formInfo.bookNo,
      creator: formInfo.creator
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
