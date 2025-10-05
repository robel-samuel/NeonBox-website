@echo off
echo NeonBox GitHub Deployment Script
echo ================================
echo.

echo Initializing git repository...
git init

echo Adding all files to git...
git add .

echo Creating initial commit...
git commit -m "Initial commit: NeonBox website with responsive design"

echo.
echo Setup complete! Your repository is ready to be pushed to GitHub.
echo.

echo Instructions to push to GitHub:
echo 1. Create a new repository on GitHub at https://github.com/new
echo    - Do NOT initialize with README
echo    - Name it something like "neonbox" or "neon-website"
echo.
echo 2. Copy the repository URL from GitHub
echo    (It will look like: https://github.com/yourusername/repository-name.git)
echo.
echo 3. Run these commands in this terminal:
echo    git remote add origin YOUR_REPOSITORY_URL
echo    git branch -M main
echo    git push -u origin main
echo.
echo Replace YOUR_REPOSITORY_URL with the actual URL from step 2.
echo.
pause