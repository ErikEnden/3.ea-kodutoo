window.onload = function () {
  console.log('ready')
  chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    if (response.type === 'results') {
      let body = document.getElementsByTagName('body')[0]
      let table = document.createElement('table')
      let results = response.content.items
      console.log(results)
      if (results.length === 0) {
        let noTracks = document.createElement('p')
        let noTracksText = document.createTextNode('nothing to show')
        noTracks.appendChild(noTracksText)
        body.appendChild(noTracks)
      } else {
        for (let i = 0; i < results.length; i++) {
          let tableRow = document.createElement('tr')
          let trackName = document.createElement('td')
          let trackArtist = document.createElement('td')
          let trackLength = document.createElement('td')
          let trackAlbum = document.createElement('td')
          let trackLink = document.createElement('td')
          let trackNameText = document.createTextNode(results[i].name)
          let trackArtistText = document.createTextNode(results[i].artists[0].name)
          let trackLengthText = document.createTextNode(results[i].duration_ms)
          let trackAlbumText = document.createTextNode(results[i].album.name)
          let trackLinkText = document.createTextNode(results[i].external_urls.spotify)
          trackName.appendChild(trackNameText)
          trackArtist.appendChild(trackArtistText)
          trackLength.appendChild(trackLengthText)
          trackAlbum.appendChild(trackAlbumText)
          trackLink.appendChild(trackLinkText)
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
