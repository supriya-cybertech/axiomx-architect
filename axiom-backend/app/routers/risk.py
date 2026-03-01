from fastapi import APIRouter

router = APIRouter(prefix="/risk")

@router.post("/score")
async def calculate_risk_score():
    pass

@router.get("/history")
async def get_risk_history():
    pass
