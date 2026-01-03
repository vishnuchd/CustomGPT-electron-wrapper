#!/bin/bash

# EasyBotChat Mac App Signing and Notarization Script
# This script builds, signs, and notarizes the app using the Developer ID certificate
#
# Apple Developer Credentials
# ⚠️  SECURITY WARNING: Including credentials directly in source code is not recommended!
#    Consider using environment variables or a secure credential management system instead.
#
# To use environment variables instead, comment out the lines below and set:
#   export APPLE_ID="your-apple-developer@email.com"
#   export APPLE_APP_PASSWORD="abcd-efgh-ijkl-mnop"

# Uncomment and fill in your credentials below (NOT recommended for production):
# export APPLE_ID="your-apple-developer@email.com"
# export APPLE_APP_PASSWORD="abcd-efgh-ijkl-mnop"

# Certificate: Developer ID Application: EasyBotChat Inc. (5399TXR4MY)
# Certificate SHA-1: 649E94CEEA7EEF2BDDB280D524799AAA9C2A7C06

set -e

# Configuration
CERTIFICATE_HASH="649E94CEEA7EEF2BDDB280D524799AAA9C2A7C06"
TEAM_ID="5399TXR4MY"
APP_NAME="EasyBotChat"
APP_VERSION="1.0.2"
ENTITLEMENTS="build/entitlements.mac.plist"

# Load credentials from credentials.sh if it exists
if [[ -f "credentials.sh" ]]; then
    echo "🔐 Loading credentials from credentials.sh..."
    source credentials.sh
elif [[ -f "../credentials.sh" ]]; then
    echo "🔐 Loading credentials from ../credentials.sh..."
    source ../credentials.sh
fi

# Check for required environment variables
if [[ -z "$APPLE_ID" || -z "$APPLE_APP_PASSWORD" ]]; then
    echo "❌ Error: APPLE_ID and APPLE_APP_PASSWORD environment variables are required"
    echo ""
    echo "📋 Setup instructions:"
    echo "1. Copy credentials.example.sh to credentials.sh:"
    echo "   cp credentials.example.sh credentials.sh"
    echo ""
    echo "2. Edit credentials.sh with your actual credentials:"
    echo "   - APPLE_ID: Your Apple Developer email"
    echo "   - APPLE_APP_PASSWORD: App-specific password from https://appleid.apple.com/account/manage"
    echo ""
    echo "3. Or set environment variables directly:"
    echo "   export APPLE_ID=\"your-email@domain.com\""
    echo "   export APPLE_APP_PASSWORD=\"abcd-efgh-ijkl-mnop\""
    echo ""
    exit 1
fi

echo "🚀 Starting signed build and notarization process..."

# Check if the specified certificate is available
echo "🔍 Checking certificate availability..."
if ! security find-identity -v | grep -q "$CERTIFICATE_HASH"; then
    echo "⚠️  Warning: Specified certificate hash not found in valid identities"
    echo "   Available Developer ID Application certificates:"
    security find-identity -v | grep "Developer ID Application" || echo "   No Developer ID Application certificates found"

    echo ""
    echo "   If you have the EasyBotChat certificate, try reinstalling it with the private key."
    echo "   Continuing with available certificates..."
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Build unsigned app
echo "📦 Building unsigned application..."
CSC_IDENTITY_AUTO_DISCOVERY=false npm run build:mac:unsigned

# Sign the app manually with codesign (required for hardened runtime)
echo "🔐 Signing application with hardened runtime..."

# Find the certificate to use
CERT_NAME=""
if security find-identity -v | grep -q "Developer ID Application.*EasyBotChat"; then
    CERT_NAME=$(security find-identity -v | grep "Developer ID Application.*EasyBotChat" | head -1 | sed -E 's/^[[:space:]]*[0-9]+\)[[:space:]]+[A-F0-9]+[[:space:]]+"([^"]+)"$/\1/')
    echo "✅ Found EasyBotChat Developer ID certificate: $CERT_NAME"
elif security find-identity -v | grep -q "$CERTIFICATE_HASH"; then
    CERT_NAME=$(security find-identity -v | grep "$CERTIFICATE_HASH" | head -1 | sed -E 's/^[[:space:]]*[0-9]+\)[[:space:]]+[A-F0-9]+[[:space:]]+"([^"]+)"$/\1/')
    echo "✅ Found certificate by hash: $CERT_NAME"
