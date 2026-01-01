#!/bin/bash

# macOS App Notarization Script
# Notarizes macOS apps for App Store submission

set -e

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$PROJECT_ROOT/dist"
APP_NAME="EasyBotChat"
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

# Check if required tools are available
check_requirements() {
    if ! command -v xcrun &> /dev/null; then
        log_error "xcrun command not found. Xcode Command Line Tools are required."
        exit 1
    fi

    if ! command -v altool &> /dev/null; then
        log_error "altool command not found. Xcode 10.0+ is required."
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
    if [ -z "$APPLE_ID_EMAIL" ]; then
        log_error "APPLE_ID_EMAIL environment variable not set"
        echo ""
        echo "Please create a .env.signing.mac file with:"
        echo "  APPLE_ID_EMAIL=\"your-apple-id@example.com\""
        echo "  APPLE_APP_SPECIFIC_PASSWORD=\"app-specific-password\""
        echo "  APPLE_TEAM_ID=\"your-team-id\""
        echo ""
        echo "Or set environment variables before running this script."
        exit 1
    fi

    if [ -z "$APPLE_APP_SPECIFIC_PASSWORD" ]; then
        log_error "APPLE_APP_SPECIFIC_PASSWORD environment variable not set"
        exit 1
    fi

    if [ -z "$APPLE_TEAM_ID" ]; then
        log_error "APPLE_TEAM_ID environment variable not set"
        exit 1
    fi

    log_success "Notarization credentials loaded"
}

# Check if package exists
check_package_exists() {
    if [ ! -f "$PKG_PATH" ]; then
        log_error "Package not found: $PKG_PATH"
        log_info "Please run 'npm run build:mas:signed' first"
        exit 1
    fi

    log_success "Found package: $PKG_PATH"
}

# Submit app for notarization
submit_for_notarization() {
    log_info "Submitting app for notarization..."

    # Submit using notarytool (Xcode 13+) or altool (legacy)
    if command -v notarytool &> /dev/null; then
        log_info "Using notarytool (recommended)..."

        # Create temporary keychain for notarization
        KEYCHAIN_PATH="$HOME/Library/Keychains/notarization.keychain-db"
        KEYCHAIN_PASSWORD=$(openssl rand -base64 32)

        # Store credentials in keychain
        xcrun notarytool store-credentials "notarization" \
            --apple-id "$APPLE_ID_EMAIL" \
            --password "$APPLE_APP_SPECIFIC_PASSWORD" \
            --team-id "$APPLE_TEAM_ID" \
            --keychain "$KEYCHAIN_PATH" \
            --keychain-password "$KEYCHAIN_PASSWORD"

        # Submit for notarization
        NOTARY_OUTPUT=$(xcrun notarytool submit "$PKG_PATH" \
            --keychain-profile "notarization" \
            --keychain "$KEYCHAIN_PATH" \
            --wait)

        # Extract submission ID
        SUBMISSION_ID=$(echo "$NOTARY_OUTPUT" | grep "id:" | head -1 | awk '{print $2}')

        if [ -n "$SUBMISSION_ID" ]; then
            log_success "Submission successful. Submission ID: $SUBMISSION_ID"
            echo "$SUBMISSION_ID" > "$PROJECT_ROOT/.notarization_id"
        else
            log_error "Failed to submit for notarization"
            echo "$NOTARY_OUTPUT"
            exit 1
        fi

        # Clean up keychain
        security delete-keychain "$KEYCHAIN_PATH" 2>/dev/null || true

    else
        log_info "Using altool (legacy method)..."

        # Submit using altool
        NOTARY_OUTPUT=$(xcrun altool --notarize-app \
            --primary-bundle-id "com.easybot.chat" \
            --username "$APPLE_ID_EMAIL" \
            --password "$APPLE_APP_SPECIFIC_PASSWORD" \
            --file "$PKG_PATH" \
            --output-format xml)

        # Extract submission ID from XML output
        SUBMISSION_ID=$(echo "$NOTARY_OUTPUT" | grep -o '<string>[^<]*</string>' | sed -n '2p' | sed 's/<string>//;s/<\/string>//')

        if [ -n "$SUBMISSION_ID" ]; then
            log_success "Submission successful. Submission ID: $SUBMISSION_ID"
            echo "$SUBMISSION_ID" > "$PROJECT_ROOT/.notarization_id"
        else
            log_error "Failed to submit for notarization"
            echo "$NOTARY_OUTPUT"
            exit 1
        fi
    fi
}

