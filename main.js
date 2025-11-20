const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const customizations = require('./customizations');
const { getLoginScript, isLoginPage, isLoggedIn } = require('./login-automation');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    },
    icon: path.join(__dirname, 'icon.png') // Optional: add icon later
  });

  // Load CustomGPT
  mainWindow.loadURL('https://app.customgpt.ai/');

  // Open DevTools in dev mode
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  // Handle navigation - inject CSS early for faster application
  mainWindow.webContents.on('did-start-loading', () => {
    const url = mainWindow.webContents.getURL();
    if (isLoggedIn(url) || url.includes('app.customgpt.ai')) {
      // Inject CSS early, even before page fully loads
      if (customizations.css.trim()) {
        mainWindow.webContents.insertCSS(customizations.css);
      }
    }
  });

  mainWindow.webContents.on('did-finish-load', () => {
    handlePageLoad();
  });

  mainWindow.webContents.on('did-navigate', () => {
    handlePageLoad();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function handlePageLoad() {
  const url = mainWindow.webContents.getURL();

  // Inject login automation if on login page
  if (isLoginPage(url)) {
    // Inject immediately and also after a short delay for dynamic content
    attemptLogin();
    setTimeout(() => {
      attemptLogin();
    }, 500);
  }

  // Inject custom UI modifications after login (immediately and on DOM changes)
  if (isLoggedIn(url)) {
    injectCustomUI();
    // Also inject after short delay for any late-loading elements
    setTimeout(() => {
      injectCustomUI();
    }, 500);
  }
}

function attemptLogin() {
  const loginScript = getLoginScript();
  mainWindow.webContents.executeJavaScript(loginScript)
    .catch(err => console.error('Login injection error:', err));
}

function injectCustomUI() {
  // Inject custom CSS from customizations.js
  if (customizations.css.trim()) {
    mainWindow.webContents.insertCSS(customizations.css);
  }

  // Inject custom JavaScript from customizations.js
  if (customizations.js.trim()) {
    mainWindow.webContents.executeJavaScript(customizations.js).catch(err => console.error('UI injection error:', err));
  }
}

app.whenReady().then(() => {
  // Redirect /projects/{id}/build/sources to /projects/{id}/build/documents
  const filter = { urls: ['https://app.customgpt.ai/*'] };
  session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    const url = details.url;
    try {
      const parsed = new URL(url);
      if (parsed.pathname.includes('/projects/') && parsed.pathname.endsWith('/build/sources')) {
        const redirectPath = parsed.pathname.replace('/build/sources', '/build/documents');
        const redirectURL = `${parsed.origin}${redirectPath}${parsed.search}${parsed.hash}`;
        console.log('Redirecting build/sources -> build/documents:', redirectURL);
        return callback({ redirectURL });
      }
    } catch (e) {
      // If URL parsing fails, just continue normally
    }
    callback({});
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for communication between main and renderer
ipcMain.handle('inject-css', (event, css) => {
  if (mainWindow) {
    mainWindow.webContents.insertCSS(css);
  }
});

ipcMain.handle('execute-js', (event, code) => {
  if (mainWindow) {
    return mainWindow.webContents.executeJavaScript(code);
  }
});

ipcMain.handle('reload-customizations', () => {
  if (mainWindow) {
    injectCustomUI();
  }
});

