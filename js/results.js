window.onload = function () {
  console.log('ready')
  chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    if (response.type === 'results') {
      let body = document.getElementsByTagName('body')[0]
      let table = document.createElement('table')
      table.setAttribute('class', 'resultTable')
      let results = response.content.items
      console.log(results)
      if (results.length === 0) {
        let noTracks = document.createElement('p')
        let noTracksText = document.createTextNode('nothing to show')
        noTracks.appendChild(noTracksText)
        body.appendChild(noTracks)
      } else {
        let headerRow = document.createElement('tr')
        let nameHead = document.createElement('th')
        let artistHead = document.createElement('th')
        let lengthHead = document.createElement('th')
        let albumHead = document.createElement('th')
        let linkHead = document.createElement('th')
        let nameHeadText = document.createTextNode('Name')
        let artistHeadText = document.createTextNode('Artist')
        let lengthHeadText = document.createTextNode('Length')
        let albumHeadText = document.createTextNode('Album')
        let linkHeadText = document.createTextNode('Link')

        for (let i = 0; i < results.length; i++) {
          let tableRow = document.createElement('tr')
          let trackName = document.createElement('td')
          let trackArtist = document.createElement('td')
          let trackLength = document.createElement('td')
          let trackAlbum = document.createElement('td')
          let trackLink = document.createElement('td')
          let trackLinkInner = document.createElement('a')
          let trackNameText = document.createTextNode(results[i].name)
          let trackArtistText = document.createTextNode(results[i].artists[0].name)
          let trackLengthText = document.createTextNode(msToMinSec(results[i].duration_ms))
          let trackAlbumText = document.createTextNode(results[i].album.name)
          let trackLinkText = document.createTextNode('Link')
          trackLinkInner.setAttribute('href', results[i].external_urls.spotify)
          trackLink.setAttribute('class', 'linkCol')
          trackName.appendChild(trackNameText)
          trackArtist.appendChild(trackArtistText)
          trackLength.appendChild(trackLengthText)
          trackAlbum.appendChild(trackAlbumText)
          trackLinkInner.appendChild(trackLinkText)
          trackLink.appendChild(trackLinkInner)
          tableRow.appendChild(trackName)
          tableRow.appendChild(trackArtist)
          tableRow.appendChild(trackLength)
          tableRow.appendChild(trackAlbum)
          tableRow.appendChild(trackLink)
          table.appendChild(tableRow)
        }
        body.appendChild(table)
      }
    }
  })
  chrome.runtime.sendMessage({type: 'readyAnnounce'})
}
function msToMinSec (input) {
  let minutes = Math.floor(input / 60000)
  let seconds = ((input % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}
