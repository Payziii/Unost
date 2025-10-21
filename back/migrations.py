# migrations.py
from app import app, db
from models import PortfolioFile

def create_tables():
    with app.app_context():
        db.create_all()
        print("Таблицы созданы успешно")

if __name__ == '__main__':
    create_tables()