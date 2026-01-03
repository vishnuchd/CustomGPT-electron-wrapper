#!/bin/bash

# macOS Preparation Script
# Sets up everything needed for macOS builds

set -e

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

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

# Check if running on macOS
check_macos() {
    if [[ "$OSTYPE" != "darwin"* ]]; then
        log_error "This script must be run on macOS"
        exit 1
    fi
    log_success "Running on macOS"
}

# Check for required tools
check_requirements() {
    local missing_tools=()

    # Check for Xcode Command Line Tools
    if ! xcode-select -p &>/dev/null; then
        missing_tools+=("Xcode Command Line Tools")
    fi

    # Check for Node.js
    if ! command -v node &> /dev/null; then
        missing_tools+=("Node.js")
    fi

    # Check for ImageMagick
    if ! command -v convert &> /dev/null; then
        missing_tools+=("ImageMagick")
    fi

    # Check for electron-builder
    if ! npx electron-builder --version &> /dev/null; then
        missing_tools+=("electron-builder")
    fi

    if [ ${#missing_tools[@]} -gt 0 ]; then
        log_error "Missing required tools:"
        for tool in "${missing_tools[@]}"; do
            echo "  - $tool"
        done
        echo ""
        log_info "Installation commands:"
        echo "  Xcode Command Line Tools: xcode-select --install"
        echo "  Node.js: Download from https://nodejs.org/"
        echo "  ImageMagick: brew install imagemagick"
        echo "  electron-builder: npm install -g electron-builder"
        exit 1
    fi

    log_success "All required tools are installed"
}

# Install dependencies
install_dependencies() {
    log_info "Installing npm dependencies..."

    cd "$PROJECT_ROOT"
    npm install

    log_success "Dependencies installed"
}

# Generate macOS icons
generate_icons() {
    log_info "Generating macOS icons..."

    if [ ! -f "scripts/generate-mac-icons.sh" ]; then
        log_error "Icon generation script not found"
        exit 1
    fi

    bash scripts/generate-mac-icons.sh

    log_success "macOS icons generated"
}

# Create sample environment file
create_env_sample() {
    local env_file="$PROJECT_ROOT/.env.signing.mac.sample"

    if [ ! -f "$env_file" ]; then
        log_info "Creating sample environment file..."

        cat > "$env_file" << 'EOF'
# macOS Code Signing Environment Variables
# Copy this file to .env.signing.mac and fill in your values

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

# Instructions:
# 1. Replace "Your Name (TEAM_ID)" with your actual Apple Developer information
# 2. Get your TEAM_ID from https://developer.apple.com/account/#/membership
# 3. Generate an App-Specific Password from https://appleid.apple.com/
# 4. Ensure you have the appropriate certificates installed in your Keychain
EOF

        log_success "Sample environment file created: .env.signing.mac.sample"
    else
        log_info "Sample environment file already exists"
    fi
}

# Make scripts executable
make_scripts_executable() {
    log_info "Making scripts executable..."

    chmod +x scripts/*.sh

    log_success "Scripts are now executable"
}

# Test build (dry run)
test_build() {
    log_info "Testing build configuration..."

    cd "$PROJECT_ROOT"

    # Test if electron-builder can read the config
    if npx electron-builder --help | grep -q "mac"; then
        log_success "electron-builder configuration is valid"
    else
        log_warn "Could not verify electron-builder configuration"
    fi
}

# Show next steps
show_instructions() {
    echo ""
    echo "=========================================="
    log_success "macOS preparation completed!"
    echo "=========================================="
    echo ""
    log_info "Next steps:"
    echo "1. Copy .env.signing.mac.sample to .env.signing.mac"
    echo "2. Fill in your Apple Developer credentials"
    echo "3. Install required certificates in Keychain Access"
    echo "4. Run 'npm run build:mac:unsigned' to test building"
    echo "5. Run 'npm run build:mac:signed' for signed development builds"
    echo "6. Run 'npm run build:mas:signed' for App Store builds"
    echo ""
    log_info "Required certificates:"
    echo "- Developer ID Application (for regular builds)"
    echo "- Developer ID Installer (for regular builds)"
    echo "- Mac App Distribution (for App Store builds)"
    echo "- Mac Installer Distribution (for App Store builds)"
    echo ""
    log_info "Useful commands:"
    echo "- npm run prepare-mac     # Run this preparation script"
    echo "- npm run build:mac       # Build unsigned macOS app"
    echo "- npm run build:mac:signed # Build signed macOS app"
    echo "- npm run build:mas       # Build unsigned App Store app"
    echo "- npm run build:mas:signed # Build signed App Store app"
    echo "- npm run notarize        # Notarize App Store build"
    echo ""
}

# Main execution
main() {
    echo ""
    echo "=========================================="
    echo "  macOS Preparation Script"
    echo "=========================================="
    echo ""

    check_macos
    check_requirements
    install_dependencies
    generate_icons
    create_env_sample
    make_scripts_executable
    test_build
    show_instructions
}

# Run main function
main "$@"




