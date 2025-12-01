from abc import ABC, abstractmethod
from typing import Dict

class BaseAgent(ABC):
    @abstractmethod
    async def invoke(self, system_prompt: str, user_prompt: str) -> Dict[str, str]:
        pass
