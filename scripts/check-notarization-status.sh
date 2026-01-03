#!/bin/bash

# Check Notarization Status Script
# Usage: ./scripts/check-notarization-status.sh [SUBMISSION_ID]
#   If SUBMISSION_ID is not provided, it will prompt for it

set -e

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
    echo "2. Edit credentials.sh with your actual credentials"
    echo ""
    echo "3. Or set environment variables directly:"
    echo "   export APPLE_ID=\"your-email@domain.com\""
    echo "   export APPLE_APP_PASSWORD=\"abcd-efgh-ijkl-mnop\""
    echo ""
    exit 1
fi

# Get submission ID from argument or prompt
if [ -n "$1" ]; then
    SUBMISSION_ID="$1"
else
    echo "📋 Enter the submission ID to check:"
    read -r SUBMISSION_ID
fi

if [ -z "$SUBMISSION_ID" ]; then
    echo "❌ Error: Submission ID is required"
    exit 1
fi

# Get team ID (try from credentials or use default)
TEAM_ID="${APPLE_TEAM_ID:-5399TXR4MY}"

echo ""
echo "🔍 Checking notarization status for: $SUBMISSION_ID"
echo "⏳ Polling Apple's notary service..."
echo "   Checking status every 30 seconds..."
echo ""

# Temporarily disable exit on error for status checking
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
    STATUS_OUTPUT="$FINAL_OUTPUT"
fi

# Display full logs
echo ""
echo "📋 Full Notarization Logs:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "$STATUS_OUTPUT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Show summary
if [ "$FINAL_STATUS" = "Accepted" ]; then
    echo "✅ Notarization Accepted!"
    echo ""
    echo "The app has been successfully notarized by Apple."
    echo "You can now staple the notarization ticket to your app:"
    echo "   xcrun stapler staple /path/to/your.app"
elif [ "$FINAL_STATUS" = "Invalid" ]; then
    echo "❌ Notarization Failed: Invalid"
    echo ""
    echo "The app failed notarization. Check the logs above for details."
    echo "Common issues:"
    echo "  - Unsigned or improperly signed binaries"
    echo "  - Missing hardened runtime"
    echo "  - Invalid entitlements"
    echo "  - Missing secure timestamps"
elif [ "$FINAL_STATUS" = "Rejected" ]; then
    echo "❌ Notarization Rejected"
    echo ""
    echo "Apple rejected the notarization. Check the logs above for details."
else
    echo "⚠️  Status: $FINAL_STATUS"
    echo ""
    echo "Unable to determine final status. Check the logs above."
fi

