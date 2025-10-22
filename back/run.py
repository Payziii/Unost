# run.py
from app import app
from extensions import db
from models import User, Group, PortfolioFile, Complaint, Feedback, News

def init_test_data():
    """Инициализация тестовых данных"""
    if not User.query.filter_by(email='admin@college.ru').first():
        admin = User(email='admin@college.ru', role='admin')
        admin.set_password('admin123')
        db.session.add(admin)
        print('✅ Создан тестовый пользователь: admin@college.ru / admin123')

    groups_data = [
        'ТМ-1417', 'МЦМ-Пф-102', 'ТИК-112', 'ИСП-1308', 'СП-Пф-1603', 
        'ТЭиРП-1901', 'ТАКХС-Пф-1202', 'ИСП-1309п', 'ТОиРА-1701п', 
        'ПКД-1808п', 'ТМ-1418п', 'СП-Пф-1604п',
        'ТЭО-Пф-2501', 'МЦМ-Пф-201', 'СП-Пф-2601', 'ТАКХС-Пф-2201', 
        'ТОРД-2706', 'ТМ-2415', 'ПКД-2806/07п', 'СП-Пф-2602п', 
        'ТОРД-2707п', 'ТМ-2416п', 'ИСП-2306п', 'ИСП-2307п',
        'ТАКХС-3202', 'СП-3611', 'ТМ-3413', 'МЦМ-308', 'ИСП-3304', 
        'ОСА-391', 'ТИК-311', 'ИСП-3305п', 'ТОРД-3705п', 'ПКД-3805п', 
        'СП-3612п', 'ТМ-3414п',
        'ТАКХС-4201', 'ТЭО-4510', 'СП-469', 'ТОРД-4703', 'ТМ-4412', 
        'МЦМ-407', 'ПКД-4803', 'ИСП-4303п', 'ТОРД-4704п', 'СП-4610п', 
        'ПКД-4804п'
    ]
    
    for group_name in groups_data:
        if not Group.query.filter_by(name=group_name).first():
            group = Group(name=group_name)
            db.session.add(group)
            print(f'✅ Создана группа: {group_name}')

if __name__ == '__main__':
    with app.app_context():
        try:
            # Импортируем все модели для создания таблиц
            from models import User, Student, Group, Grade, PortfolioFile, Complaint, Feedback, PageContent, News
            
            # Гарантируем, что все таблицы существуют
            print("🛠️ Проверка структуры базы данных...")
            db.create_all()
            print("✅ Таблицы готовы к работе")
            
            init_test_data()
            db.session.commit()
            print("✅ Тестовые данные инициализированы")
            
        except Exception as e:
            db.session.rollback()
            print(f"❌ Ошибка при инициализации базы данных: {e}")
            import traceback
            traceback.print_exc()
    
    print("🚀 Запуск сервера на http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
