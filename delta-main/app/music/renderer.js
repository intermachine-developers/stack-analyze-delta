// lyrics module
const { ipcRenderer } = require('electron');
const lyricsFinder = require('lyrics-finder');

// DOM elements
const form = document.getElementById('query-lyrics');
const artist = document.getElementById('artist');
const song = document.getElementById('song');
const lyrics = document.querySelector('pre');

if (module.hot) {
   module.hot.accept();
}

// query function
const queryLyrics = async () => {
  const res = await lyricsFinder(artist.value, song.value) || "Required fields or Not Found!";
  lyrics.textContent = res;
};

// submit
form.addEventListener('submit', e => {
  e.preventDefault();
  queryLyrics();
  form.reset();
});

ipcRenderer.on('clear-results', () => {
  lyrics.innerHTML = '';
});
