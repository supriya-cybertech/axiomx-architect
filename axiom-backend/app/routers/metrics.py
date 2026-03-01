from fastapi import APIRouter

router = APIRouter(prefix="/metrics")

@router.get("/")
async def get_metrics():
    pass