else
    # Try to find any Developer ID Application certificate
    CERT_NAME=$(security find-identity -v | grep "Developer ID Application" | head -1 | sed -E 's/^[[:space:]]*[0-9]+\)[[:space:]]+[A-F0-9]+[[:space:]]+"([^"]+)"$/\1/')
    if [ -z "$CERT_NAME" ]; then
        echo "❌ Error: No Developer ID Application certificate found"
        echo "   Available certificates:"
        security find-identity -v | sed 's/^/   /'
        exit 1
    fi
    echo "⚠️  Using auto-discovered certificate: $CERT_NAME"
fi

# Sign the app with hardened runtime
APP_PATH="dist/mac/${APP_NAME}.app"
if [ ! -d "$APP_PATH" ]; then
    echo "❌ Error: App not found at $APP_PATH"
    exit 1
fi

echo "🔐 Signing all nested components first..."

# Sign all dylibs in Electron Framework
echo "   Signing Electron Framework dylibs..."
find "$APP_PATH/Contents/Frameworks/Electron Framework.framework" -name "*.dylib" -type f | while read dylib; do
    echo "      Signing: $(basename "$dylib")"
    codesign --force --options runtime --timestamp --sign "$CERT_NAME" "$dylib" 2>/dev/null || true
done

# Sign helpers inside frameworks (like chrome_crashpad_handler)
echo "   Signing framework helpers..."
find "$APP_PATH/Contents/Frameworks" -name "*.framework" -type d | while read framework; do
    find "$framework" -name "*Helper*" -o -name "*helper*" -o -name "chrome_crashpad_handler" -type f -perm +111 | while read helper; do
        echo "      Signing helper: $(basename "$helper")"
        codesign --force --options runtime --timestamp --sign "$CERT_NAME" "$helper" 2>/dev/null || true
    done
done

# Sign ShipIt executable with hardened runtime
echo "   Signing ShipIt executable..."
find "$APP_PATH" -name "ShipIt" -type f -perm +111 | while read shipit; do
    echo "      Signing: $shipit"
    codesign --force --options runtime --timestamp --sign "$CERT_NAME" "$shipit" 2>/dev/null || true
done

# Sign all frameworks individually (sign the bundle, not just the binary)
echo "   Signing frameworks..."
find "$APP_PATH/Contents/Frameworks" -name "*.framework" -type d | while read framework; do
    framework_name=$(basename "$framework" .framework)
    echo "      Signing framework: $framework_name"
    
    # Find and sign the framework binary first (check Versions/A first, then root)
    framework_binary=""
    if [ -f "$framework/Versions/A/$framework_name" ]; then
        framework_binary="$framework/Versions/A/$framework_name"
    elif [ -f "$framework/$framework_name" ]; then
        framework_binary="$framework/$framework_name"
    fi
    
    if [ -n "$framework_binary" ]; then
        echo "         Signing binary: $framework_binary"
        codesign --force --options runtime --timestamp --sign "$CERT_NAME" "$framework_binary" || {
            echo "         ❌ Failed to sign framework binary: $framework_binary"
            exit 1
        }
        # Verify the binary signature
        codesign --verify --verbose "$framework_binary" || {
            echo "         ❌ Framework binary signature verification failed: $framework_binary"
            exit 1
        }
    fi
    
    # Then sign the framework bundle itself (this is critical)
    echo "         Signing bundle: $framework"
    codesign --force --options runtime --timestamp --sign "$CERT_NAME" "$framework" || {
        echo "         ❌ Failed to sign framework bundle: $framework"
        exit 1
    }
    # Verify the bundle signature
    codesign --verify --verbose "$framework" || {
        echo "         ❌ Framework bundle signature verification failed: $framework"
        exit 1
    }
    echo "         ✅ Signed: $framework_name"
done

# Sign all helper apps
echo "   Signing helper apps..."
find "$APP_PATH/Contents/Frameworks" -name "*.app" -type d | while read helper; do
    helper_name=$(basename "$helper" .app)
    echo "      Signing helper: $helper_name"
    # Sign helper executable first
    if [ -f "$helper/Contents/MacOS/$helper_name" ]; then
        codesign --force --options runtime --entitlements "$ENTITLEMENTS" --timestamp --sign "$CERT_NAME" "$helper/Contents/MacOS/$helper_name" 2>/dev/null || true
    fi
    # Then sign the helper app bundle
    codesign --force --options runtime --entitlements "$ENTITLEMENTS" --timestamp --sign "$CERT_NAME" "$helper" 2>/dev/null || true
