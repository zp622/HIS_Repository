export function voicePlay (text) {
  var speechSU = new window.SpeechSynthesisUtterance()
  speechSU.text = text
  window.speechSynthesis.speak(speechSU)
}
