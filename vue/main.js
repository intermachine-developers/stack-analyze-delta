// modules
const { join } = require('path');
const { app, BrowserWindow, Menu, dialog } = require('electron');

const isMac = process.platform === 'darwin';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: join(__dirname, 'icon.png')
  });

  function licenseWindow() {
    const license = new BrowserWindow({
      parent: mainWindow,
      width: 800,
      height: 600,
      minWidth: 800,
      minHeight: 600,
      icon: join(__dirname, 'icon.png'),
      title: 'stack-analyze delta license',
      modal: true,
      show: false
    });
    license.setMenuBarVisibility(false);
    license.loadFile(join(__dirname, 'license.txt'));
    license.once('ready-to-show', () => license.show());
  }


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
              delta tools: 
                lyrics finder 
                cdn services
            `,
              message: 'developers and design: omega5300'
            });
          }
        },
        {
          label: 'show license',
          click() {
            licenseWindow();
          }
        },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    }
  ];

  mainWindow.loadFile(join(__dirname, 'app/index.html'));

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

/* This method will be called when Electron has finished
initialization and is ready to create browser windows.
Some APIs can only be used after this event occurs. */
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    /* On macOS it's common to re-create a window in the app when the
    dock icon is clicked and there are no other windows open. */
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

/* Quit when all windows are closed, except on macOS. There, it's common
for applications and their menu bar to stay active until the user quits
explicitly with Cmd + Q. */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
