const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  injectCSS: (css) => ipcRenderer.invoke('inject-css', css),
  executeJS: (code) => ipcRenderer.invoke('execute-js', code),
  reloadCustomizations: () => ipcRenderer.invoke('reload-customizations'),
  // Auth0 methods
  auth0Login: () => ipcRenderer.invoke('auth0-login'),
  // SendGrid email
  sendWebsiteEmail: (data) => ipcRenderer.invoke('send-website-email', data),
  sendSharepointEmail: (data) => ipcRenderer.invoke('send-sharepoint-email', data)
});

