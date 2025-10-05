#!/bin/bash

# NeonBox GitHub Deployment Script
# This script pushes your project to your GitHub repository

echo "NeonBox GitHub Deployment Script"
echo "================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed"
    echo "Please install Git and try again"
    exit 1
fi

# Check if repository already exists
if [ -d ".git" ]; then
    echo "Git repository already exists."
    
    # Check if remote origin is set correctly
    remote_url=$(git remote get-url origin 2>/dev/null)
    if [ "$remote_url" != "https://github.com/robel-samuel/NeonBox-website.git" ]; then
        echo "Updating remote origin..."
        git remote set-url origin https://github.com/robel-samuel/NeonBox-website.git
    else
        echo "Remote origin is already set correctly."
    fi
else
    echo "Initializing git repository..."
    git init
    git remote add origin https://github.com/robel-samuel/NeonBox-website.git
fi

echo "Adding all files to git..."
git add .

# Check if there are changes to commit
if ! git diff-index --quiet HEAD; then
    echo "Creating commit..."
    git commit -m "Update: NeonBox website with responsive design and deployment setup"
    echo "Commit created successfully."
else
    echo "No changes to commit."
fi

echo ""
echo "Setting main branch..."
git branch -M main

echo ""
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "Deployment complete! Your website has been pushed to:"
echo "https://github.com/robel-samuel/NeonBox-website"
echo ""
echo "To enable automatic deployment, you need to set up a Personal Access Token:"
echo "1. Go to https://github.com/settings/tokens"
echo "2. Generate a new token with 'repo' scope"
echo "3. Add it as a secret named 'DEPLOY_TOKEN' in your repository settings"
echo "4. Enable GitHub Pages in repository settings (select GitHub Actions as source)"