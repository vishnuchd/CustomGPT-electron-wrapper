#!/bin/bash

# macOS App Store Code Signing Script
# This script signs macOS App Store builds (.mas)

set -e

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$PROJECT_ROOT/dist"
APP_NAME="EasyBotChat"
MAS_APP_PATH="$DIST_DIR/mas/EasyBotChat.app"
PKG_PATH="$DIST_DIR/mas/EasyBotChat.pkg"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if codesign is available
check_codesign() {
    if ! command -v codesign &> /dev/null; then
        log_error "codesign command not found. This script must be run on macOS."
        exit 1
    fi
}

# Load environment variables
load_credentials() {
    local env_file="$PROJECT_ROOT/.env.signing.mac"

    if [ -f "$env_file" ]; then
        log_info "Loading credentials from .env.signing.mac"
        source "$env_file"
    fi

    # Check for required environment variables
    if [ -z "$APPLE_APP_STORE_ID" ]; then
        log_error "APPLE_APP_STORE_ID environment variable not set"
        echo ""
        echo "Please create a .env.signing.mac file with:"
        echo "  APPLE_APP_STORE_ID=\"3rd Party Mac Developer Application: Your Name (TEAM_ID)\""
        echo "  APPLE_APP_STORE_INSTALLER=\"3rd Party Mac Developer Installer: Your Name (TEAM_ID)\""
        echo ""
        echo "Or set environment variables before running this script."
        exit 1
    fi

    if [ -z "$APPLE_APP_STORE_INSTALLER" ]; then
        APPLE_APP_STORE_INSTALLER="$APPLE_APP_STORE_ID"
    fi

    log_success "App Store credentials loaded"
}

# Check if MAS app exists
check_mas_app_exists() {
    if [ ! -d "$MAS_APP_PATH" ]; then
        log_error "MAS app not found: $MAS_APP_PATH"
        log_info "Please run 'npm run build:mas' first"
        exit 1
    fi

    log_success "Found MAS app: $MAS_APP_PATH"
}

# Sign the MAS app
sign_mas_app() {
    log_info "Signing MAS app with App Store certificate..."

    # Sign app bundle with App Store entitlements
    codesign --deep --force --verbose --sign "$APPLE_APP_STORE_ID" \
             --entitlements "$PROJECT_ROOT/build/entitlements.mas.plist" \
             "$MAS_APP_PATH"

    if [ $? -eq 0 ]; then
        log_success "MAS app signed successfully"
    else
        log_error "Failed to sign MAS app"
        exit 1
    fi
}

# Create signed package for App Store submission
create_app_store_package() {
    log_info "Creating App Store package..."

    # Create pkg using productbuild
    if command -v productbuild &> /dev/null; then
        productbuild --component "$MAS_APP_PATH" \
                    /Applications \
                    --sign "$APPLE_APP_STORE_INSTALLER" \
                    "$PKG_PATH"

        if [ $? -eq 0 ]; then
            log_success "App Store package created: $PKG_PATH"
        else
            log_error "Failed to create App Store package"
            exit 1
        fi
    else
        log_warn "productbuild not found, skipping package creation"
        log_info "You can manually create the package using Xcode or Application Loader"
    fi
}

# Verify signatures
verify_signatures() {
    log_info "Verifying signatures..."

    # Verify MAS app signature
    if codesign --verify --verbose "$MAS_APP_PATH"; then
        log_success "MAS app signature verified"

        # Check entitlements
        log_info "Checking entitlements..."
        codesign --display --entitlements - "$MAS_APP_PATH" | grep -A 10 "Entitlements"
    else
        log_error "MAS app signature verification failed"
        exit 1
    fi

    # Verify package signature if it exists
    if [ -f "$PKG_PATH" ]; then
        if pkgutil --check-signature "$PKG_PATH" &> /dev/null; then
            log_success "Package signature verified"
        else
            log_error "Package signature verification failed"
            exit 1
        fi
    fi
}

# Main execution
main() {
    echo ""
    echo "=========================================="
    echo "  macOS App Store Code Signing Script"
    echo "=========================================="
    echo ""

    check_codesign
    load_credentials
    check_mas_app_exists
    sign_mas_app
    create_app_store_package
    verify_signatures

    echo ""
    echo "=========================================="
    log_success "App Store code signing completed successfully!"
    echo "=========================================="
    echo ""
    log_info "Signed files are in: $DIST_DIR"
    if [ -f "$PKG_PATH" ]; then
        log_info "Upload $PKG_PATH to App Store Connect for submission"
    fi
    echo ""
}

# Run main function
main "$@"

