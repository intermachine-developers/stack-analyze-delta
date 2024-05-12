// lyrics module
const { ipcRenderer } = require('electron');
const Genius = require("genius-lyrics");
const alertMsg = require('../components/ui/alert');

// DOM elements
const button = document.querySelector('.btn');
const song = document.getElementById('song');
const lyrics = document.querySelector('pre');

// query function
const queryLyrics = async () => {
  try {
  	const Client = new Genius.Client();
  	const searches = await Client.songs.search(song.value);
  
  	lyrics.textContent = await searches[0].lyrics() || 'Required fields or Not Found!';
  } catch(err) {
  	lyrics.textContent = err.message;
  }
  song.value = '';
};

// submit
button.addEventListener('click', () => {
  song.value !== ''
  	? queryLyrics()
  	: alertMsg('pls this field is required', 'alert-info');
});

ipcRenderer.on('clear-results', () => {
  lyrics.innerHTML = '';
});
