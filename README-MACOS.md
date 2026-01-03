# EasyBotChat macOS Distribution

This guide walks you through preparing EasyBotChat for distribution on the Mac App Store or as a standalone macOS application.

## Distribution Options

- **Mac App Store**: Follow the App Store preparation steps below
- **Standalone App**: Follow the Outside App Store distribution steps

## Prerequisites

### System Requirements
- macOS 10.14 or later
- Xcode 10.0 or later with Command Line Tools
- Node.js 16+ and npm
- Apple Developer Program membership ($99/year)

### Required Tools
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install ImageMagick for icon generation
brew install imagemagick

# Install electron-builder globally
npm install -g electron-builder
```

## Outside App Store Distribution

For distributing EasyBotChat outside the Mac App Store, use the automated signing and notarization script.

### Prerequisites for Standalone Distribution

- Apple Developer ID Application certificate
- App-specific password for notarization

### Automated Build, Sign & Notarize

**Option 1: Environment Variables (Recommended)**
```bash
export APPLE_ID="your-apple-id@email.com"
export APPLE_APP_PASSWORD="abcd-efgh-ijkl-mnop"  # From appleid.apple.com
npm run build:mac:signed:notarized
```

**Option 2: Credentials File (Recommended for local development)**
```bash
cp credentials.example.sh credentials.sh
# Edit credentials.sh with your actual credentials
source credentials.sh
npm run build:mac:signed:notarized
```

**Option 3: Direct in Script (NOT Recommended)**
Edit `scripts/sign-and-notarize.sh` and uncomment/modify these lines:
```bash
export APPLE_ID="your-apple-id@email.com"
export APPLE_APP_PASSWORD="abcd-efgh-ijkl-mnop"
```

⚠️ **Security Warning**: Never commit credentials to version control!
   Always add credential files to .gitignore

   This script will:
   - Build the unsigned app
   - Sign with your Developer ID certificate
   - Notarize with Apple
   - Create signed and notarized DMG files

### Manual Signing (if needed)

If the automated script fails, you can sign manually:

```bash
# Build unsigned
npm run build:mac:unsigned

# Sign manually (replace with your certificate hash)
codesign --sign "YOUR_CERT_HASH" --entitlements build/entitlements.mac.plist dist/mac/EasyBotChat.app

# Create DMG
npm run build:mac:package
```

## Mac App Store Distribution

## Quick Start

1. **Prepare your macOS environment:**
   ```bash
   npm run prepare-mac
   ```

   Note: If icon generation fails, you can create the `build/icon.icns` file manually using:
   - Icon Composer (part of Xcode)
   - Online icon converters
   - Or use the PNG file as fallback (less optimal)

2. **Set up your Apple Developer credentials:**
   ```bash
   cp .env.signing.mac.sample .env.signing.mac
   # Edit .env.signing.mac with your credentials
   ```

3. **Build and sign for development:**
   ```bash
   npm run build:mac:signed
   ```

4. **Build and sign for App Store:**
   ```bash
   npm run build:mas:signed
   npm run notarize
   ```

## Testing Your Builds

### Development Testing (Non-Sandboxed)
For development and testing, use the regular macOS build:

```bash
# Build signable development version
npm run build:mac:signed

# Test the app
open dist/mac/EasyBotChat.app
```

### MAS Testing (Sandboxed)
MAS builds are sandboxed and cannot be opened directly:

```bash
# Build MAS version (cannot be opened directly)
npm run build:mas:hybrid

# Install for testing (requires admin privileges)
sudo installer -pkg dist/mas-arm64/EasyBotChat.pkg -target /
```

## MAS Build Options

You have two approaches for building MAS (Mac App Store) packages:

### Option 1: Electron-Builder + Hybrid (Recommended)
**Best of both worlds** - Electron-builder builds the app, custom script signs and packages for MAS:

```bash
# Build, sign, and package MAS app
npm run build:mas:hybrid
```

**Benefits:**
- Electron-builder handles the build process
- Custom script provides proper MAS signing with installer certificate
- Full certificate chain included
- Best signing quality for App Store submission

**Note:** MAS-signed apps cannot be opened directly due to sandbox restrictions. Use `npm run build:mac:signed` for testing.

### Option 2: Electron-Builder Only
Electron-builder handles MAS app signing automatically:

```bash
# Build signed MAS app only (no pkg)
npm run build:mas:electron-builder

