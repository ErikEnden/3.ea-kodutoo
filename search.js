window.onload = function () {
  document.addEventListener('selectionchange', function () {
    let selectedString = window.getSelection().toString()
    chrome.runtime.sendMessage({type: 'searchQuery', selection: selectedString})
  })
}
