from fastapi import APIRouter

router = APIRouter(prefix="/satellites")

@router.get("/conjunctions")
async def get_conjunctions():
    pass
