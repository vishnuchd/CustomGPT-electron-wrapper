#!/bin/bash

# macOS Code Signing Script for Development Builds
# This script signs macOS .dmg builds (not App Store builds)

set -e

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$PROJECT_ROOT/dist"
APP_NAME="EasyBotChat"

# Find the app path - check both possible locations
if [ -d "$DIST_DIR/mac/$APP_NAME.app" ]; then
    APP_PATH="$DIST_DIR/mac/$APP_NAME.app"
elif [ -d "$DIST_DIR/mac-arm64/$APP_NAME.app" ]; then
    APP_PATH="$DIST_DIR/mac-arm64/$APP_NAME.app"
else
    echo "Error: Could not find $APP_NAME.app in dist directory"
    exit 1
fi

DMG_PATH="$DIST_DIR/$APP_NAME-1.0.2-arm64.dmg"

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
    if [ -z "$APPLE_DEVELOPER_ID" ]; then
        log_error "APPLE_DEVELOPER_ID environment variable not set"
        echo ""
        echo "Please create a .env.signing.mac file with:"
        echo "  APPLE_DEVELOPER_ID=\"Developer ID Application: Your Name (TEAM_ID)\""
        echo "  APPLE_DEVELOPER_ID_INSTALLER=\"Developer ID Installer: Your Name (TEAM_ID)\""
        echo ""
        echo "Or set environment variables before running this script."
        exit 1
    fi

    if [ -z "$APPLE_DEVELOPER_ID_INSTALLER" ]; then
        APPLE_DEVELOPER_ID_INSTALLER="$APPLE_DEVELOPER_ID"
    fi

    log_success "Developer credentials loaded"
}

# Check if app exists
check_app_exists() {
    if [ ! -d "$APP_PATH" ]; then
        log_error "App not found: $APP_PATH"
        log_info "Please run 'npm run build:mac:unsigned' first"
        exit 1
    fi

    log_success "Found app: $APP_PATH"
}

# Sign the app
sign_app() {
    log_info "Signing app with Developer ID..."

    # Sign app bundle
    codesign --deep --force --verbose --sign "$APPLE_DEVELOPER_ID" "$APP_PATH"

    if [ $? -eq 0 ]; then
        log_success "App signed successfully"
    else
        log_error "Failed to sign app"
        exit 1
    fi
}

# Sign DMG if it exists
sign_dmg() {
    if [ -f "$DMG_PATH" ]; then
        log_info "Signing DMG with Developer ID Installer..."

        codesign --force --sign "$APPLE_DEVELOPER_ID_INSTALLER" "$DMG_PATH"

        if [ $? -eq 0 ]; then
            log_success "DMG signed successfully"
        else
            log_error "Failed to sign DMG"
            exit 1
        fi
    else
        log_warn "DMG not found, skipping DMG signing: $DMG_PATH"
    fi
}

# Verify signatures
verify_signatures() {
    log_info "Verifying signatures..."

    # Verify app signature
    if codesign --verify --verbose "$APP_PATH"; then
        log_success "App signature verified"
    else
        log_error "App signature verification failed"
        exit 1
    fi

    # Verify DMG signature if it exists
    if [ -f "$DMG_PATH" ]; then
        if codesign --verify --verbose "$DMG_PATH"; then
            log_success "DMG signature verified"
        else
            log_error "DMG signature verification failed"
            exit 1
        fi
    fi
}

# Main execution
main() {
    echo ""
    echo "=========================================="
    echo "  macOS Code Signing Script"
    echo "=========================================="
    echo ""

    check_codesign
    load_credentials
    check_app_exists
    sign_app
    sign_dmg
    verify_signatures

    echo ""
    echo "=========================================="
    log_success "Code signing completed successfully!"
    echo "=========================================="
    echo ""
    log_info "Signed files are in: $DIST_DIR"
    echo ""
}

# Run main function
main "$@"

