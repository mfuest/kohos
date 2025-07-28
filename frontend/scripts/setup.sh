#!/bin/bash

# Kohos Frontend Setup Script
# This script helps set up the frontend development environment

set -e

echo "🚀 Setting up Kohos frontend development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please install Node.js 20+ from https://nodejs.org/"
    echo "Or install nvm and run: nvm install 20 && nvm use 20"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version 20+ is required. Current version: $(node -v)"
    echo "Please upgrade Node.js or use nvm to switch to version 20+"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp env.example .env.local
    echo "⚠️  Please edit .env.local with your Supabase credentials"
else
    echo "✅ .env.local already exists"
fi

# Clean up any unnecessary files
echo "🧹 Cleaning up..."
npm prune

# Check for common issues
echo "🔍 Running health checks..."

# Check TypeScript
if npm run type-check &> /dev/null; then
    echo "✅ TypeScript check passed"
else
    echo "⚠️  TypeScript check failed - run 'npm run type-check' for details"
fi

# Check ESLint
if npm run lint &> /dev/null; then
    echo "✅ ESLint check passed"
else
    echo "⚠️  ESLint check failed - run 'npm run lint' for details"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your Supabase credentials"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "Useful commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run lint         - Check code quality"
echo "  npm run format       - Format code"
echo "  npm run type-check   - Check TypeScript types"
echo "" 