done

# Sign the main executable
echo "   Signing main executable..."
codesign --force --options runtime --entitlements "$ENTITLEMENTS" --timestamp --sign "$CERT_NAME" "$APP_PATH/Contents/MacOS/${APP_NAME}" || {
    echo "❌ Failed to sign main executable"
    exit 1
}
# Verify main executable signature
codesign --verify --verbose "$APP_PATH/Contents/MacOS/${APP_NAME}" || {
    echo "❌ Main executable signature verification failed"
    exit 1
}

# Now sign the main app bundle (without --deep since we've signed everything individually)
echo "🔐 Signing main app bundle with hardened runtime..."
codesign --force --options runtime --entitlements "$ENTITLEMENTS" --timestamp --sign "$CERT_NAME" "$APP_PATH" || {
    echo "❌ Failed to sign main app bundle"
    exit 1
}

# Verify the signature was applied
if ! codesign --verify --verbose "$APP_PATH" 2>&1 | grep -q "valid on disk"; then
    echo "❌ Error: Signature verification failed after signing"
    codesign --verify --verbose "$APP_PATH"
    exit 1
fi

echo "✅ App signed successfully with hardened runtime"

# Display certificate information
echo "📋 Certificate Information:"
codesign -dvv "$APP_PATH" 2>&1 | grep -E "(Authority|TeamIdentifier|Identifier|Format|CodeDirectory|Signature)" | head -10

# Verify signature
echo ""
echo "✅ Verifying signature..."
codesign --verify --verbose "$APP_PATH" || {
    echo "❌ Signature verification failed!"
    exit 1
}

# Verify all nested components are signed
echo ""
echo "🔍 Verifying all nested components are signed..."
find "$APP_PATH" -type f -perm +111 -exec codesign --verify --verbose {} \; 2>&1 | grep -v "valid on disk" | grep -v "^$" || echo "✅ All executable components are signed"

# Check for unsigned frameworks/libraries
echo ""
echo "🔍 Checking for unsigned frameworks and libraries..."
UNSIGNED=$(find "$APP_PATH" -name "*.dylib" -o -name "*.so" -o -name "*.framework" | while read file; do
    if ! codesign --verify "$file" 2>/dev/null; then
        echo "$file"
    fi
done)

if [ -n "$UNSIGNED" ]; then
    echo "⚠️  Found unsigned components:"
    echo "$UNSIGNED"
else
    echo "✅ All frameworks and libraries are signed"
fi

