@echo off
echo ==================================================
echo   AXIOM // X - SMARTER GITHUB UPLOADER
echo ==================================================
echo.

:: Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from: https://git-scm.com/downloads
    echo.
    pause
    exit /b
)

:: Initialize Git
if not exist ".git" (
    echo [1/4] Initializing Git...
    git init
)

:: Add Remote
git remote add origin https://github.com/supriya-cybertech/axiomx-architect.git 2>nul
git remote set-url origin https://github.com/supriya-cybertech/axiomx-architect.git

:: Add and Commit
echo [2/4] Adding files (ignoring node_modules)...
git add .
echo [3/4] Creating professional commit...
git commit -m "Final professional AXIOM // X HUD release" 2>nul
git branch -M main

:: Push
echo.
echo ==================================================
echo   STEP [4/4]: PUSHING TO GITHUB
echo ==================================================
echo.
echo   A GITHUB LOGIN WINDOW MAY POP UP. 
echo   Please log in or click "Authorize".
echo.
pause

git push -u origin main --force

if %ERRORLEVEL% neq 0 (
    echo.
    echo [!!! ERROR !!!] The push failed. 
    echo Common fixes:
    echo 1. Check if you typed the URL correctly.
    echo 2. Make sure you have permission to push to this repo.
    echo 3. Check your internet connection.
) else (
    echo.
    echo [SUCCESS] Your project is now live on GitHub!
)

echo.
pause
