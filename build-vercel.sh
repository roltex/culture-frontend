#!/bin/bash

# Set environment variables to avoid Rollup native dependency issues
export ROLLUP_SKIP_NATIVE=true
export NODE_OPTIONS="--max-old-space-size=4096"

# Install dependencies with specific flags
npm install --no-optional --platform=linux --arch=x64

# Build the project
npm run build 