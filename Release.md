# Release Guide - EasyBotChat

This document guides you through the complete release process for **all platforms** (Windows, macOS, and Linux).

---

## 📋 Overview

### Release Workflow by Platform

| Platform | Build Location | Signing | Release Process |
|----------|---------------|---------|-----------------|
| **Windows** | Local machine | Local (CodeSignTool) | Build locally → Upload to Supabase → GitHub downloads → Release |
| **macOS** | GitHub Actions | GitHub Actions (notarize) | GitHub builds → Signs → Notarizes → Release |
| **Linux** | GitHub Actions | Not signed | GitHub builds → Release |

---

## 🎯 Quick Release Checklist

- [ ] All code pushed to `main` branch
- [ ] Version bumped in `package.json`
- [ ] (Windows) Built and signed locally
- [ ] (Windows) Uploaded to Supabase
- [ ] GitHub secrets configured
- [ ] Tag created and pushed
- [ ] GitHub Actions workflow running
- [ ] Release appears in target repository

---

## 📦 Windows Release Process

### Prerequisites

1. **CodeSignTool Installation**
   - Download from: [https://github.com/SSLcom/CodeSignTool/releases](https://github.com/SSLcom/CodeSignTool/releases)
   - Extract to a permanent location (e.g., `C:\Tools\CodeSignTool`)

2. **Required Credentials**
   - `SSL_COM_USERNAME` - Your SSL.com username
   - `SSL_COM_PASSWORD` - Your SSL.com password
   - `SSL_COM_TOTP_SECRET` - Your SSL.com TOTP secret key
   - `CODE_SIGN_TOOL_PATH` - Path where CodeSignTool is installed

3. **Supabase Configuration**
   - Create a `.env` file in the project root:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SECRET_KEY=your-service-role-key
   SUPABASE_BUCKET_NAME=windows-builds
   ```

### Step-by-Step Instructions

#### 1. Prepare the Release

```bash
# Ensure you're on main branch
git checkout main
git pull origin main

# Edit package.json - bump version
# Example: "version": "1.0.9" → "version": "1.1.0"

# Commit and push version bump
git add package.json
git commit -m "bump version to 1.1.0"
git push origin main
```

#### 2. Set Environment Variables

Open **PowerShell** and set the required variables:

```powershell
# Set SSL.com credentials (required for signing)
$env:SSL_COM_USERNAME="your-ssl-username"
$env:SSL_COM_PASSWORD="your-ssl-password"
$env:SSL_COM_TOTP_SECRET="your-totp-secret"

# Set CodeSignTool path
$env:CODE_SIGN_TOOL_PATH="C:\Tools\CodeSignTool"

# Verify they're set
echo $env:SSL_COM_USERNAME
echo $env:CODE_SIGN_TOOL_PATH
```

#### 3. Build, Sign, and Upload

```bash
# This command will:
# 1. Build the app with electron-builder
# 2. Sign all Windows executables
# 3. Regenerate latest.yml with correct checksums
# 4. Upload all files to Supabase
npm run build:win:upload
```

**Expected output:**
```
✅ Successfully signed EasyBotChat-Setup-1.1.0.exe
✅ Successfully signed EasyBotChat-Portable-1.1.0.exe
✅ Successfully signed EasyBotChat-1.1.0.msi
🔄 Regenerating latest.yml...
✅ latest.yml regenerated successfully
📁 Found 7 file(s) to upload
⬆️  Uploading to Supabase Storage...
✅ All uploads completed successfully
```

#### 4. Create and Push Tag

**IMPORTANT:** Tag version must match `package.json` version (with `v` prefix)

```bash
# Create tag (example: if version is 1.1.0, tag is v1.1.0)
git tag v1.1.0

# Push tag to trigger release workflow
git push origin v1.1.0
```

#### 5. Monitor Release

- **Workflow Progress:** [https://github.com/vishnuchd/CustomGPT-electron-wrapper/actions](https://github.com/vishnuchd/CustomGPT-electron-wrapper/actions)
- **Released Builds:** [https://github.com/vishnuchd/customGPT-electron-release/releases](https://github.com/vishnuchd/customGPT-electron-release/releases)

---

## 🍎 macOS Release Process

macOS builds are handled entirely by GitHub Actions. No local build required!

### What Happens Automatically

1. GitHub Actions is triggered by tag push
2. Installs dependencies
3. Builds the macOS application
4. Signs with Apple Developer certificate
5. Notarizes with Apple
6. Publishes to GitHub release

### Prerequisites

Ensure these GitHub secrets are configured (see [GitHub Secrets Configuration](#github-secrets-configuration)):
- `CSC_LINK` - Apple Developer certificate
- `CSC_KEY_PASSWORD` - Certificate password
- `APPLE_ID` - Apple ID for notarization
- `APPLE_ID_PASSWORD` - App-specific password
- `APPLE_TEAM_ID` - Apple Developer Team ID

### Trigger Release

Simply push a tag (same as Windows):

```bash
git tag v1.1.0
git push origin v1.1.0
```

GitHub Actions will handle the rest!

---

## 🐧 Linux Release Process

Linux builds are also handled entirely by GitHub Actions.

### What Happens Automatically

1. GitHub Actions is triggered by tag push
2. Installs dependencies
3. Builds Linux packages (AppImage, deb)
4. Publishes to GitHub release

### Trigger Release

Push a tag (same as Windows and macOS):

```bash
git tag v1.1.0
git push origin v1.1.0
```

---

## 🔐 GitHub Secrets Configuration

All secrets must be configured in your GitHub repository before creating a release.

### Where to Add Secrets

1. Go to: **Repository Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add each secret below

### Required Secrets

#### General Secrets

| Secret Name | Description | Required For |
|-------------|-------------|--------------|
| `RELEASE_TOKEN` | GitHub Personal Access Token (PAT) with `repo` scope | All platforms |
| `SUPABASE_URL` | Supabase project URL | Windows |
| `SUPABASE_SECRET_KEY` | Supabase service role key | Windows |
| `SUPABASE_BUCKET_NAME` | Storage bucket name (e.g., `windows-builds`) | Windows |

#### Windows Signing (Optional - for CI signing)

| Secret Name | Description |
|-------------|-------------|
| `SSL_COM_USERNAME` | SSL.com username |
| `SSL_COM_PASSWORD` | SSL.com password |
| `SSL_COM_TOTP_SECRET` | SSL.com TOTP secret |

**Note:** Windows signing happens locally, so these are optional for the workflow.

#### macOS Signing & Notarization

| Secret Name | Description |
|-------------|-------------|
| `CSC_LINK` | Base64-encoded Apple Developer certificate (.p12 file) |
| `CSC_KEY_PASSWORD` | Password for the certificate |
| `APPLE_ID` | Your Apple ID email |
| `APPLE_ID_PASSWORD` | App-specific password for notarization |
| `APPLE_TEAM_ID` | Your Apple Developer Team ID |

---

## 🔄 Complete Release Workflow

### Unified Release for All Platforms

When you push a tag, GitHub Actions will:

1. **Create Draft Release** - Creates a draft release in `customGPT-electron-release` repo
2. **Windows** - Downloads pre-built artifacts from Supabase and uploads to release
3. **macOS** - Builds, signs, notarizes, and uploads to release (runs in parallel)
4. **Linux** - Builds and uploads to release (runs in parallel)
5. **Publish Release** - Once all platforms complete, publishes the release

### Release Timeline

```
Time    | Action
--------|--------------------------------------------------
00:00   | Tag pushed → Workflow starts
00:01   | Draft release created
00:01   | Windows: Downloads from Supabase (fast)
00:01   | macOS: Starts build (takes ~5-10 minutes)
00:01   | Linux: Starts build (takes ~3-5 minutes)
05:00   | Windows: ✅ Complete
08:00   | Linux: ✅ Complete
12:00   | macOS: ✅ Complete (includes notarization)
12:01   | Release published! 🎉
```

---

## 📁 Release Artifacts

After a successful release, the following files will be available:

### Windows
- `EasyBotChat-Setup-1.1.0.exe` - NSIS installer (recommended)
- `EasyBotChat-Setup-1.1.0.exe.blockmap` - For delta updates
- `EasyBotChat-Portable-1.1.0.exe` - Portable version
- `EasyBotChat-Portable-1.1.0.exe.blockmap`
- `EasyBotChat-1.1.0.msi` - MSI installer
- `EasyBotChat-1.1.0.msi.blockmap`
- `latest.yml` - Auto-updater manifest

### macOS
- `EasyBotChat-1.1.0-arm64.dmg` - Apple Silicon (M1/M2/M3)
- `EasyBotChat-1.1.0-x64.dmg` - Intel Macs
- `latest-mac.yml` - Auto-updater manifest

### Linux
- `EasyBotChat-1.1.0.AppImage` - Universal Linux package
- `EasyBotChat-1.1.0.deb` - Debian/Ubuntu package
- `latest-linux.yml` - Auto-updater manifest

---

## ❗ Troubleshooting

### Windows Build Issues

#### "Missing SSL_COM_* environment variables"
**Problem:** Environment variables not set in PowerShell

**Solution:**
```powershell
# Re-run the environment variable commands
$env:SSL_COM_USERNAME="your-username"
$env:SSL_COM_PASSWORD="your-password"
$env:SSL_COM_TOTP_SECRET="your-secret"
```

#### "CodeSignTool not found"
**Problem:** `CODE_SIGN_TOOL_PATH` is incorrect

**Solution:**
```powershell
# Verify the path exists
Test-Path "C:\Tools\CodeSignTool"

# Set the correct path
$env:CODE_SIGN_TOOL_PATH="C:\Path\To\CodeSignTool"
```

#### "Upload failed"
**Problem:** Supabase credentials not configured

**Solution:**
- Check `.env` file has correct `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, and `SUPABASE_BUCKET_NAME`
- Verify bucket exists in Supabase dashboard

### GitHub Actions Failures

#### "Failed to download from Supabase"
**Problem:** Windows artifacts not uploaded or version mismatch

**Solution:**
1. Verify upload succeeded: Check Supabase Storage bucket
2. Ensure tag version matches `package.json` version
3. Re-upload if needed: `npm run upload:windows`

#### "macOS notarization failed"
**Problem:** Apple credentials incorrect or expired

**Solution:**
1. Verify all macOS secrets are set correctly
2. Check Apple Developer account is active
3. Generate new app-specific password if needed

---

## 📝 Version Management

### Version Naming Convention

Follow **Semantic Versioning** (semver):

- **Major version** (1.0.0 → 2.0.0) - Breaking changes
- **Minor version** (1.0.0 → 1.1.0) - New features, backward compatible
- **Patch version** (1.0.0 → 1.0.1) - Bug fixes

### Example Version Bump

```json
// package.json - BEFORE
{
  "version": "1.0.9",
  ...
}

// package.json - AFTER
{
  "version": "1.1.0",  // ← Bumped minor version
  ...
}
```

### Tag Format

**Always use `v` prefix:**
- ✅ `v1.1.0` - Correct
- ❌ `1.1.0` - Wrong

---

## 🎯 Best Practices

### Before Every Release

- [ ] Test the app locally on your development machine
- [ ] Review all changes since last release
- [ ] Update version in `package.json`
- [ ] Commit and push version bump
- [ ] (Windows) Test the signed installer locally
- [ ] Create and push tag
- [ ] Monitor GitHub Actions workflow
- [ ] Test the released installers on clean machines

### After Release

- [ ] Download and test each platform installer
- [ ] Verify auto-updater works (test with older version)
- [ ] Update release notes if needed
- [ ] Announce the release to users

---

## 🔗 Useful Links

- **GitHub Actions Workflow:** [https://github.com/vishnuchd/CustomGPT-electron-wrapper/actions](https://github.com/vishnuchd/CustomGPT-electron-wrapper/actions)
- **Releases Repository:** [https://github.com/vishnuchd/customGPT-electron-release/releases](https://github.com/vishnuchd/customGPT-electron-release/releases)
- **CodeSignTool Downloads:** [https://github.com/SSLcom/CodeSignTool/releases](https://github.com/SSLcom/CodeSignTool/releases)
- **Supabase Dashboard:** [https://supabase.com/dashboard](https://supabase.com/dashboard)

---

## 📞 Support

If you encounter issues not covered in this guide:

1. Check the GitHub Actions logs for detailed error messages
2. Review the troubleshooting section above
3. Check Supabase Storage to verify uploads
4. Verify all GitHub secrets are configured correctly

---

## ✅ Quick Reference Commands

```bash
# 1. Bump version and push
git add package.json
git commit -m "bump version to 1.1.0"
git push origin main

# 2. Set Windows environment variables (PowerShell)
$env:SSL_COM_USERNAME="username"
$env:SSL_COM_PASSWORD="password"
$env:SSL_COM_TOTP_SECRET="secret"
$env:CODE_SIGN_TOOL_PATH="C:\Tools\CodeSignTool"

# 3. Build, sign, and upload Windows
npm run build:win:upload

# 4. Create and push tag
git tag v1.1.0
git push origin v1.1.0

# 5. Monitor release
# Visit: https://github.com/vishnuchd/CustomGPT-electron-wrapper/actions
```

---

**Happy Releasing! 🚀**

