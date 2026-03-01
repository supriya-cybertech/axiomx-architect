from fastapi import APIRouter

router = APIRouter(prefix="/alerts")

@router.get("/")
async def get_alerts():
    pass

@router.post("/verify")
async def verify_alert():
    pass
