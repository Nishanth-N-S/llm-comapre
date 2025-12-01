import os
from agents.base import BaseAgent
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from typing import Dict

class OpenAIAgent(BaseAgent):
    def __init__(self, model: str):
        self.model = model
        self.llm = ChatOpenAI(
            model=model,
            api_key=os.getenv("OPENAI_API_KEY")
        )
    
    async def invoke(self, system_prompt: str, user_prompt: str) -> Dict[str, str]:
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_prompt)
        ]
        response = await self.llm.ainvoke(messages)
        return {"model": self.model, "response": response.content}
