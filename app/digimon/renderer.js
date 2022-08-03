// ajax module
const axios = require('axios');
const { ipcRenderer } = require('electron');

// alert module
const alertMsg = require('../components/ui/alert');

// DOM elements
const digimonForm = document.getElementById('digimon-form');
const digimonInput = document.getElementById('digimon-input');
const digimonList = document.getElementById('digimon-list');

// card list function
const searchCard = async name => {
  digimonList.innerHTML = '';
  try {
    const { data } = await axios.get('https://digimoncard.io/api-public/search.php', {
      params: {
        n: name,
        sort: 'name'
      }
    });

    data.forEach(card => {
      const cardImage = document.createElement('img');
      cardImage.src = card.image_url;
      cardImage.alt = card.name;
      cardImage.classList.add('card');

      digimonList.append(cardImage);
    });
  } catch (err) {
    alertMsg(err.message, 'alert-danger');
  }
};

// submit
digimonForm.addEventListener('submit', e => {
  e.preventDefault();

  digimonInput.value !== '' 
    ? searchCard(digimonInput.value) 
    : alertMsg('pls this files is required', 'alert-info');

  digimonForm.reset();
});

ipcRenderer.on('clear-results', () => {
  digimonList.innerHTML = '';
});
