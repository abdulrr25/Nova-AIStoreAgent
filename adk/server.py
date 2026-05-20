import asyncio
import uuid
import os
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai.types import Content, Part

from my_agent.agent import root_agent

load_dotenv()

# ── Session & Runner setup ─────────────────────────────────────────────────
session_service = InMemorySessionService()
runner = Runner(
    agent=root_agent,
    app_name="nova_admin",
    session_service=session_service,
)

APP_NAME = "nova_admin"
USER_ID  = "admin"


# ── FastAPI app ────────────────────────────────────────────────────────────
app = FastAPI(title="NOVA Admin ADK Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://*.vercel.app",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"


@app.get("/health")
def health():
    return {"status": "ok", "agent": root_agent.name}


@app.post("/chat")
async def chat(req: ChatRequest):
    session_id = req.session_id

    # Create session if it doesn't exist yet
    existing = session_service.list_sessions(app_name=APP_NAME, user_id=USER_ID)
    session_ids = [s.id for s in (existing.sessions if existing else [])]

    if session_id not in session_ids:
        session_service.create_session(
            app_name=APP_NAME,
            user_id=USER_ID,
            session_id=session_id,
        )

    content = Content(parts=[Part(text=req.message)])

    final_reply = "I couldn't find an answer. Please try again."

    async for event in runner.run_async(
        user_id=USER_ID,
        session_id=session_id,
        new_message=content,
    ):
        if event.is_final_response() and event.content and event.content.parts:
            final_reply = event.content.parts[0].text
            break

    return {"reply": final_reply, "session_id": session_id}


if __name__ == "__main__":
    port = int(os.getenv("PORT", os.getenv("ADK_PORT", 8001)))
    print(f"🚀 NOVA ADK Server running on http://0.0.0.0:{port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
