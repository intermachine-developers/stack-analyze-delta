// components
require('../components/hardware/cpuInfo');
require('../components/hardware/diskInfo');
require('../components/hardware/displayInfo');
require('../components/hardware/graphicsInfo');
require('../components/hardware/osDetail');
require('../components/hardware/ramInfo');
require('../components/hardware/boardInfo');
require('../components/hardware/biosInfo');

// module
const { ipcRenderer } = require('electron');

if (module.hot) {
   module.hot.accept();
}
// modal element
const modal = document.querySelector('dialog');
const example = document.querySelector('button');

ipcRenderer.on('clear-results', () => {
  !modal.open
    ? modal.showModal()
    : modal.close();
});
