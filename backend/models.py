from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import enum
from sqlalchemy.dialects.mysql import JSON
from sqlalchemy import Enum
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

db = SQLAlchemy()
bcrypt = Bcrypt()



#for status 
class Status(enum.Enum):
    pending = "pending"
    Completed = "completed"
# sign_up model
class User(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    feedback=db.relationship("feedback",backref="User",cascade="all, delete-orphan")
    Score=db.relationship("Score",backref="User",cascade="all, delete-orphan")
    
# feedback model
class feedback(db.Model):

    feedback_id=db.Column(db.Integer,primary_key=True,nullable=False)
    username=db.Column(db.String(255),nullable=False)
    email=db.Column(db.String(255),db.ForeignKey(User.email),nullable=False)
    feedback_message=db.Column(db.Text,nullable=False)
    time=db.Column(db.DateTime,default=db.func.now(),nullable=False)

# Score model
class Score(db.Model):
    user_id=db.Column(db.Integer,db.ForeignKey(User.id),nullable=False)
    id=db.Column(db.Integer,primary_key=True,nullable=False)
    subject=db.Column(db.String(100),nullable=False)
    topic=db.Column(db.String(100),nullable=False)
    status=db.Column(Enum(Status),default=Status.pending,nullable=False)
    time = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(ZoneInfo("Asia/Kolkata")))
    due_date = db.Column(db.DateTime,nullable=False)
    answer=db.relationship("Question",backref="score",cascade="all, delete-orphan")
    score=db.Column(db.Integer,nullable=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.due_date:
            base_time = self.time or datetime.now(ZoneInfo("Asia/Kolkata"))
            self.due_date = base_time + timedelta(days=3)
#question modwl
class Question(db.Model):
    id=db.Column(db.Integer,primary_key=True,nullable=False)
    score_id=db.Column(db.ForeignKey(Score.id),nullable=False)
    quest_text=db.Column(db.Text,nullable=False)
    choices = db.Column(JSON, nullable=False)
    user_choice=db.Column(db.String(100),nullable=True)
    is_correct=db.Column(db.Boolean,default=False,nullable=True)
    time = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(ZoneInfo("Asia/Kolkata")))