# Check for additional architecture builds
if [ -d "dist/mac-arm64/${APP_NAME}.app" ]; then
    ARM64_APP_PATH="dist/mac-arm64/${APP_NAME}.app"
    echo ""
    echo "🔐 Signing ARM64 build: $ARM64_APP_PATH"
    
    # Sign all nested components for ARM64 too
    echo "   Signing ARM64 Electron Framework dylibs..."
    find "$ARM64_APP_PATH/Contents/Frameworks/Electron Framework.framework" -name "*.dylib" -type f | while read dylib; do
        codesign --force --options runtime --timestamp --sign "$CERT_NAME" "$dylib" 2>/dev/null || true
    done
    
    echo "   Signing ARM64 framework helpers..."
    find "$ARM64_APP_PATH/Contents/Frameworks" -name "*.framework" -type d | while read framework; do
        find "$framework" -name "*Helper*" -o -name "*helper*" -o -name "chrome_crashpad_handler" -type f -perm +111 | while read helper; do
            codesign --force --options runtime --timestamp --sign "$CERT_NAME" "$helper" 2>/dev/null || true
        done
    done
    
    echo "   Signing ARM64 ShipIt executable..."
    find "$ARM64_APP_PATH" -name "ShipIt" -type f -perm +111 | while read shipit; do
        codesign --force --options runtime --timestamp --sign "$CERT_NAME" "$shipit" 2>/dev/null || true
    done
    
    echo "   Signing ARM64 frameworks..."
    find "$ARM64_APP_PATH/Contents/Frameworks" -name "*.framework" -type d | while read framework; do
        framework_name=$(basename "$framework" .framework)
        # Sign the framework binary first
        if [ -f "$framework/Versions/A/$framework_name" ]; then
            codesign --force --options runtime --timestamp --sign "$CERT_NAME" "$framework/Versions/A/$framework_name" 2>/dev/null || true
        elif [ -f "$framework/$framework_name" ]; then
            codesign --force --options runtime --timestamp --sign "$CERT_NAME" "$framework/$framework_name" 2>/dev/null || true
        fi
        # Then sign the framework bundle itself
        codesign --force --options runtime --timestamp --sign "$CERT_NAME" "$framework" 2>/dev/null || true
    done
    
    echo "   Signing ARM64 helper apps..."
    find "$ARM64_APP_PATH/Contents/Frameworks" -name "*.app" -type d | while read helper; do
        # Sign helper executable first
        helper_name=$(basename "$helper" .app)
        if [ -f "$helper/Contents/MacOS/$helper_name" ]; then
            codesign --force --options runtime --entitlements "$ENTITLEMENTS" --timestamp --sign "$CERT_NAME" "$helper/Contents/MacOS/$helper_name" 2>/dev/null || true
        fi
        # Then sign the helper app bundle
        codesign --force --options runtime --entitlements "$ENTITLEMENTS" --timestamp --sign "$CERT_NAME" "$helper" 2>/dev/null || true
    done
    
    # Sign ARM64 main executable
    codesign --force --options runtime --entitlements "$ENTITLEMENTS" --timestamp --sign "$CERT_NAME" "$ARM64_APP_PATH/Contents/MacOS/${APP_NAME}"
    
    # Sign ARM64 app bundle (without --deep)
    codesign --force --options runtime --entitlements "$ENTITLEMENTS" --timestamp --sign "$CERT_NAME" "$ARM64_APP_PATH"
    
    echo "📋 ARM64 Certificate Information:"
    codesign -dvv "$ARM64_APP_PATH" 2>&1 | grep -E "(Authority|TeamIdentifier|Identifier|Format|CodeDirectory|Signature)" | head -10
    
    codesign --verify --verbose "$ARM64_APP_PATH" || {
        echo "❌ ARM64 signature verification failed!"
        exit 1
    }
    
    echo ""
    echo "🔍 Verifying all ARM64 nested components are signed..."
    find "$ARM64_APP_PATH" -type f -perm +111 -exec codesign --verify --verbose {} \; 2>&1 | grep -v "valid on disk" | grep -v "^$" || echo "✅ All ARM64 executable components are signed"
    
    ARM64_UNSIGNED=$(find "$ARM64_APP_PATH" -name "*.dylib" -o -name "*.so" -o -name "*.framework" | while read file; do
        if ! codesign --verify "$file" 2>/dev/null; then
            echo "$file"
        fi
    done)
    
    if [ -n "$ARM64_UNSIGNED" ]; then
        echo "⚠️  Found unsigned ARM64 components:"
        echo "$ARM64_UNSIGNED"
    else
        echo "✅ All ARM64 frameworks and libraries are signed"
    fi
    
    echo "✅ ARM64 app signed successfully"
fi

# Notarize the app bundle (before creating DMG)
# notarytool requires a zip archive, so we zip the app first
# Use ditto to preserve extended attributes and signatures
echo "📦 Creating zip archive for notarization (preserving signatures)..."
APP_ZIP="dist/${APP_NAME}-x64.zip"
# Remove old zip if it exists
rm -f "$APP_ZIP"
# Use ditto to create zip with extended attributes preserved
ditto -c -k --keepParent "$APP_PATH" "$APP_ZIP" || {
    echo "⚠️  ditto failed, trying zip..."
    cd dist/mac
    zip -r "../${APP_NAME}-x64.zip" "${APP_NAME}.app" > /dev/null
    cd ../..
}
echo "✅ Created: $APP_ZIP"

echo "📡 Submitting app bundle for notarization..."
echo "   File: $(basename "$APP_ZIP")"
echo "   Size: $(du -h "$APP_ZIP" | cut -f1)"
echo "   Uploading to Apple's notary service (this may take several minutes)..."
echo ""

# Submit without --wait first to get submission ID, then poll for status
SUBMIT_OUTPUT=$(xcrun notarytool submit "$APP_ZIP" --apple-id "$APPLE_ID" --password "$APPLE_APP_PASSWORD" --team-id "$TEAM_ID" 2>&1)
echo "$SUBMIT_OUTPUT"

