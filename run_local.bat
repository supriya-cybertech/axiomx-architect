@echo off
echo =========================================
echo Starting AxiomX Application locally...
echo =========================================

echo.
echo Starting FastAPI Backend on port 8000...
start "AxiomX Backend" cmd /k "cd axiom-backend && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8000"

echo.
echo Starting Next.js Frontend on port 3000...
start "AxiomX Frontend" cmd /k "cd axiom-frontend && npm install && npm run dev"

echo.
echo Both servers have been launched in separate windows!
echo Once they start, you can access the frontend at http://localhost:3000
echo.
pause
