# CustomGPT Electron Wrapper

Electron wrapper for CustomGPT with automatic login and UI customization capabilities.

## Features

- Automatic login with provided credentials
- Custom UI element customization via CSS and JavaScript injection
- Hot-reload customizations during development

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the app:
```bash
npm start
```

3. For development with DevTools:
```bash
npm run dev
```

## Customization

### Method 1: Edit `main.js` directly

Modify the CSS and JavaScript in the `injectCustomUI()` function in `main.js`.

### Method 2: Use `customizations.js`

1. Edit `customizations.js` with your CSS and JS
2. Update `main.js` to import and use it:
```javascript
const customizations = require('./customizations');
// Then use customizations.css and customizations.js
```

## Login Credentials

The app automatically logs in with:
- Email: developer@easybot.chat
- Password: PERJBEhbi8E@zhB

## Notes

- The login automation waits for the login form to appear
- UI customizations are injected after page load
- Use DevTools (dev mode) to inspect elements and find selectors for customization

