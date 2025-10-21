# models.py
from extensions import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255))
    role = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    full_name = db.Column(db.String(200), nullable=False)
    birth_date = db.Column(db.Date)
    phone = db.Column(db.String(20))
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'))
    
    user = db.relationship('User', backref='student')
    group = db.relationship('Group', backref='students')

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    course = db.Column(db.Integer)

class Grade(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    grade = db.Column(db.Integer)
    date = db.Column(db.Date, default=datetime.utcnow)
    
    student = db.relationship('Student', backref='grades')

class PortfolioFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    saved_filename = db.Column(db.String(255), nullable=False)
    file_size = db.Column(db.Integer, nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    
    student = db.relationship('Student', backref='portfolio_files')
    
    def to_dict(self):
        return {
            'id': self.id,
            'filename': self.filename,
            'saved_filename': self.saved_filename,
            'size': self.file_size,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None,
            'student_id': self.student_id
        }

class Complaint(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ip_address = db.Column(db.String(45), nullable=False)
    user_agent = db.Column(db.Text, nullable=False)
    complaint_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'ip_address': self.ip_address,
            'user_agent': self.user_agent,
            'complaint_text': self.complaint_text,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    ip_address = db.Column(db.String(45), nullable=False)
    user_agent = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'ip_address': self.ip_address,
            'user_agent': self.user_agent,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }