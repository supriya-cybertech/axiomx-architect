@echo off
echo ==================================================
echo   AXIOM // X - GITHUB UPLOAD TOOL
echo ==================================================
echo.

:: Initialize git if not already
if not exist ".git" (
    echo Initializing local Git repository...
    git init
)

:: Set remote URL
echo Setting remote to: https://github.com/supriya-cybertech/axiomx-architect.git
git remote remove origin 2>nul
git remote add origin https://github.com/supriya-cybertech/axiomx-architect.git

:: Add files
echo Adding files to repository (respecting .gitignore)...
git add .

:: Commit
echo Committing initial AXIOM // X release...
git commit -m "Initial professional release of AXIOM // X Command Center"

:: Branch
echo Setting default branch to main...
git branch -M main

:: Push
echo.
echo ==================================================
echo   READY TO PUSH
echo ==================================================
echo   Please ensure you have authenticated with GitHub.
echo   If browser pops up, please follow the login instructions.
echo.
pause

git push -u origin main

echo.
echo ==================================================
echo   UPLOAD COMPLETE
echo ==================================================
pause
