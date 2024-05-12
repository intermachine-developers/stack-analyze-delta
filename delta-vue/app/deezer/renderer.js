// modules
const { ipcRenderer } = require('electron');
const axios = require('axios');
const alertMsg = require('../components/ui/alert');

// component
require('../components/ui/albumInfo')

// DOM elements
const deezerQuery = document.querySelector('#query');
const btn = document.querySelector('#btn');
const deezerAlbums = document.querySelector('#albums');

// methods
const getDeezerAlbums = async () => {
	deezerAlbums.innerHTML = '';
	
	try {
		const { data } = await axios.get('https://api.deezer.com/search/album', {
			params: { q: deezerQuery.value }
		});
		
		data.data.forEach(album => {
			const lyricsType = album.explicit_lyrics 
				? 'explicit content' 
				: 'clean content';
			
			const card = document.createElement('album-info');
			card.img = album.cover_xl;
			card.name = album.title;
			card.type = album.record_type;
			card.artist = album.artist.name;
			card.content = lyricsType;
			
			deezerAlbums.append(card);
		});
	} catch(err) {
		alertMsg(err.message, 'alert-danger');
	}
	
	deezerQuery.value = '';
};

// event click
btn.addEventListener('click', () => {
  deezerQuery.value !== ''
    ? getDeezerAlbums() 
    : alertMsg('this field is required', 'alert-info');
});

ipcRenderer.on('clear-results', () => {
  deezerAlbums.innerHTML = '';
});
