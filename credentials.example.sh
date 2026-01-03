# Apple Developer Credentials for macOS Signing and Notarization
# Copy this file to credentials.sh and fill in your actual credentials

# Your Apple Developer email address
export APPLE_ID="your-apple-developer@email.com"

# App-specific password from https://appleid.apple.com/account/manage
# Create a new app-specific password for this purpose
export APPLE_APP_PASSWORD="abcd-efgh-ijkl-mnop"

# Instructions:
# 1. Copy this file to credentials.sh
# 2. Fill in your actual credentials
# 3. Source the credentials before running the build script:
#    source credentials.sh && npm run build:mac:signed:notarized
# 4. Add credentials.sh to .gitignore
