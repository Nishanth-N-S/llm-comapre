import logging
import os
from agents.base import BaseAgent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from typing import Dict

from app import config

class GoogleAgent(BaseAgent):
    def __init__(self, model: str):
        self.model = model
        print("GoogleAgent initialized with model: %s, API Key: %s" % (model, config.settings.GOOGLE_API_KEY))
        self.llm = ChatGoogleGenerativeAI(
            model=model,
            google_api_key=config.settings.GOOGLE_API_KEY
        )
    
    async def invoke(self, system_prompt: str, user_prompt: str) -> Dict[str, str]:
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_prompt)
        ]
        response = await self.llm.ainvoke(messages)
        return {"model": self.model, "response": response.content}
