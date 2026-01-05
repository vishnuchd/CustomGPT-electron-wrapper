// Load environment variables from .env file
require('dotenv').config();

const { app, BrowserWindow, ipcMain, session, Menu } = require("electron");
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const customizations = require('./customizations');

let mainWindow;
const iconPath = path.join(__dirname, 'EasyBotLogo.png');
const packageJson = require('./package.json');
const appId = packageJson.appId || 'com.easybot.chat';
const CUSTOMGPT_PARTITION = 'persist:customgpt';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "https://xkctcnyoweffopdytiwt.supabase.co";
const supabaseKey = process.env.SUPABASE_SECRET_KEY || "sb_secret_1Q3-GhNuwkF3iRoWcapRnA_SyPzCcDO";


if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL and SUPABASE_SECRET_KEY must be set in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Set app icon early for better cross-platform support
if (process.platform === 'win32') {
  // Windows: Set app user model ID for proper taskbar icon
  app.setAppUserModelId(appId);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    title: 'EasyBotChat',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      devTools: isDev,
      partition: CUSTOMGPT_PARTITION,
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
      // Set title immediately when loading starts
      mainWindow.setTitle('EasyBotChat');

      // Inject CSS early, even before page fully loads
      if (customizations.css.trim()) {
        mainWindow.webContents.insertCSS(customizations.css);
      }
    }
  });

  // Inject loading overlay as soon as DOM is ready (before full page load)
  mainWindow.webContents.on('dom-ready', () => {
    const url = mainWindow.webContents.getURL();
    if (url.includes('app.customgpt.ai') && url.includes('/login')) {
      mainWindow.webContents.executeJavaScript(`
        if (!document.getElementById('__easybot_loading__')) {
          document.body.classList.add('easybot-loading');
          const overlay = document.createElement('div');
          overlay.id = '__easybot_loading__';
          overlay.innerHTML = '<div class="spinner"></div>';
          document.body.prepend(overlay);
        }
      `).catch(() => { });
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

  // Prevent title changes from the web page
  mainWindow.webContents.on('page-title-updated', (event) => {
    // Prevent the default title update
    event.preventDefault();
    // Force our custom title
    mainWindow.setTitle('EasyBotChat');
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

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Clear session data when app is closing
app.on('before-quit', async () => {
  await clearWebviewSession();
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

// ============ Supabase CRUD Operations ============

// Get all prompt cards
ipcMain.handle('supabase-get-prompt-cards', async (event, options = {}) => {
  try {
    const { page = 1, limit = 10, project_id } = options;
    const offset = (page - 1) * limit;

    console.log('[API] Getting prompt cards - page:', page, 'limit:', limit, 'offset:', offset, 'project_id:', project_id);

    // If project_id is provided, find the actual project database ID
    let projectDatabaseId = null;
    if (project_id) {
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('id')
        .eq('customgpt_project_id', project_id)
        .single();

      if (projectError || !projectData) {
        console.error('Project not found for customgpt_project_id:', project_id, projectError);
        return { success: false, error: 'Project not found. Please ensure the project exists.' };
      }
      projectDatabaseId = projectData.id;
    }

    // First get total count (filtered by project if provided)
    let countQuery = supabase.from('prompt_cards').select('*', { count: 'exact', head: true });
    if (projectDatabaseId) {
      countQuery = countQuery.eq('project_id', projectDatabaseId);
    }
    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error('Error counting prompt cards:', countError);
      return { success: false, error: countError.message };
    }

    console.log('[API] Total count:', count);

    // Then get paginated data (filtered by project if provided)
    let dataQuery = supabase
      .from('prompt_cards')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('id', { ascending: true }) // Secondary sort by id for consistency
      .range(offset, offset + limit - 1);

    if (projectDatabaseId) {
      dataQuery = dataQuery.eq('project_id', projectDatabaseId);
    }

    const { data, error } = await dataQuery;

    if (error) {
      console.error('Error fetching prompt cards:', error);
      return { success: false, error: error.message };
    }

    const totalPages = Math.ceil(count / limit);
    console.log('[API] Returning data:', data, 'pagination:', {
      page,
      limit,
      total: count,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    });

    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  } catch (error) {
    console.error('Error in supabase-get-prompt-cards:', error);
    return { success: false, error: error.message };
  }
});

// Create a new prompt card
ipcMain.handle('supabase-create-prompt-card', async (event, promptCardData) => {
  try {
    // First, find the project by customgpt_project_id
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('customgpt_project_id', promptCardData.project_id)
      .single();

    if (projectError || !projectData) {
      console.error('Project not found for customgpt_project_id:', promptCardData.project_id, projectError);
      return { success: false, error: 'Project not found. Please ensure the project exists.' };
    }

    // Find the highest sort_order for this project to assign the next available number
    const { data: maxSortOrderData, error: sortOrderError } = await supabase
      .from('prompt_cards')
      .select('sort_order')
      .eq('project_id', projectData.id)
      .order('sort_order', { ascending: false })
      .limit(1);

    let nextSortOrder = 1; // Default to 1 if no records exist
    if (!sortOrderError && maxSortOrderData && maxSortOrderData.length > 0) {
      nextSortOrder = maxSortOrderData[0].sort_order + 1;
    }

    // Use the actual project ID from the database and auto-assign sort order
    const cardData = {
      ...promptCardData,
      project_id: projectData.id,
      sort_order: nextSortOrder
    };

    const { data, error } = await supabase
      .from('prompt_cards')
      .insert([cardData])
      .select()
      .single();

    if (error) {
      console.error('Error creating prompt card:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in supabase-create-prompt-card:', error);
    return { success: false, error: error.message };
  }
});

// Update a prompt card
ipcMain.handle('supabase-update-prompt-card', async (event, { id, updates }) => {
  try {
    const { data, error } = await supabase
      .from('prompt_cards')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating prompt card:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in supabase-update-prompt-card:', error);
    return { success: false, error: error.message };
  }
});

// Delete a prompt card
ipcMain.handle('supabase-delete-prompt-card', async (event, id) => {
  try {
    const { error } = await supabase
      .from('prompt_cards')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting prompt card:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in supabase-delete-prompt-card:', error);
    return { success: false, error: error.message };
  }
});

// ============ SendGrid Email Implementation ============

// Handle sending Website request email
ipcMain.handle('send-website-email', async (event, { projectId, formData }) => {
  try {
    const apiKey = process.env.SENDGRID_API_KEY || "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";

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
    const apiKey = process.env.SENDGRID_API_KEY || "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";

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

// ============ Unsplash API Integration ============

// Search Unsplash images
ipcMain.handle('unsplash-search-images', async (event, { query, page = 1, perPage = 20 }) => {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY || "jMtmQePpjo9bQinznW-SGvkkvcoMV3WsqTVmqy5jzIw";

    if (!accessKey) {
      console.error('[Unsplash] Access key not found in environment variables');
      return { success: false, error: 'Unsplash access key not configured' };
    }

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${accessKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error('[Unsplash] API request failed:', response.status, response.statusText);
      return { success: false, error: `Unsplash API error: ${response.status}` };
    }

    const data = await response.json();

    return {
      success: true,
      data: {
        results: data.results,
        total: data.total,
        total_pages: data.total_pages
      }
    };
  } catch (error) {
    console.error('[Unsplash] Error searching images:', error);
    return { success: false, error: error.message };
  }
});

// Get random Unsplash images
ipcMain.handle('unsplash-random-images', async (event, { count = 20 }) => {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY || "jMtmQePpjo9bQinznW-SGvkkvcoMV3WsqTVmqy5jzIw";

    if (!accessKey) {
      console.error('[Unsplash] Access key not found in environment variables');
      return { success: false, error: 'Unsplash access key not configured' };
    }

    const url = `https://api.unsplash.com/photos/random?count=${count}&client_id=${accessKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error('[Unsplash] API request failed:', response.status, response.statusText);
      return { success: false, error: `Unsplash API error: ${response.status}` };
    }

    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    console.error('[Unsplash] Error getting random images:', error);
    return { success: false, error: error.message };
  }
});


async function clearWebviewSession() {
  const s = session.fromPartition('persist:customgpt');

  await s.cookies.remove('https://trial-2230464.okta.com', 'sid');
  await s.cookies.remove('https://trial-2230464.okta.com', 'JSESSIONID');

  await s.clearStorageData({
    origin: 'https://trial-2230464.okta.com',
    storages: ['cookies', 'localstorage', 'sessionstorage'],
  });

  await s.clearStorageData({
    origin: 'https://app.customgpt.ai',
    storages: ['cookies', 'localstorage', 'sessionstorage'],
  });
}

ipcMain.handle('full-logout', async () => {
  await clearWebviewSession();
});
