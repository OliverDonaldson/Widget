#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Study Tracker Widget — Install Script
# ─────────────────────────────────────────────────────────────────────────────
# This script copies the widget into Übersicht's widgets directory.
# Make sure Übersicht is installed first: https://tracesof.net/uebersicht/

set -e

WIDGET_NAME="study-tracker.widget"
UBERSICHT_DIR="$HOME/Library/Application Support/Übersicht/widgets"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "📖 Study Tracker Widget Installer"
echo "──────────────────────────────────"

# Check if Übersicht widgets dir exists
if [ ! -d "$UBERSICHT_DIR" ]; then
    echo "❌ Übersicht widgets directory not found!"
    echo "   Please install Übersicht first: https://tracesof.net/uebersicht/"
    echo "   Then launch it once to create the widgets folder."
    exit 1
fi

# Copy widget
if [ -d "$UBERSICHT_DIR/$WIDGET_NAME" ]; then
    echo "⚠️  Widget already exists. Backing up to ${WIDGET_NAME}.backup"
    mv "$UBERSICHT_DIR/$WIDGET_NAME" "$UBERSICHT_DIR/${WIDGET_NAME}.backup.$(date +%s)"
fi

echo "📦 Copying widget to Übersicht..."
cp -R "$SCRIPT_DIR/$WIDGET_NAME" "$UBERSICHT_DIR/$WIDGET_NAME"

echo "✅ Installed successfully!"
echo ""
echo "🚀 Widget is now live on your desktop."
echo "   • Click tasks to check/uncheck them"
echo "   • Edit data.json to add your own courses"
echo "   • Widget location: $UBERSICHT_DIR/$WIDGET_NAME"
echo ""
echo "If you don't see it, right-click the Übersicht menu bar icon → Refresh All Widgets"