# Check notarization status
check_notarization_status() {
    local submission_id="$1"

    if [ -z "$submission_id" ]; then
        if [ -f "$PROJECT_ROOT/.notarization_id" ]; then
            submission_id=$(cat "$PROJECT_ROOT/.notarization_id")
        else
            log_error "No submission ID found. Please submit for notarization first."
            exit 1
        fi
    fi

    log_info "Checking notarization status for: $submission_id"

    if command -v notarytool &> /dev/null; then
        # Use notarytool
        STATUS_OUTPUT=$(xcrun notarytool info "$submission_id" \
            --keychain-profile "notarization" 2>/dev/null || \
            xcrun notarytool info "$submission_id" \
            --apple-id "$APPLE_ID_EMAIL" \
            --password "$APPLE_APP_SPECIFIC_PASSWORD" \
            --team-id "$APPLE_TEAM_ID")

        if echo "$STATUS_OUTPUT" | grep -q "Accepted"; then
            log_success "Notarization completed successfully!"
            return 0
        elif echo "$STATUS_OUTPUT" | grep -q "In Progress"; then
            log_info "Notarization still in progress..."
            return 1
        else
            log_error "Notarization failed or rejected"
            echo "$STATUS_OUTPUT"
            return 2
        fi

    else
        # Use altool
        STATUS_OUTPUT=$(xcrun altool --notarization-info "$submission_id" \
            --username "$APPLE_ID_EMAIL" \
            --password "$APPLE_APP_SPECIFIC_PASSWORD")

        if echo "$STATUS_OUTPUT" | grep -q "success"; then
            log_success "Notarization completed successfully!"
            return 0
        elif echo "$STATUS_OUTPUT" | grep -q "in progress"; then
            log_info "Notarization still in progress..."
            return 1
        else
            log_error "Notarization failed or rejected"
            echo "$STATUS_OUTPUT"
            return 2
        fi
    fi
}

# Wait for notarization to complete
wait_for_notarization() {
    local submission_id="$1"
    local max_attempts=60  # 30 minutes with 30-second intervals
    local attempt=1

    log_info "Waiting for notarization to complete..."

    while [ $attempt -le $max_attempts ]; do
        if check_notarization_status "$submission_id"; then
            return 0
        fi

        log_info "Waiting 30 seconds before checking again... (attempt $attempt/$max_attempts)"
        sleep 30
        ((attempt++))
    done

    log_error "Notarization timed out after 30 minutes"
    exit 1
}

# Staple notarization ticket
staple_notarization() {
    log_info "Stapling notarization ticket to app..."

    if xcrun stapler staple "$PKG_PATH"; then
        log_success "Notarization ticket stapled successfully"
    else
        log_error "Failed to staple notarization ticket"
        exit 1
    fi

    # Verify stapling
    if xcrun stapler validate "$PKG_PATH"; then
        log_success "Stapling verification successful"
    else
        log_warn "Stapling verification failed - this may not be critical"
    fi
}

# Main execution
main() {
    echo ""
    echo "=========================================="
    echo "  macOS App Notarization Script"
    echo "=========================================="
    echo ""

    check_requirements
    load_credentials
    check_package_exists

    # Check if we should wait for existing submission
    if [ "$1" = "--wait" ] && [ -f "$PROJECT_ROOT/.notarization_id" ]; then
        submission_id=$(cat "$PROJECT_ROOT/.notarization_id")
        wait_for_notarization "$submission_id"
        staple_notarization
    else
        submit_for_notarization
        submission_id=$(cat "$PROJECT_ROOT/.notarization_id")
        wait_for_notarization "$submission_id"
        staple_notarization
    fi

    echo ""
    echo "=========================================="
    log_success "Notarization completed successfully!"
    echo "=========================================="
    echo ""
    log_info "Notarized package: $PKG_PATH"
    log_info "Ready for App Store Connect submission"
    echo ""
}

# Run main function
main "$@"

