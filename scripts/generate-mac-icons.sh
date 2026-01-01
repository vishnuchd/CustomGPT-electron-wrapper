#!/bin/bash

# Generate macOS icons from PNG source
# Requires ImageMagick to be installed

set -e

SOURCE_ICON="EasyBotLogo.png"
OUTPUT_ICON="build/icon.icns"
TEMP_DIR=$(mktemp -d)

echo "Generating macOS icons from $SOURCE_ICON..."

# Check if source icon exists
if [ ! -f "$SOURCE_ICON" ]; then
    echo "Error: Source icon $SOURCE_ICON not found!"
    exit 1
fi

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is required. Install with: brew install imagemagick"
    exit 1
fi

# Create iconset directory
ICONSET_DIR="$TEMP_DIR/EasyBotChat.iconset"
mkdir -p "$ICONSET_DIR"

# Generate standard macOS icon sizes that iconutil expects
# These are the required sizes for a complete iconset
echo "Generating 16x16 icon..."
magick "$SOURCE_ICON" -resize "16x16" "$ICONSET_DIR/icon_16x16.png"

echo "Generating 32x32 icon..."
magick "$SOURCE_ICON" -resize "32x32" "$ICONSET_DIR/icon_16x16@2x.png"

echo "Generating 32x32 icon..."
magick "$SOURCE_ICON" -resize "32x32" "$ICONSET_DIR/icon_32x32.png"

echo "Generating 64x64 icon..."
magick "$SOURCE_ICON" -resize "64x64" "$ICONSET_DIR/icon_32x32@2x.png"

echo "Generating 64x64 icon..."
magick "$SOURCE_ICON" -resize "64x64" "$ICONSET_DIR/icon_64x64.png"

echo "Generating 128x128 icon..."
magick "$SOURCE_ICON" -resize "128x128" "$ICONSET_DIR/icon_64x64@2x.png"

echo "Generating 128x128 icon..."
magick "$SOURCE_ICON" -resize "128x128" "$ICONSET_DIR/icon_128x128.png"

echo "Generating 256x256 icon..."
magick "$SOURCE_ICON" -resize "256x256" "$ICONSET_DIR/icon_128x128@2x.png"

echo "Generating 256x256 icon..."
magick "$SOURCE_ICON" -resize "256x256" "$ICONSET_DIR/icon_256x256.png"

echo "Generating 512x512 icon..."
magick "$SOURCE_ICON" -resize "512x512" "$ICONSET_DIR/icon_256x256@2x.png"

echo "Generating 512x512 icon..."
magick "$SOURCE_ICON" -resize "512x512" "$ICONSET_DIR/icon_512x512.png"

echo "Generating 1024x1024 icon..."
magick "$SOURCE_ICON" -resize "1024x1024" "$ICONSET_DIR/icon_512x512@2x.png"

# Convert iconset to icns
echo "Converting to .icns format..."
iconutil -c icns "$ICONSET_DIR" -o "$OUTPUT_ICON"

# Clean up
rm -rf "$TEMP_DIR"

echo "✅ macOS icon generated: $OUTPUT_ICON"
echo "Icon sizes included: 16x16, 32x32, 64x64, 128x128, 256x256, 512x512, 1024x1024"
echo "Retina variants: 32x32@2x, 64x64@2x, 128x128@2x, 256x256@2x, 512x512@2x"
