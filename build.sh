#!/bin/bash

echo "=== Building Frontend for Vercel ==="

# Install dependencies
echo "1. Installing dependencies..."
npm install

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