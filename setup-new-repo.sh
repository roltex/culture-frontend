#!/bin/bash

echo "=== Setting up new frontend repository ==="

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: This script must be run from the frontend directory"
    echo "Please run: cd frontend && bash setup-new-repo.sh"
    exit 1
fi

echo "✅ Current directory: $(pwd)"

# Initialize new git repository
echo "1. Initializing new git repository..."
git init

# Add all files
echo "2. Adding all files..."
git add .

# Create initial commit
echo "3. Creating initial commit..."
git commit -m "Initial commit: Vue.js frontend for cultural institution website"

echo ""
echo "=== Repository Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Go to GitHub and create a new repository"
echo "2. Copy the repository URL"
echo "3. Run these commands:"
echo "   git remote add origin YOUR_REPOSITORY_URL"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "Example:"
echo "   git remote add origin https://github.com/yourusername/culture-frontend.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "After pushing, you can deploy to Vercel using the new repository!" 