from fastapi import APIRouter

router = APIRouter(prefix="/neo")

@router.get("/today")
async def get_neo_today():
    pass

@router.get("/{neo_id}")
async def get_neo_details(neo_id: str):
    pass
