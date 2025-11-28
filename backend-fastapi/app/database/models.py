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

class Comparison(Base, AuditMixin):
    __tablename__ = "comparisons"
    
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    status_id = Column(Integer, ForeignKey("master_statuses.id"), nullable=False, index=True)
    models = Column(ARRAY(String), nullable=False)
    score = Column(String(50), nullable=True)
    date_created = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    master_status = relationship("MasterStatus", lazy="joined")

    @property
    def status(self):
        return self.master_status.name if self.master_status is not None else None
