// Load environment variables from .env file
require('dotenv').config();

const { app, BrowserWindow, ipcMain, session, Menu } = require("electron");
const path = require('path');
const customizations = require('./customizations');

let mainWindow;
const iconPath = path.join(__dirname, 'EasyBotLogo.png');
const packageJson = require('./package.json');
const appId = packageJson.appId || 'com.easybot.chat';

// Set app icon early for better cross-platform support
if (process.platform === 'win32') {
  // Windows: Set app user model ID for proper taskbar icon
  app.setAppUserModelId(appId);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      devTools: isDev,
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

  mainWindow.webContents.on('before-input-event', (event, input) => {
    const blocked =
      input.control && input.key.toLowerCase() === 'r' ||
      input.control && input.shift && input.key.toLowerCase() === 'r' ||
      input.control && input.shift && input.key.toLowerCase() === 'i';
  
    if (blocked) {
      event.preventDefault();
    }
  });

  mainWindow.webContents.on("did-navigate", () => {
    handlePageLoad();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function handlePageLoad() {
  injectCustomUI();
  setTimeout(() => {
    injectCustomUI();
  }, 500);
}

function injectCustomUI() {
  // Inject custom CSS from customizations.js
  if (customizations.css.trim()) {
    mainWindow.webContents.insertCSS(customizations.css);
  }

  // Inject custom JavaScript from customizations.js
  if (customizations.js.trim()) {
    mainWindow.webContents
      .executeJavaScript(customizations.js)
      .catch((err) => console.error("UI injection error:", err));
  }
}

const isDev = !app.isPackaged; // true only in dev mode

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: isDev
        ? [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { role: 'togglefullscreen' }
          ]
        : [
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { role: 'togglefullscreen' }
          ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { role: 'close' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  // Set app icon for all platforms
  if (process.platform === 'darwin' && app.dock) {
    // macOS dock icon
    app.dock.setIcon(iconPath);
  } else if (process.platform === 'win32') {
    // Windows taskbar icon (BrowserWindow icon handles this, but we can also set app icon)
    app.setAppUserModelId("com.easybot.chat");
  }

  createMenu();

  const filter = { urls: ['https://app.customgpt.ai/*'] };
  session.defaultSession.webRequest.onBeforeRequest(
    filter,
    (details, callback) => {
      const url = details.url;
      try {
        const parsed = new URL(url);
        if (
          parsed.pathname.includes("/login")
        ) {
          const redirectURL = "https://trial-2230464.okta.com/";
          console.log(
            "Redirecting login -> okta login:",
            redirectURL
          );
          return callback({ redirectURL });
        }
      } catch (e) {
        // If URL parsing fails, just continue normally
      }
      callback({});
    }
  );

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

// ============ SendGrid Email Implementation ============

// Handle sending Website request email
ipcMain.handle('send-website-email', async (event, { projectId, formData }) => {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;
    
    if (!apiKey) {
      console.error('[SendGrid] API key not found in environment variables');
      return { success: false, error: 'SendGrid API key not configured' };
    }

    const recipientEmail = `system+${projectId}@easybot.chat`;
    const senderEmail = 'systems@app.easybot.chat';
    const subject = `Website request - ${projectId}`;

    // Format form data for email
    const scheduleText = formData.schedule === 'custom' && formData.customSchedule
      ? `Custom (${formData.customSchedule.days.join(', ')} at ${formData.customSchedule.time.hour}:${String(formData.customSchedule.time.minute).padStart(2, '0')})`
      : formData.schedule.charAt(0).toUpperCase() + formData.schedule.slice(1);

    // Log email details
    console.log('[SendGrid] ========== WEBSITE EMAIL DETAILS ==========');
    console.log('[SendGrid] From:', senderEmail);
    console.log('[SendGrid] To:', recipientEmail);
    console.log('[SendGrid] Subject:', subject);
    console.log('[SendGrid] Form Data:', JSON.stringify(formData, null, 2));
    console.log('[SendGrid] ============================================');

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: recipientEmail }]
        }],
        from: {
          email: senderEmail,
          name: 'EasyBotChat'
        },
        subject: subject,
        content: [{
          type: 'text/plain',
          value: `Website Request Details:\n\nWebsite URL: ${formData.websiteUrl}\nCrawl Entire Site: ${formData.crawlEntireSite ? 'Yes' : 'No'}\nLogin Required: ${formData.loginRequired ? 'Yes' : 'No'}\nRefresh Schedule: ${scheduleText}\n\nProject ID: ${projectId}`
        }, {
          type: 'text/html',
          value: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Website Request</h2>
              <div style="margin-top: 20px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: 600; color: #666;">Website URL</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #333;">${formData.websiteUrl}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: 600; color: #666;">Crawl Entire Site</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #333;">${formData.crawlEntireSite ? '✅ Yes' : '❌ No'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: 600; color: #666;">Login Required</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #ddd; color: #333;">${formData.loginRequired ? '✅ Yes' : '❌ No'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-weight: 600; color: #666;">Refresh Schedule</td>
                    <td style="padding: 10px 0; color: #333;">${scheduleText}</td>
                  </tr>
                </table>
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #999;">
                Project ID: ${projectId}<br>
                This is an automated message from EasyBotChat.
              </p>
            </div>
          `
        }]
      })
    });

    if (response.ok || response.status === 202) {
      console.log('[SendGrid] Website email sent successfully for project:', projectId);
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error('[SendGrid] Failed to send website email:', response.status, errorText);
      return { success: false, error: `SendGrid error: ${response.status}` };
    }
  } catch (error) {
    console.error('[SendGrid] Error sending website email:', error);
    return { success: false, error: error.message };
  }
});

// Handle sending SharePoint access request email
ipcMain.handle('send-sharepoint-email', async (event, { projectId }) => {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;
    
    if (!apiKey) {
      console.error('[SendGrid] API key not found in environment variables');
      return { success: false, error: 'SendGrid API key not configured' };
    }

    const recipientEmail = `system+${projectId}@easybot.chat`;
    const senderEmail = 'systems@app.easybot.chat';
    const subject = `SharePoint Access Request - Project ${projectId}`;
    const emailBody = `Please create a Guest Account for "${recipientEmail}" with access to the folders/files you would like to add.`;

    // Log email details
    console.log('[SendGrid] ========== SHAREPOINT EMAIL DETAILS ==========');
    console.log('[SendGrid] From:', senderEmail);
    console.log('[SendGrid] To:', recipientEmail);
    console.log('[SendGrid] Subject:', subject);
    console.log('[SendGrid] Body:', emailBody);
    console.log('[SendGrid] ==============================================');

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: recipientEmail }]
        }],
        from: {
          email: senderEmail,
          name: 'EasyBotChat'
        },
        subject: subject,
        content: [{
          type: 'text/plain',
          value: emailBody
        }, {
          type: 'text/html',
          value: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">SharePoint Access Request</h2>
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                ${emailBody}
              </p>
              <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px; color: #666;">
                  <strong>Guest Email:</strong> ${recipientEmail}
                </p>
                <p style="margin: 8px 0 0; font-size: 14px; color: #666;">
                  <strong>Project ID:</strong> ${projectId}
                </p>
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #999;">
                This is an automated message from EasyBotChat.
              </p>
            </div>
          `
        }]
      })
    });

    if (response.ok || response.status === 202) {
      console.log('[SendGrid] Email sent successfully for project:', projectId);
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error('[SendGrid] Failed to send email:', response.status, errorText);
      return { success: false, error: `SendGrid error: ${response.status}` };
    }
  } catch (error) {
    console.error('[SendGrid] Error sending email:', error);
    return { success: false, error: error.message };
  }
});
