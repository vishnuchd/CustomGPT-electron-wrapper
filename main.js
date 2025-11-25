const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const crypto = require('crypto');
const customizations = require('./customizations');
const { getLoginScript, isLoginPage, isLoggedIn } = require('./login-automation');

let mainWindow;
const iconPath = path.join(__dirname, 'EasyBotLogo.png');
const packageJson = require('./package.json');
const appId = packageJson.appId || 'com.easybot.chat';

// Set app icon early for better cross-platform support
if (process.platform === 'win32') {
  // Windows: Set app user model ID for proper taskbar icon
  app.setAppUserModelId(appId);
}
let authWindow;
let isProcessingAuth0Callback = false; // Flag to prevent duplicate callback processing
let processedAuth0Codes = new Set(); // Track processed authorization codes

// Auth0 Configuration - Replace with your actual values
const AUTH0_CONFIG = {
  domain: 'dev-s3cdxa60cbla7ci7.us.auth0.com',
  clientId: 't7MlKMsXstfxfKTDXCdmtH0rMYvOXR0L',
  redirectUri: 'https://app.customgpt.ai/login',  // Redirect back to login page
  scope: 'openid profile email',
  organization: 'org_nsUXGi7fc4uSBX2Z'
};

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
    icon: iconPath
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
    if (url.includes('app.customgpt.ai')) {
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

  // Check if on login page with Auth0 callback (code or error)
  if (isLoginPage(url) && (url.includes('code=') || url.includes('error='))) {
    // Prevent duplicate processing
    if (isProcessingAuth0Callback) {
      console.log('[Auth0] Already processing callback, skipping duplicate call');
      return;
    }
    
    console.log('[Auth0] Detected Auth0 callback on login page');
    handleAuth0CallbackOnLoginPage(url);
    return;
  }

  injectCustomUI();
  setTimeout(() => {
    injectCustomUI();
  }, 500);
}

function attemptLogin() {
  const loginScript = getLoginScript();
  mainWindow.webContents.executeJavaScript(loginScript)
    .catch(err => console.error('Login injection error:', err));
}

// Show Auth0 error in UI
async function showAuth0Error(error, errorDescription) {
  const errorScript = `
    (function() {
      // Find the login container
      const container = document.querySelector('.flex.flex-1.flex-col.justify-center.gap-4');
      if (!container) {
        console.error('[Auth0] Could not find login container to show error');
        return;
      }

      // Remove any existing error
      const existingError = document.querySelector('[data-auth0-error]');
      if (existingError) {
        existingError.remove();
      }

      // Format error messages
      const errorTitle = '${error}'.replace(/_/g, ' ').toUpperCase();
      const errorMsg = decodeURIComponent('${errorDescription || ''}').replace(/\\+/g, ' ');

      // Create error box
      const errorBox = document.createElement('div');
      errorBox.setAttribute('data-auth0-error', 'true');
      errorBox.style.cssText = \`
        background-color: #fee;
        border: 2px solid #f44336;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
        box-shadow: 0 2px 8px rgba(244, 67, 54, 0.2);
      \`;

      errorBox.innerHTML = \`
        <div style="display: flex; align-items: start; gap: 12px;">
          <div style="
            background-color: #f44336;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 16px;
            flex-shrink: 0;
          ">!</div>
          <div style="flex: 1;">
            <div style="
              color: #c62828;
              font-weight: 600;
              font-size: 14px;
              margin-bottom: 6px;
              letter-spacing: 0.5px;
            ">\${errorTitle}</div>
            <div style="
              color: #d32f2f;
              font-size: 13px;
              line-height: 1.5;
            ">\${errorMsg || 'Authentication failed. Please try again.'}</div>
          </div>
          <button onclick="this.parentElement.parentElement.remove()" style="
            background: none;
            border: none;
            color: #c62828;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          " title="Dismiss">×</button>
        </div>
      \`;

      // Insert at the top of the container
      container.insertBefore(errorBox, container.firstChild);

      console.log('[Auth0] Error displayed in UI:', errorTitle);

      // Auto-dismiss after 15 seconds
      setTimeout(() => {
        if (errorBox && errorBox.parentElement) {
          errorBox.style.transition = 'opacity 0.5s';
          errorBox.style.opacity = '0';
          setTimeout(() => errorBox.remove(), 500);
        }
      }, 15000);
    })();
  `;

  mainWindow.webContents.executeJavaScript(errorScript)
    .catch(err => console.error('[Auth0] Failed to show error UI:', err));
}

