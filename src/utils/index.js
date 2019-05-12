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

export function validateIDcard (str) {
  var IDcard = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return IDcard.test(str)
}
