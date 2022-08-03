// electon method
const { ipcRenderer } = require('electron');
const alertMsg = require('../components/ui/alert');

// DOM elements
const passwordItem = document.getElementById('pass');
const btnGenerator = document.getElementById('generate');
const btnCopy = document.getElementById('copy');

// click events
btnGenerator.addEventListener('click', () => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let password = "";

  for (let i = 0; i <= 12; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  passwordItem.textContent = password;
});

btnCopy.addEventListener('click', async () => {
  const copyItem = navigator.clipboard;

  if (passwordItem.textContent === '') {
    alertMsg('password is empty please generate password?', 'alert-danger');
  } else {
    await copyItem.writeText(passwordItem.textContent);
    alertMsg('Copied', 'alert-info');
  }
});

ipcRenderer.on('clear-results', () => {
  passwordItem.textContent = '';
});
