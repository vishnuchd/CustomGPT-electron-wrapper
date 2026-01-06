const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // SendGrid email
  sendWebsiteEmail: (data) => ipcRenderer.invoke('send-website-email', data),
  sendSharepointEmail: (data) => ipcRenderer.invoke('send-sharepoint-email', data),
  fullLogout: () => ipcRenderer.invoke('full-logout'),
  // Supabase CRUD operations
  getBotName: (projectId) => ipcRenderer.invoke('supabase-get-bot-name', projectId),
  getPromptCards: (options) => ipcRenderer.invoke('supabase-get-prompt-cards', options),
  createPromptCard: (data) => ipcRenderer.invoke('supabase-create-prompt-card', data),
  updatePromptCard: (id, updates) => ipcRenderer.invoke('supabase-update-prompt-card', { id, updates }),
  deletePromptCard: (id) => ipcRenderer.invoke('supabase-delete-prompt-card', id),
  // Unsplash API operations
  searchUnsplashImages: (params) => ipcRenderer.invoke('unsplash-search-images', params),
  getRandomUnsplashImages: (params) => ipcRenderer.invoke('unsplash-random-images', params)
});
