// delta card component
require('../components/ui/deltaCard');

// module
const { ipcRenderer } = require('electron');
const Wappalyzer = require('wappalyzer');

// toast
const alertMsg = require('../components/ui/alert');

// DOM Elements
const techForm = document.getElementById('tech');
const website = document.getElementById('website');
const button = document.getElementById('btn');
const stackList = document.getElementById('stack');

// list format
const formatter = new Intl.ListFormat('en', { style: 'short', type: 'unit' });

// analyze stack
const techStack = async url => {
  const wappalyzer = new Wappalyzer();

  try {
    await wappalyzer.init();
    const { technologies } = await wappalyzer.open(url).analyze();

    technologies.forEach(tech => {
      // create categories array
      const categories = tech.categories.map(({ name }) => name);
      
      // create web component
      const card = document.createElement('delta-card');

      card.cardTitle = tech.name;
      card.image = `../logos/${tech.icon}`;
      card.alt = tech.name;
      card.link = tech.website;
      card.categories = formatter.format(categories);

      stackList.append(card);
    });
  } catch (err) {
    alertMsg(err.message, 'alert-danger');
  }
  
  await wappalyzer.destroy();
};

website.addEventListener('keyup', () => {
  button.disabled = !website.validity.valid;
});

// submit
techForm.addEventListener('submit', e => {
  // start
  stackList.innerHTML = '';
  techStack(website.value);
  
  // disabled button
  button.disabled = true;
  
  // finish and reset form
  e.preventDefault();
  techForm.reset();
});

ipcRenderer.on('clear-results', () => {
  stackList.innerHTML = '';
});
