import os
from agents.base import BaseAgent
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage
from typing import Dict

class OllamaAgent(BaseAgent):
    def __init__(self, model: str):
        self.model = model
        self.llm = ChatOllama(
            model=model,
            base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        )
    
    async def invoke(self, system_prompt: str, user_prompt: str) -> Dict[str, str]:
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_prompt)
        ]
        response = await self.llm.ainvoke(messages)
        return {"model": self.model, "response": response.content}