# Or use the distribution-ready version
npm run build:mas:dist
```

**Benefits:**
- No manual signing steps required
- Handles entitlements automatically
- Integrated with your build pipeline

### Option 3: Custom Script (Legacy)
Use the comprehensive custom script for full manual control:

```bash
# Complete MAS build with custom script
npm run build:mas:complete
```

**Benefits:**
- More detailed logging and error handling
- Manual control over each signing step
- Additional verification steps
- Easier debugging of signing issues

## Apple Developer Setup

### 1. Certificates and Identifiers

You need these certificates in your Keychain:
- **Mac Development**: For development builds
- **Mac App Distribution**: For App Store distribution
- **Mac Installer Distribution**: For App Store installer packages

### 2. App Store Connect Setup

1. Create a new app in [App Store Connect](https://appstoreconnect.apple.com/)
2. Set Bundle ID to: `com.easybot.chat`
3. Configure app metadata using files in `app-store-metadata/`

### 3. Environment Configuration

Create `.env.signing.mac` with your credentials:

```bash
# For regular macOS builds (development/distribution)
APPLE_DEVELOPER_ID="Developer ID Application: Your Name (TEAM_ID)"
APPLE_DEVELOPER_ID_INSTALLER="Developer ID Installer: Your Name (TEAM_ID)"

# For Mac App Store builds
APPLE_APP_STORE_ID="3rd Party Mac Developer Application: Your Name (TEAM_ID)"
APPLE_APP_STORE_INSTALLER="3rd Party Mac Developer Installer: Your Name (TEAM_ID)"

# For notarization
APPLE_ID_EMAIL="your-apple-id@example.com"
APPLE_APP_SPECIFIC_PASSWORD="app-specific-password"
APPLE_TEAM_ID="your-team-id"
```

## Build Types

### Development Builds
```bash
# Unsigned development build
npm run build:mac

# Signed development build (can be distributed outside App Store)
npm run build:mac:signed
```

### App Store Builds
```bash
# Unsigned App Store build
npm run build:mas

# Signed App Store build
npm run build:mas:signed

# Notarize the signed build
npm run notarize
```

## App Store Submission

### Using Transporter App

1. Download [Transporter](https://apps.apple.com/us/app/transporter/id1450874784)
2. Open your notarized `.pkg` file
3. Upload to App Store Connect

### Using Xcode (Alternative)

1. Open Xcode
2. Go to Xcode → Open Developer Tool → Application Loader
3. Upload your `.pkg` file

### App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Select your app
3. Upload the build
4. Fill in metadata from `app-store-metadata/` directory
5. Add screenshots (see screenshot requirements below)
6. Submit for review

## Screenshots

Place screenshots in `app-store-metadata/screenshots/`:

- **13-inch MacBook**: 1280×800 or 1440×900
- **15-inch MacBook Pro**: 2880×1800 (Retina)

Recommended: 5-10 screenshots showing key features.

## Testing

### TestFlight (Recommended)

1. Create a TestFlight build
2. Invite beta testers
3. Test on various macOS versions

### Local Testing

```bash
# Test unsigned build
npm run build:mac
npm run start

# Test signed development build
npm run build:mac:signed
# Double-click the .dmg file to install
```

## Troubleshooting

### Common Issues

**"Code signing failed"**
- Check your certificates in Keychain Access
- Verify your TEAM_ID is correct
- Ensure certificates haven't expired

**"Notarization failed"**
- Check your App-Specific Password
- Verify your Apple ID has 2FA enabled
- Check the notarization logs for specific errors

**"App Store rejection"**
- Review the [App Store Review Guidelines](https://developer.apple.com/support/app-store-connect/)
- Check for sandbox violations
- Ensure all URLs in metadata are working

### Getting Help

- [Electron Builder macOS Docs](https://www.electron.build/configuration/mac)
- [Apple Developer Forums](https://developer.apple.com/forums/)
- [App Store Connect Help](https://developer.apple.com/support/app-store-connect/)

## File Structure

```
├── build/
│   ├── entitlements.mac.plist          # Development entitlements
│   ├── entitlements.mas.plist          # App Store entitlements
│   ├── entitlements.mas.inherit.plist  # App Store inheritance entitlements
│   ├── PrivacyInfo.xcprivacy           # Privacy manifest
│   └── icon.icns                       # macOS app icon
├── scripts/
│   ├── prepare-mac.sh                  # Setup script
│   ├── sign-mac.sh                     # Development signing
│   ├── sign-mas.sh                     # App Store signing
│   ├── notarize.sh                     # Notarization
│   └── generate-mac-icons.sh           # Icon generation
├── app-store-metadata/
│   ├── README.md                       # Metadata guide
│   ├── name.txt                        # App name
│   ├── description.txt                 # App description
│   ├── keywords.txt                    # Search keywords
│   ├── release_notes.txt               # Release notes
│   ├── support_url.txt                 # Support URL
│   ├── primary_category.txt            # App Store category
│   └── screenshots/                    # App screenshots
└── .env.signing.mac.sample             # Sample credentials
```

## Security Considerations

- All builds use hardened runtime
- App Store builds use full sandboxing
- Private keys never stored in the repository
- Environment variables used for credentials
- Separate certificates for development and distribution

## Version Management

- Update version in `package.json`
- Update `release_notes.txt` for each submission
- Tag releases in git for tracking

---

Ready to distribute EasyBotChat on the Mac App Store! 🎉
