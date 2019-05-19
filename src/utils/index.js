/* 文本转语音 */
export function voicePlay (text) {
  var speechSU = new window.SpeechSynthesisUtterance()
  speechSU.text = text
  window.speechSynthesis.speak(speechSU)
}

/* 校验手机号码 */
export function validateMobile (str) {
  var mobile = /^1[3|5|8|7]\d{9}$/
  return mobile.test(str)
}

/* 校验座机号码 */
export function validatePhone (str) {
  var phone = /^0\d{2,3}-?\d{7,8}$/
  return phone.test(str)
}

/* 挂号时校验患者的身份信息是否已存在 */
export function validateIDcard (str) {
  var IDcard = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return IDcard.test(str)
}

/* 格式化挂号时间 ‘2019-05-13’ */
export function formatDateForBook (date) {
  var seperator = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var formatDateForBook = year + seperator + month + seperator + strDate
  return formatDateForBook
}

export function getFormatDate (date) {
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var hour = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + ':' + minutes + ':' + seconds
  return currentdate
}
/* 格式化年月日 20180201 */
export function formatDate (date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var formatDate = year + month + strDate
  return formatDate
}

/* 20180908→2018-09-08 */
export function formatterToDate (strDate) {
  var seperator = '-'
  var year = strDate.substring(0, 4)
  var month = strDate.substring(4, 6)
  var day = strDate.substring(6, 8)
  return year + seperator + month + seperator + day
}
