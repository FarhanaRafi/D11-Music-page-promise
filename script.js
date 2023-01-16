const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "77cded920amsh41bb67a07527abep12c202jsn008eae99c17c",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

let songs = [];

const renderMusic = (searchResults, section) => {
  let sectionDiv = document.getElementById(section);
  for (let i = 0; i < searchResults.data.length; i++) {
    let result = searchResults.data[i];
    songs.push(result);
    sectionDiv.innerHTML += `<div class = "col">
    <div class="card mb-3">
    <img src="${result.album.cover_medium}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${result.title}</h5>
    </div>
    </div>
  </div>`;
  }
};

function convertSecs(seconds) {
  let minutes = parseInt(seconds / 60);
  let sec = seconds % 60;

  return `${minutes}:${sec}`;
}

function songCount() {
  let songCounts = document.getElementById("count");
  songCounts.innerText = `(${songs.length})`;
}

function loadTracks() {
  let rows = document.getElementById("tracks");
  for (let i = 0; i < songs.length; i++) {
    let song = songs[i];
    rows.innerHTML += ` <tr>
        <th scope="row">${i + 1}</th>
        <td>${song.title}</td>
        <td>${song.album.title}</td>
        <td>${song.artist.name}</td>
        <td>${convertSecs(song.duration)}</td>
      </tr>`;
  }
  songCount();
}

function loadUniqueAlbums() {
  let uniqueAlbums = [];
  songs.forEach((song) => {
    if (!uniqueAlbums.includes(song.album.title)) {
      uniqueAlbums.push(song.album.title);
    }
  });

  console.log(`Unique Albums: ${uniqueAlbums.length}`);
}

function getMusic(searchQuery, section) {
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + searchQuery,
    options
  )
    .then((response) => response.json())
    .then((searchResults) => {
      renderMusic(searchResults, section);
    })
    .catch((err) => console.error(err));
}

function loadSections() {
  getMusic("pink floyd", "pink");
  getMusic("metallica", "metal");
  getMusic("daft punk", "daft");
}

window.onload = loadSections();