# Extract submission ID
SUBMISSION_ID=$(echo "$SUBMIT_OUTPUT" | grep -i "id:" | head -1 | awk '{print $2}')

if [ -z "$SUBMISSION_ID" ]; then
    echo "❌ Error: Could not extract submission ID from output"
    exit 1
fi

echo ""
echo "✅ Upload complete! Submission ID: $SUBMISSION_ID"
echo "⏳ Waiting for Apple to process notarization (this may take 5-15 minutes)..."
echo "   Checking status every 30 seconds..."
echo ""

# Poll for status with progress updates
# Temporarily disable exit on error for status checking (notarytool log may fail initially)
set +e

FINAL_STATUS=""
ATTEMPTS=0
MAX_ATTEMPTS=60  # 30 minutes max (60 attempts * 30 seconds)

while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
    # Wait before checking (except first time)
    if [ $ATTEMPTS -gt 0 ]; then
        sleep 30
    fi
    
    ATTEMPTS=$((ATTEMPTS + 1))
    
    # Calculate elapsed time
    ELAPSED=$((ATTEMPTS * 30))
    MINUTES=$((ELAPSED / 60))
    SECONDS=$((ELAPSED % 60))
    
    # Get status from Apple (errors are OK, job might not be ready yet)
    STATUS_OUTPUT=$(xcrun notarytool log "$SUBMISSION_ID" --apple-id "$APPLE_ID" --password "$APPLE_APP_PASSWORD" --team-id "$TEAM_ID" 2>&1)
    
    # Try to extract status from JSON
    STATUS=$(echo "$STATUS_OUTPUT" | grep -i '"status"' | head -1 | sed -E 's/.*"status"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/' 2>/dev/null || echo "")
    
    # If JSON parsing didn't work, try alternative format
    if [ -z "$STATUS" ] || [ "$STATUS" = "$STATUS_OUTPUT" ]; then
        STATUS=$(echo "$STATUS_OUTPUT" | grep -i "status:" | tail -1 | awk '{print $2}' 2>/dev/null || echo "")
    fi
    
    # If still no status, assume in progress
    if [ -z "$STATUS" ] || [ "$STATUS" = "$STATUS_OUTPUT" ]; then
        STATUS="InProgress"
    fi
    
    # Show status update
    echo "   [${MINUTES}m ${SECONDS}s] Status: $STATUS"
    
    # Check if we have a final status
    if [ "$STATUS" = "Accepted" ] || [ "$STATUS" = "Invalid" ] || [ "$STATUS" = "Rejected" ]; then
        echo ""
        echo "📋 Final Status: $STATUS"
        SUBMIT_OUTPUT="$STATUS_OUTPUT"
        FINAL_STATUS="$STATUS"
        break
    fi
done

# Re-enable exit on error
set -e

# If we exited the loop without a final status, try one more time
if [ -z "$FINAL_STATUS" ]; then
    echo ""
    echo "⚠️  Maximum wait time exceeded (30 minutes), fetching final status..."
    set +e
    FINAL_OUTPUT=$(xcrun notarytool log "$SUBMISSION_ID" --apple-id "$APPLE_ID" --password "$APPLE_APP_PASSWORD" --team-id "$TEAM_ID" 2>&1)
    set -e
    
    FINAL_STATUS=$(echo "$FINAL_OUTPUT" | grep -i '"status"' | head -1 | sed -E 's/.*"status"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/' 2>/dev/null || echo "Unknown")
    
    if [ "$FINAL_STATUS" != "Accepted" ] && [ "$FINAL_STATUS" != "Invalid" ] && [ "$FINAL_STATUS" != "Rejected" ]; then
        FINAL_STATUS=$(echo "$FINAL_OUTPUT" | grep -i "status:" | tail -1 | awk '{print $2}' 2>/dev/null || echo "Unknown")
    fi
    
    echo "📋 Final Status: $FINAL_STATUS"
    SUBMIT_OUTPUT="$FINAL_OUTPUT"
fi

# Extract submission ID
SUBMISSION_ID=$(echo "$SUBMIT_OUTPUT" | grep -i "id:" | head -1 | awk '{print $2}')

if [ -z "$SUBMISSION_ID" ]; then
    echo "❌ Error: Could not extract submission ID"
    exit 1
