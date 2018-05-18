let searchString, queryResponse, selectedType, authToken, accessToken, hash, content
const redirectUri = chrome.identity.getRedirectURL('oauth2')
const clientId = 'f527412313034cc7a4f36b1053ae0c07'
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    'id': 'trackSearch',
    'title': 'Search Spotify',
    'contexts': ['selection']
  })
})
chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  console.log(response.type)
  switch (response.type) {
    case 'authRequest':
      authorize()
      break
    case 'searchQuery':
      console.log(response)
      console.log(response.selection)
      searchString = response.selection
      break
    case 'resetAuth':
      authToken = ''
      chrome.storage.local.remove('AuthToken')
      break
    case 'readyAnnounce':
      chrome.runtime.sendMessage({type: 'results', content: content})
  }
})
chrome.contextMenus.onClicked.addListener(function () {
  authorize()
})
/* window.onload = function () {
  console.log('onload')
  chrome.storage.local.get('AuthToken', function (result) {
    console.log(result.AuthToken)
    authToken = result.AuthToken
    console.log(authToken)
    if (typeof authToken === 'undefined' || authToken === 'null' || authToken === '') {
      console.log('authToken undef')
      authToken = authorize()
      chrome.storage.local.set({AuthToken: authToken}, function (result) {
        console.log('authToken is now' + authToken)
        authToken = result
      })
    } else {
      console.log('authToken not undef')
      console.log(authToken)
    }
  })
} */
function requestResults (searchString) {
  selectedType = 'track'
  console.log('result function')
  let queryAuth = 'https://api.spotify.com/v1/search'
  console.log(authToken)
  console.log(searchString)
  // accessToken = getAccessToken()
  console.log(accessToken)
  $.ajax({
    url: queryAuth,
    type: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    data: {
      q: searchString,
      type: selectedType
    },
    success: function (res) {
      queryResponse = res
    },
    async: false
  })
  content = queryResponse.tracks
}
function authorize () {
  console.log('auth function')
  let authQueryUrl = '?client_id=' + clientId + '&response_type=token&redirect_uri=' + redirectUri + '&state=123'
  console.log(authQueryUrl)
  if (accessToken === 'null' || typeof accessToken === 'undefined') {
    chrome.identity.launchWebAuthFlow({
      url: 'https://accounts.spotify.com/authorize/' + authQueryUrl,
      interactive: true
    }, function (redirectURL) {
      console.log(redirectURL)
      hash = redirectURL.split('#')
      console.log(hash)
      hash = hash[1]
      console.log(hash)
      hash = hash.split('&')
      console.log(hash)
      hash = hash[0]
      console.log(hash)
      hash = hash.split('=')
      console.log(hash)
      accessToken = hash[1]
      chrome.tabs.create({'url': chrome.extension.getURL('results.html')})
      requestResults(searchString)
    })
  } else {
    chrome.tabs.create({'url': chrome.extension.getURL('results.html')})
    requestResults(searchString)
  }
}
