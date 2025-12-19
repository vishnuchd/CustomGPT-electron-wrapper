const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  injectCSS: (css) => ipcRenderer.invoke('inject-css', css),
  executeJS: (code) => ipcRenderer.invoke('execute-js', code),
  reloadCustomizations: () => ipcRenderer.invoke('reload-customizations'),
  // SendGrid email
  sendWebsiteEmail: (data) => ipcRenderer.invoke('send-website-email', data),
  sendSharepointEmail: (data) => ipcRenderer.invoke('send-sharepoint-email', data),
  fullLogout: () => ipcRenderer.invoke('full-logout')
});
