#!/bin/bash

# Kohos Frontend Cleanup Script
# This script helps clean up the frontend development environment

set -e

echo "🧹 Cleaning up Kohos frontend development environment..."

# Remove build artifacts
echo "🗑️  Removing build artifacts..."
rm -rf dist/
rm -rf build/
rm -rf .vite/

# Remove node_modules cache
echo "🗑️  Cleaning npm cache..."
npm cache clean --force

# Remove unnecessary dependencies
echo "🗑️  Pruning dependencies..."
npm prune

# Remove lock file and reinstall (optional)
if [ "$1" = "--full" ]; then
    echo "🗑️  Full cleanup - removing node_modules and lock file..."
    rm -rf node_modules/
    rm -f package-lock.json
    echo "📦 Reinstalling dependencies..."
    npm install
fi

# Clean up OS files
echo "🗑️  Removing OS files..."
find . -name ".DS_Store" -delete 2>/dev/null || true
find . -name "Thumbs.db" -delete 2>/dev/null || true

# Clean up IDE files
echo "🗑️  Removing IDE files..."
rm -rf .vscode/settings.json.bak 2>/dev/null || true
rm -rf .idea/ 2>/dev/null || true

# Clean up logs
echo "🗑️  Removing log files..."
find . -name "*.log" -delete 2>/dev/null || true

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "To start fresh:"
echo "  npm run dev          - Start development server"
echo ""
echo "If you need a full reset:"
echo "  ./scripts/cleanup.sh --full"
echo "" 