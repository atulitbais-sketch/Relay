import asyncio
import os
from dotenv import load_dotenv
load_dotenv()
print("HOST:", os.getenv("COCKROACH_HOST"))
print("CA PATH:", os.getenv("COCKROACH_CA_CERT_PATH"))
from app.db.connection import connect_db, disconnect_db, get_pool


async def main():
    await connect_db()
    pool = await get_pool()
    async with pool.acquire() as conn:
        version = await conn.fetchval("SELECT version()")
        print("Connected OK:", version)
        count = await conn.fetchval("SELECT count(*) FROM memories")
        print("memories row count:", count)
    await disconnect_db()


if __name__ == "__main__":
    asyncio.run(main())