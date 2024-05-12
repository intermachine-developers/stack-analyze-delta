// modules
const { join } = require('node:path');
const { app, BrowserWindow, Menu, dialog } = require('electron');

const isMac = process.platform === 'darwin';

app.disableHardwareAcceleration()

function createWindow() {
  // app window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: join(__dirname, './app/preload.js')
    },
    icon: join(__dirname, '../icon.png')
  });

  mainWindow.loadFile('./app/home/index.html');
  
  mainWindow.once('ready-to-show', () => mainWindow.show());

	// license window
  const licenseWindow = () => {
    const license = new BrowserWindow({
      parent: mainWindow,
      width: 800,
      height: 600,
      minWidth: 800,
      minHeight: 600,
      icon: join(__dirname, '../icon.png'),
      title: 'stack-analyze delta license',
      modal: true,
      show: false
    });

    license.setMenuBarVisibility(false);
    license.loadFile(join(__dirname, './license.txt'));
    license.once('ready-to-show', () => license.show());
  };

  const template = [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'about',
          accelerator: 'F1',
          click() {
            dialog.showMessageBoxSync({
              icon: join(__dirname, 'icon.png'),
              type: 'info',
              buttons: ['OK'],
              title: app.name,
              detail: `
              stack-analyze tools: 
                tech stack from npm version 1.0.4 - 1.0.5 
                hardware informatio from npm version 1.1.0 
                password generator from npm version 1.2.0 
              delta tools: 
                lyrics finder 
                cdn services
                digimon cards services
            `,
              message: 'developers and design: omega5300'
            });
          }
        },
        {
          label: 'clear results / show extra',
          accelerator: process.platform === 'darwin' ? 'Comand+D' : 'Ctrl+D',
          click() {
            mainWindow.webContents.send('clear-results');
          }
        },
        {
          label: 'show license',
          accelerator: process.platform === 'darwin' ? 'Comand+L' : 'Ctrl+L',
          click() {
            licenseWindow();
          }
        },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) { createWindow(); }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit(); }
});
