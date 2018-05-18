let authToken
let tokenDom = document.getElementById('curTok')
let authButton = document.getElementById('authButton')
let refreshButton = document.getElementById('refreshButton')
let clearButton = document.getElementById('clearButton')
function getCurrentAuthToken () {
  chrome.storage.local.get('AuthToken', function (result) {
    authToken = result.AuthToken
  })
  tokenDom.innerText = 'Current access token: ' + authToken
}
authButton.onclick = function () {
  chrome.runtime.sendMessage({type: 'authRequest'})
}
refreshButton.onclick = function () {
  getCurrentAuthToken()
  tokenDom.innerText = 'Current access token: ' + authToken
}
clearButton.onclick = function () {
  chrome.runtime.sendMessage({type: 'resetAuth'})
  getCurrentAuthToken()
  tokenDom.innerText = 'Current access token: ' + authToken
}
window.onload = function () {
  getCurrentAuthToken()
  tokenDom.innerText = 'Current access token: ' + authToken
}
