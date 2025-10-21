# app.py
from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from extensions import db, jwt, migrate

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    basedir = os.path.abspath(os.path.dirname(__file__))
    database_path = os.path.join(basedir, 'instance', 'unost.db')
    
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{database_path}'
    app.config['SECRET_KEY'] = 'super-secret-key-12345-fixed'
    app.config['JWT_SECRET_KEY'] = 'jwt-super-secret-key-67890-fixed'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.config['JWT_HEADER_TYPE'] = 'Bearer'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    print("=== КОНФИГУРАЦИЯ JWT ===")
    print(f"JWT_SECRET_KEY: {app.config['JWT_SECRET_KEY']}")
    print(f"SECRET_KEY: {app.config['SECRET_KEY']}")
    
    # Инициализация расширений
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    CORS(app, 
         origins=["http://юность.панксквад.рф", "https://юность.панксквад.рф", "http://localhost:5173", "http://127.0.0.1:5173"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Headers"],
         supports_credentials=True)
    
    # Создаем папку для загрузок портфолио
    uploads_dir = os.path.join(basedir, 'uploads', 'portfolio')
    os.makedirs(uploads_dir, exist_ok=True)
    print(f"✅ Папка для загрузок создана: {uploads_dir}")
    
    from routes import auth_routes, student_routes, complaint_routes, feedback_routes
    app.register_blueprint(auth_routes)
    app.register_blueprint(student_routes)
    app.register_blueprint(complaint_routes)
    app.register_blueprint(feedback_routes)
    
    return app

app = create_app()