fi

# Check notarization status
if [ -z "$FINAL_STATUS" ]; then
    FINAL_STATUS="$STATUS"
fi

STATUS="$FINAL_STATUS"

if [ "$STATUS" != "Accepted" ]; then
    echo "❌ Notarization failed with status: $STATUS"
    echo "📋 Fetching notarization logs..."
    xcrun notarytool log "$SUBMISSION_ID" --apple-id "$APPLE_ID" --password "$APPLE_APP_PASSWORD" --team-id "$TEAM_ID"
    echo ""
    echo "❌ Cannot staple - notarization was not accepted"
    exit 1
fi

echo "✅ Notarization accepted!"

# Staple notarization ticket to app
echo "📌 Stapling notarization ticket to app..."
xcrun stapler staple "$APP_PATH" || {
    echo "⚠️  Warning: Stapling failed, but notarization was successful"
    echo "   The app is notarized, but the ticket couldn't be stapled"
}

# If ARM64 build exists, notarize it too
if [ -d "dist/mac-arm64/${APP_NAME}.app" ]; then
    echo "📦 Creating ARM64 zip archive for notarization (preserving signatures)..."
    ARM64_APP_ZIP="dist/${APP_NAME}-arm64.zip"
    # Remove old zip if it exists
    rm -f "$ARM64_APP_ZIP"
    # Use ditto to create zip with extended attributes preserved
    ditto -c -k --keepParent "$ARM64_APP_PATH" "$ARM64_APP_ZIP" || {
        echo "⚠️  ditto failed, trying zip..."
        cd dist/mac-arm64
        zip -r "../${APP_NAME}-arm64.zip" "${APP_NAME}.app" > /dev/null
        cd ../..
    }
    echo "✅ Created: $ARM64_APP_ZIP"
    
    echo "📡 Submitting ARM64 app bundle for notarization..."
    echo "   File: $(basename "$ARM64_APP_ZIP")"
    echo "   Size: $(du -h "$ARM64_APP_ZIP" | cut -f1)"
    echo "   Uploading to Apple's notary service..."
    echo ""
    
    ARM64_SUBMIT_OUTPUT=$(xcrun notarytool submit "$ARM64_APP_ZIP" --apple-id "$APPLE_ID" --password "$APPLE_APP_PASSWORD" --team-id "$TEAM_ID" 2>&1)
    echo "$ARM64_SUBMIT_OUTPUT"
    
    ARM64_SUBMISSION_ID=$(echo "$ARM64_SUBMIT_OUTPUT" | grep -i "id:" | head -1 | awk '{print $2}')
    
    if [ -n "$ARM64_SUBMISSION_ID" ]; then
        echo ""
        echo "✅ ARM64 upload complete! Submission ID: $ARM64_SUBMISSION_ID"
        echo "⏳ Waiting for Apple to process ARM64 notarization..."
        echo "   Checking status every 30 seconds..."
        echo ""
        
        ARM64_STATUS="InProgress"
        ARM64_ATTEMPTS=0
        ARM64_MAX_ATTEMPTS=60
        
        while true; do
            if [ $ARM64_ATTEMPTS -ge $ARM64_MAX_ATTEMPTS ]; then
                echo "⚠️  Maximum wait time exceeded (30 minutes) for ARM64"
                break
            fi
            
            if [ $ARM64_ATTEMPTS -gt 0 ]; then
                sleep 30
            fi
            
            ARM64_ATTEMPTS=$((ARM64_ATTEMPTS + 1))
            
            ARM64_STATUS_OUTPUT=$(xcrun notarytool log "$ARM64_SUBMISSION_ID" --apple-id "$APPLE_ID" --password "$APPLE_APP_PASSWORD" --team-id "$TEAM_ID" 2>&1)
            ARM64_STATUS=$(echo "$ARM64_STATUS_OUTPUT" | grep -i '"status"' | head -1 | sed -E 's/.*"status"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/' 2>/dev/null || echo "")
            
            if [ -z "$ARM64_STATUS" ] || [ "$ARM64_STATUS" = "$ARM64_STATUS_OUTPUT" ]; then
                ARM64_STATUS=$(echo "$ARM64_STATUS_OUTPUT" | grep -i "status:" | tail -1 | awk '{print $2}' 2>/dev/null || echo "")
            fi
            
            if [ -z "$ARM64_STATUS" ]; then
                ARM64_STATUS="InProgress"
            fi
            
            ARM64_ELAPSED=$((ARM64_ATTEMPTS * 30))
            ARM64_MINUTES=$((ARM64_ELAPSED / 60))
            ARM64_SECONDS=$((ARM64_ELAPSED % 60))
            echo "   [${ARM64_MINUTES}m ${ARM64_SECONDS}s] ARM64 Status: $ARM64_STATUS"
            
            if [ "$ARM64_STATUS" = "Accepted" ] || [ "$ARM64_STATUS" = "Invalid" ] || [ "$ARM64_STATUS" = "Rejected" ]; then
                echo ""
                echo "📋 ARM64 Final Status: $ARM64_STATUS"
                ARM64_SUBMIT_OUTPUT="$ARM64_STATUS_OUTPUT"
                ARM64_FINAL_STATUS="$ARM64_STATUS"
                break
            fi
            
            ARM64_STATUS="InProgress"
        done
    fi
    
    ARM64_SUBMISSION_ID=$(echo "$ARM64_SUBMIT_OUTPUT" | grep -i "id:" | head -1 | awk '{print $2}')
    if [ -z "$ARM64_FINAL_STATUS" ]; then
        ARM64_FINAL_STATUS=$(echo "$ARM64_SUBMIT_OUTPUT" | grep -i "status:" | tail -1 | awk '{print $2}' || echo "Unknown")
    fi
    
    ARM64_STATUS="$ARM64_FINAL_STATUS"
    
    if [ "$ARM64_STATUS" != "Accepted" ]; then
        echo "❌ ARM64 notarization failed with status: $ARM64_STATUS"
        echo "📋 Fetching notarization logs..."
        xcrun notarytool log "$ARM64_SUBMISSION_ID" --apple-id "$APPLE_ID" --password "$APPLE_APP_PASSWORD" --team-id "$TEAM_ID"
        echo ""
        echo "❌ Cannot staple ARM64 - notarization was not accepted"
    else
        echo "✅ ARM64 notarization accepted!"
        xcrun stapler staple "$ARM64_APP_PATH" || {
            echo "⚠️  Warning: ARM64 stapling failed, but notarization was successful"
        }
    fi
