# Auth0 Configuration Guide

## 1. Get Your Auth0 Credentials

### From Auth0 Dashboard:
1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Navigate to **Applications** → **Applications**
3. Select your application (or create a new one if needed)
4. You'll need:
   - **Domain** (e.g., `myapp.us.auth0.com`)
   - **Client ID** (long alphanumeric string)

## 2. Configure Your Auth0 Application

### Application Type:
- Select **Native** (for Electron/Desktop apps)

### Allowed Callback URLs:
Add this URL:
```
https://app.customgpt.ai/login
```

### Allowed Logout URLs:
Add this URL (optional):
```
https://app.customgpt.ai/login
```

### Allowed Web Origins:
Add this URL:
```
https://app.customgpt.ai
```

### Advanced Settings → Grant Types:
Make sure these are enabled:
- ✅ Authorization Code
- ✅ Refresh Token (optional, for long-lived sessions)

## 3. Update Your Code

Open `main.js` and update the `AUTH0_CONFIG` object (around line 8-14):

```javascript
const AUTH0_CONFIG = {
  domain: 'YOUR_DOMAIN.auth0.com',        // Replace with your Auth0 domain
  clientId: 'YOUR_CLIENT_ID',             // Replace with your Client ID
  redirectUri: 'https://app.customgpt.ai/login',
  audience: '',                           // Optional: Add if you have an API
  scope: 'openid profile email',
  organization: 'YOUR_ORG_ID'             // Required if using Auth0 Organizations
};
```

### Example:
```javascript
const AUTH0_CONFIG = {
  domain: 'myapp.us.auth0.com',
  clientId: 'Abc123XyZ789DefGhi456JklMno',
  redirectUri: 'https://app.customgpt.ai/login',
  audience: '',
  scope: 'openid profile email',
  organization: 'org_abc123'              // Or your organization name
};
```

### How to Find Your Organization ID:

If you get an error saying "parameter organization is required", follow these steps:

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Navigate to **Organizations** in the left sidebar
3. Click on your organization
4. You'll see the **Organization ID** (starts with `org_`) or **Organization Name**
5. You can use either:
   - The Organization ID: `org_abc123def456`
   - Or the Organization Name (slug): `my-company`

## 4. Test the Integration

1. Save all files
2. Restart your Electron app:
   ```bash
   npm start
   ```
3. Navigate to the login page
4. Click the **Auth0 Login** button
5. A popup window should open with Auth0 login options:
   - Google Sign-In (since you have it configured)
   - Email/Password (your database connection)

## 5. What Happens After Login

After successful Auth0 authentication:
1. **Tokens are stored** in `localStorage`:
   - `auth0_tokens`: Contains `access_token`, `id_token`, `refresh_token`
   - `auth0_user`: Contains user profile (name, email, picture, etc.)
2. **Console logs** will show the authentication details
3. **Login automation triggers automatically** - the app will:
   - Fill in the email field with your configured credentials
   - Click "Continue With Company Email"
   - Fill in the password field
   - Click "Sign In"
4. **You're logged into CustomGPT!** - The entire flow is seamless and automatic

## 6. Next Steps: Backend Integration

The tokens you receive can be used to authenticate with your backend:

```javascript
// Example: Send ID token to your backend
const tokens = JSON.parse(localStorage.getItem('auth0_tokens'));

fetch('https://your-backend.com/auth/login', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokens.id_token}`
  },
  body: JSON.stringify({ 
    token: tokens.id_token,
    user: JSON.parse(localStorage.getItem('auth0_user'))
  })
});
```

Your backend should verify the JWT token using Auth0's public keys.

## 7. Error Handling

Auth0 errors are automatically displayed in the UI at the login page. When an error occurs:
- **Error Header**: The error type (e.g., "ACCESS DENIED", "SESSION ERROR")
- **Error Description**: Detailed message explaining what went wrong
- **Auto-dismiss**: Error box automatically fades after 15 seconds
- **Manual dismiss**: Click the × button to close immediately

### Common Errors

#### "ACCESS DENIED - user is not part of the organization"
- The authenticated user is not a member of your Auth0 Organization
- **Solution**: Add the user to your organization:
  1. Go to Auth0 Dashboard → **Organizations** → Your Org
  2. Click **Members** tab
  3. Click **Add Members**
  4. Add the user's email or invite them

#### "parameter organization is required for this client"
- Your Auth0 application is using Organizations
- You **must** add the `organization` parameter to `AUTH0_CONFIG`
- Find your Organization ID:
  1. Go to Auth0 Dashboard → **Organizations**
  2. Click your organization
  3. Copy the **Organization ID** (e.g., `org_abc123`) or **Name**
  4. Update `main.js`: `organization: 'org_abc123'`

#### "SESSION ERROR - Authentication session expired"
- The PKCE verifier was not found or expired
- **Solution**: Try clicking the Auth0 Login button again

### Error: "Callback URL mismatch"
- Make sure `https://app.customgpt.ai/login` is added to **Allowed Callback URLs** in Auth0 dashboard
- URLs must match exactly (including https vs http)

### Error: "Access denied"
- Check that your application is enabled in Auth0
- Verify Grant Types include "Authorization Code"
- Check that PKCE is enabled (should be by default for Native apps)

### Error: "Auth0 is not available"
- Make sure you're running in Electron (`npm start`), not in a regular browser

### Login automation doesn't start
- Check console logs for "[Auth0]" messages
- Verify `login-automation.js` has correct credentials
- Check if code parameter was detected on login page
- Make sure tokens are being stored in localStorage

### Login window doesn't close
- This is normal - it redirects to the main window instead
- The popup should close automatically after Auth0 redirect

## 8. Production Considerations

For production deployment:
- Use environment variables instead of hardcoding credentials
- Consider using refresh tokens for persistent sessions
- Implement token refresh logic
- Add proper error handling and retry mechanisms
- Consider using Auth0's session management

## 9. User Flow

```
User clicks "Auth0 Login" button on CustomGPT login page
    ↓
Electron opens Auth0 login window (popup)
    ↓
User chooses login method (Google or Email/Password)
    ↓
Auth0 handles authentication
    ↓
Auth0 redirects to https://app.customgpt.ai/login?code=...
    ↓
Electron closes popup and loads redirect URL in main window
    ↓
Main window detects code parameter on login page
    ↓
Electron exchanges code for tokens (access_token, id_token)
    ↓
Electron stores tokens in localStorage
    ↓
Electron fetches user profile from Auth0
    ↓
Electron cleans URL (removes code parameter)
    ↓
Electron triggers login automation script
    ↓
Login automation fills in email/password and submits form
    ↓
User is logged into CustomGPT!
```

## 10. Security Notes

- **NEVER** commit your Auth0 credentials to version control
- Consider using `.env` files for sensitive configuration
- The PKCE flow (used in this implementation) is secure for native apps
- Tokens are stored in localStorage - consider using secure storage for production
- Always validate tokens on your backend before trusting them

