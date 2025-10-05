@echo off
setlocal enabledelayedexpansion

echo NeonBox GitHub Deployment Script
echo ================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

REM Check if repository already exists
if exist ".git" (
    echo Git repository already exists.
    
    REM Check if remote origin is already set correctly
    for /f "tokens=*" %%i in ('git remote get-url origin 2^>nul') do set remote_url=%%i
    
    if /i not "%remote_url%"=="https://github.com/robel-samuel/NeonBox-website.git" (
        if /i not "%remote_url%"=="https://github.com/robel-samuel/NeonBox-website.git/" (
            echo Updating remote origin...
            git remote set-url origin https://github.com/robel-samuel/NeonBox-website.git
        ) else (
            echo Remote origin is already set correctly.
        )
    ) else (
        echo Remote origin is already set correctly.
    )
) else (
    echo Initializing git repository...
    git init
    git remote add origin https://github.com/robel-samuel/NeonBox-website.git
)

echo Adding all files to git...
git add .

echo Checking for changes...
git diff-index --quiet HEAD || (
    echo Creating commit...
    git commit -m "Update: NeonBox website with responsive design and deployment setup"
    echo Commit created successfully.
) || (
    echo No changes to commit.
)

echo.
echo Setting main branch...
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo Checking if push was successful...
if %errorlevel% equ 0 (
    echo.
    echo Deployment successful! Your website has been pushed to:
    echo https://github.com/robel-samuel/NeonBox-website
    echo.
    echo To enable automatic deployment, you need to set up a Personal Access Token:
    echo 1. Go to https://github.com/settings/tokens
    echo 2. Generate a new token with 'repo' scope
    echo 3. Add it as a secret named 'DEPLOY_TOKEN' in your repository settings
    echo 4. Enable GitHub Pages in repository settings (select GitHub Actions as source)
) else (
    echo.
    echo Deployment failed. You may need to authenticate with GitHub.
    echo Try running: git push -u origin main
    echo And enter your GitHub credentials when prompted.
    echo.
    echo For automatic deployment, you'll need to set up a Personal Access Token:
    echo 1. Go to https://github.com/settings/tokens
    echo 2. Generate a new token with 'repo' scope
    echo 3. Add it as a secret named 'DEPLOY_TOKEN' in your repository settings
)

echo.
pause