fi

# Create DMG (unsigned - per Apple's recommendation)
# Gatekeeper will detect the notarized .app inside the unsigned DMG
echo "📀 Creating unsigned DMG (as recommended by Apple)..."
CSC_IDENTITY_AUTO_DISCOVERY=false electron-builder --mac dmg --publish=never

# Note: We do NOT sign the DMG. According to Apple's documentation and best practices,
# unsigned DMGs work fine because Gatekeeper detects the notarized .app inside.
# Signing the DMG can actually trigger Gatekeeper errors.

# Verify app notarization
echo "🔍 Verifying app notarization..."
xcrun stapler validate "$APP_PATH" || {
    echo "❌ App notarization validation failed!"
    exit 1
}
echo "✅ App notarization verified"

if [ -d "dist/mac-arm64/${APP_NAME}.app" ]; then
    xcrun stapler validate "$ARM64_APP_PATH" || {
        echo "❌ ARM64 app notarization validation failed!"
        exit 1
    }
    echo "✅ ARM64 app notarization verified"
fi

# Optional: Notarize DMG as well (though not required - app is already notarized)
# Per https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/
# Gatekeeper detects the notarized .app inside the DMG, so DMG notarization is optional
echo "📡 Optionally notarizing DMG files (app is already notarized)..."
for DMG in "dist/${APP_NAME}-${APP_VERSION}"-*.dmg; do
    if [ -f "$DMG" ]; then
        echo "   Notarizing: $(basename "$DMG")"
        xcrun notarytool submit "$DMG" --apple-id "$APPLE_ID" --password "$APPLE_APP_PASSWORD" --team-id "$TEAM_ID" --wait
        xcrun stapler staple "$DMG"
        echo "   ✅ $(basename "$DMG") notarized"
    fi
done

echo "🎉 Build, signing, and notarization completed successfully!"
echo "📦 Signed and notarized DMGs are available in the dist/ directory:"
echo "   - dist/${APP_NAME}-${APP_VERSION}-x64.dmg"
echo "   - dist/${APP_NAME}-${APP_VERSION}-arm64.dmg"
