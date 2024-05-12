// module
const { ipcRenderer } = require('electron');
const axios = require('axios');
const alertMsg = require('../components/ui/alert');

if (module.hot) {
   module.hot.accept();
}

// DOM element
const techList = document.getElementById('tech-list');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-tech');

// init ajax function
const libraryList = async () => {
  // clear before results
  techList.innerHTML = '';
  
  try {
    const { data } = await axios.get('https://api.cdnjs.com/libraries', {
      params: { 
        search: searchInput.value,
        fields: 'version' 
      }
    });

    data.results.forEach((library, i) => {
      
      // copy link button
      const linkButton = document.createElement('button');
      linkButton.classList.add('btn-copy');
      linkButton.textContent = '📋';
      
      // click event
      linkButton.addEventListener('click', async () => {
        await navigator.clipboard.writeText(library.latest);
        alertMsg('Copied', 'alert-info');
      });
      
      // row and field elements
      const techRow = document.createElement('tr');
      
      const numberField = document.createElement('td');
      numberField.textContent = i + 1;
      
      const nameField = document.createElement('td');
      nameField.textContent = library.name;
      
      const versionField = document.createElement('td');
      versionField.textContent = library.version;
      
      const copyLinkField = document.createElement('td');
      copyLinkField.classList.add('btn-container');
      copyLinkField.appendChild(linkButton);

      // append fields
      techRow.append(numberField, nameField, versionField, copyLinkField);

      techList.append(techRow);
    });
  } catch(err) {
    alertMsg(err.message, 'alert-danger');
  }
};

// event key
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  
  searchInput.value !== ''
    ? libraryList() 
    : alertMsg('this field is required', 'alert-info');
  
  searchForm.reset();
});

ipcRenderer.on('clear-results', () => {
  techList.innerHTML = '';
});

