from sqlalchemy import Column, String, Integer, DateTime, ARRAY, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declared_attr
from app.database.base import Base
from sqlalchemy.orm import relationship

class AuditMixin:
    @declared_attr
    def created_by(cls):
        return Column(String(100), nullable=False, default="public", server_default="public")
    
    @declared_attr
    def created_at(cls):
        return Column(DateTime(timezone=True), server_default=func.now())

class MasterStatus(Base, AuditMixin):
    __tablename__ = "master_statuses"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False, index=True)

class MasterProvider(Base, AuditMixin):
    __tablename__ = "master_providers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False, index=True)
    display_name = Column(String(100), nullable=False)
    auth_type = Column(String(50), nullable=False, default="api_key")
    models = relationship("MasterModel", back_populates="provider")
    api_key_record = relationship("ProviderApiKey", back_populates="provider", uselist=False)

class ProviderApiKey(Base, AuditMixin):
    __tablename__ = "provider_api_keys"
    
    id = Column(Integer, primary_key=True, index=True)
    provider_id = Column(Integer, ForeignKey("master_providers.id"), unique=True, nullable=False, index=True)
    api_key = Column(String(500), nullable=False)
    provider = relationship("MasterProvider", back_populates="api_key_record")

class MasterModel(Base, AuditMixin):
    __tablename__ = "master_models"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False, index=True)
    provider_id = Column(Integer, ForeignKey("master_providers.id"), nullable=False, index=True)
    provider = relationship("MasterProvider", back_populates="models", lazy="joined")

class Comparison(Base, AuditMixin):
    __tablename__ = "comparisons"
    
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(String(1000), nullable=True)
    system_prompt = Column(String, nullable=False)
    user_prompt = Column(String, nullable=False)
    status_id = Column(Integer, ForeignKey("master_statuses.id"), nullable=False, index=True)
    models = Column(ARRAY(String), nullable=False)
    criteria = Column(ARRAY(String), nullable=True)
    results = Column(String, nullable=True)
    score = Column(String(50), nullable=True)
    date_created = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    master_status = relationship("MasterStatus", lazy="joined")

    @property
    def status(self):
        return self.master_status.name if self.master_status is not None else None
