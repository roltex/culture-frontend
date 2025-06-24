#!/bin/bash

echo "=== Building Frontend for Vercel ==="

# Set environment variables to avoid Rollup native dependency issues
export ROLLUP_SKIP_NATIVE=true
export NODE_OPTIONS="--max-old-space-size=4096"

# Install dependencies with specific flags to avoid native dependencies
echo "1. Installing dependencies..."
npm install --no-optional --platform=linux --arch=x64

# Clear any existing build
echo "2. Clearing existing build..."
rm -rf dist

# Build the project
echo "3. Building project..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful! Files in dist/:"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi

echo "=== Build Complete ===" 