// Handle Auth0 callback when detected on login page
async function handleAuth0CallbackOnLoginPage(url) {
  // Set flag to prevent duplicate processing
  isProcessingAuth0Callback = true;
  
  try {
    const urlObj = new URL(url);
    const code = urlObj.searchParams.get('code');
    const error = urlObj.searchParams.get('error');
    const errorDescription = urlObj.searchParams.get('error_description');

    if (error) {
      console.error('[Auth0] Authentication error:', error, errorDescription);
      // Load clean login page first
      await mainWindow.loadURL('https://app.customgpt.ai/login');
      
      // Wait for page to load, then show error UI
      setTimeout(async () => {
        await showAuth0Error(error, errorDescription);
        // Reset flag after error is shown
        isProcessingAuth0Callback = false;
      }, 1000);
      return;
    }

    if (code) {
      // Check if this code has already been processed
      if (processedAuth0Codes.has(code)) {
        console.log('[Auth0] Code already processed, skipping duplicate exchange');
        isProcessingAuth0Callback = false;
        return;
      }
      
      // Mark this code as being processed
      processedAuth0Codes.add(code);
      console.log('[Auth0] Processing authorization code...');
      // Get the stored verifier from session
      const verifier = await mainWindow.webContents.executeJavaScript('sessionStorage.getItem("auth0_verifier")');
      
      if (!verifier) {
        console.error('[Auth0] No verifier found in session');
        await mainWindow.loadURL('https://app.customgpt.ai/login');
        setTimeout(async () => {
          await showAuth0Error('session_error', 'Authentication session expired. Please try again.');
          isProcessingAuth0Callback = false;
        }, 1000);
        return;
      }

      // Exchange code for tokens
      const tokens = await exchangeCodeForTokens(code, verifier);
      console.log('[Auth0] Successfully obtained tokens');

      // Get user info
      const userInfo = await getUserInfo(tokens.access_token);
      console.log('[Auth0] User authenticated:', userInfo.email || userInfo.name);

      // Store tokens in the page
      await mainWindow.webContents.executeJavaScript(`
        localStorage.setItem('auth0_tokens', '${JSON.stringify(tokens).replace(/'/g, "\\'")}');
        localStorage.setItem('auth0_user', '${JSON.stringify(userInfo).replace(/'/g, "\\'")}');
        sessionStorage.removeItem('auth0_verifier');
        console.log('[Auth0] Tokens stored, starting login automation...');
      `);

      // Clean the URL (remove code parameter)
      await mainWindow.loadURL('https://app.customgpt.ai/login');

      // Wait a bit for page to load, then trigger login automation
      setTimeout(() => {
        console.log('[Auth0] Triggering login automation...');
        attemptLogin();
        // Reset flag after automation is triggered
        isProcessingAuth0Callback = false;
        
        // Clean up old codes (keep only last 10 to prevent memory leak)
        if (processedAuth0Codes.size > 10) {
          const codesArray = Array.from(processedAuth0Codes);
          processedAuth0Codes = new Set(codesArray.slice(-10));
        }
      }, 1000);
    } else {
      // No code or error found, reset flag
      isProcessingAuth0Callback = false;
    }
  } catch (error) {
    console.error('[Auth0] Callback handling error:', error);
    await mainWindow.loadURL('https://app.customgpt.ai/login');
    
    // Show error in UI
    setTimeout(async () => {
      const errorMsg = error.message || 'An unexpected error occurred during authentication.';
      await showAuth0Error('authentication_error', errorMsg);
      // Reset flag after error is shown
      isProcessingAuth0Callback = false;
    }, 1000);
  }
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
  // Set app icon for all platforms
  if (process.platform === 'darwin' && app.dock) {
    // macOS dock icon
    app.dock.setIcon(iconPath);
  } else if (process.platform === 'win32') {
    // Windows taskbar icon (BrowserWindow icon handles this, but we can also set app icon)
    app.setAppUserModelId('com.easybot.chat');
  }
  // Linux: BrowserWindow icon option handles it automatically

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

// ============ Auth0 Implementation ============

// Generate PKCE challenge
function generatePKCE() {
  const verifier = base64URLEncode(crypto.randomBytes(32));
  const challenge = base64URLEncode(crypto.createHash('sha256').update(verifier).digest());
  return { verifier, challenge };
}

function base64URLEncode(buffer) {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Handle Auth0 Login
ipcMain.handle('auth0-login', async () => {
  return new Promise(async (resolve, reject) => {
    const { verifier, challenge } = generatePKCE();
    
    // Store verifier in main window's sessionStorage for later use
    await mainWindow.webContents.executeJavaScript(`
      sessionStorage.setItem('auth0_verifier', '${verifier}');
      console.log('[Auth0] Verifier stored in session');
    `);
    
    // Build Auth0 authorization URL
    const authUrl = `https://${AUTH0_CONFIG.domain}/authorize?` + new URLSearchParams({
      response_type: 'code',
      code_challenge: challenge,
      code_challenge_method: 'S256',
      client_id: AUTH0_CONFIG.clientId,
      redirect_uri: AUTH0_CONFIG.redirectUri,
      scope: AUTH0_CONFIG.scope,
      ...(AUTH0_CONFIG.audience && { audience: AUTH0_CONFIG.audience }),
      ...(AUTH0_CONFIG.organization && { organization: AUTH0_CONFIG.organization })
    }).toString();

    console.log('[Auth0] Opening auth window...');

    // Create auth window
    authWindow = new BrowserWindow({
      width: 500,
      height: 700,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      },
      parent: mainWindow,
      modal: true,
      show: false
    });

    authWindow.loadURL(authUrl);

    authWindow.once('ready-to-show', () => {
      authWindow.show();
    });

    // Listen for redirect to CustomGPT login page
    authWindow.webContents.on('will-redirect', async (event, url) => {
      if (url.startsWith(AUTH0_CONFIG.redirectUri)) {
        console.log('[Auth0] Detected redirect to login page');
        // Close auth window and let main window handle the callback
        authWindow.close();
        authWindow = null;
        // Load the callback URL in main window
        mainWindow.loadURL(url);
        resolve({ success: true, message: 'Redirecting to login page...' });
      }
    });

    authWindow.webContents.on('did-navigate', async (event, url) => {
      if (url.startsWith(AUTH0_CONFIG.redirectUri)) {
        console.log('[Auth0] Navigated to login page');
        // Close auth window and let main window handle the callback
        authWindow.close();
        authWindow = null;
        // Load the callback URL in main window
        mainWindow.loadURL(url);
        resolve({ success: true, message: 'Redirecting to login page...' });
      }
    });

    authWindow.on('closed', () => {
      if (authWindow) {
        authWindow = null;
        reject(new Error('Auth window closed by user'));
      }
    });
  });
});

// Helper function to get user info from Auth0
async function getUserInfo(accessToken) {
  const userInfoUrl = `https://${AUTH0_CONFIG.domain}/userinfo`;
  
  const response = await fetch(userInfoUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get user info');
  }

  return await response.json();
}

async function exchangeCodeForTokens(code, verifier) {
  const tokenUrl = `https://${AUTH0_CONFIG.domain}/oauth/token`;
  
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: AUTH0_CONFIG.clientId,
      code_verifier: verifier,
      code: code,
      redirect_uri: AUTH0_CONFIG.redirectUri
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }
  
  return await response.json();
}

// Get user info from Auth0 (IPC handler for renderer process)
ipcMain.handle('auth0-get-user', async (event, accessToken) => {
  return await getUserInfo(accessToken);
});

