// By specifying that additional preload property,
// “preload.js” will execute before creating
// the app window, so we’ll be able to access ipcRenderer
// through the global window variable in App.js
const { ipcRenderer } = require('electron');
window.ipcRenderer = ipcRenderer;
