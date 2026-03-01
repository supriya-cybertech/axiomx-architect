from fastapi import APIRouter

router = APIRouter(prefix="/solar")

@router.get("/flares")
async def get_flares():
    pass
