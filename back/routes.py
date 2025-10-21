from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from extensions import db
from models import User, Student, Grade, Group, PortfolioFile, Complaint, Feedback
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import os
import uuid
from werkzeug.utils import secure_filename

# Настройки для загрузки файлов
UPLOAD_FOLDER = 'uploads/portfolio'
ALLOWED_EXTENSIONS = {'pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

auth_routes = Blueprint('auth', __name__)
student_routes = Blueprint('students', __name__)
complaint_routes = Blueprint('complaints', __name__)
feedback_routes = Blueprint('feedback', __name__)

# Аутентификация
@auth_routes.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print("Login attempt:", data.get('email'))
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email и пароль обязательны'}), 400
            
        user = User.query.filter_by(email=data.get('email')).first()
        
        if user and check_password_hash(user.password_hash, data.get('password')):
            access_token = create_access_token(identity=str(user.id))
            print(f"Login successful for user {user.id}, token created")
            return jsonify({
                'token': access_token,
                'user_id': user.id,
                'role': user.role
            })
        
        print("Login failed: invalid credentials")
        return jsonify({'error': 'Неверные учетные данные'}), 401
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({'error': f'Ошибка сервера: {str(e)}'}), 500

# Регистрация
@auth_routes.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print("Registration attempt:", data.get('email'))
        
        required_fields = ['email', 'password', 'full_name', 'phone', 'birth_date', 'group']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Поле {field} обязательно'}), 400
        
        if User.query.filter_by(email=data.get('email')).first():
            return jsonify({'error': 'Пользователь с таким email уже существует'}), 400
        
        user = User(
            email=data.get('email'),
            role='student'
        )
        user.set_password(data.get('password'))
        
        db.session.add(user)
        db.session.flush()
        print(f"User created with ID: {user.id}")
    
        group_name = data.get('group')
        group = Group.query.filter_by(name=group_name).first()
        if not group:
            group = Group(name=group_name)
            db.session.add(group)
            db.session.flush()
            print(f"Group created: {group_name}")
        
        student = Student(
            user_id=user.id,
            full_name=data.get('full_name'),
            phone=data.get('phone'),
            group_id=group.id
        )
        
        if data.get('birth_date'):
            try:
                student.birth_date = datetime.strptime(data.get('birth_date'), '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Неверный формат даты. Используйте YYYY-MM-DD'}), 400
        
        db.session.add(student)
        db.session.commit()
        
        access_token = create_access_token(identity=str(user.id))
        print(f"Registration successful, token created for user {user.id}")
        
        return jsonify({
            'token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'role': user.role,
                'full_name': student.full_name,
                'group': group.name
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Registration error: {str(e)}")
        return jsonify({'error': f'Ошибка регистрации: {str(e)}'}), 500
    
# В routes.py, в раздел аутентификации добавьте:
@auth_routes.route('/api/', methods=['GET'])
def api_root():
    return jsonify({
        'message': 'UNOST Backend API is running!', 
        'status': 'OK',
        'endpoints': {
            'login': '/api/login',
            'register': '/api/register',
            'students': '/api/students',
            'complaints': '/api/complaints',
            'feedback': '/api/feedback',
            'check-token': '/api/check-token'
        }
    })



# Получить профиль студента
@student_routes.route('/api/students/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        user_id = get_jwt_identity()
        print(f"Profile request for user_id: {user_id}")
        
        student = Student.query.filter_by(user_id=int(user_id)).first()
        
        if not student:
            print(f"Student not found for user_id: {user_id}")
            return jsonify({'error': 'Профиль студента не найден'}), 404
        
        print(f"Profile found for: {student.full_name}")
        return jsonify({
            'id': student.id,
            'full_name': student.full_name,
            'email': student.user.email,
            'phone': student.phone,
            'birth_date': student.birth_date.isoformat() if student.birth_date else None,
            'group': student.group.name if student.group else None,
            'group_id': student.group_id,
            'user_id': student.user_id
        })
    except Exception as e:
        print(f"Profile error: {str(e)}")
        return jsonify({'error': f'Ошибка загрузки профиля: {str(e)}'}), 500

# Тестовый маршрут для проверки JWT
@auth_routes.route('/api/check-token', methods=['GET'])
@jwt_required()
def check_token():
    user_id = get_jwt_identity()
    return jsonify({'message': 'Token is valid', 'user_id': user_id})

# Корневой маршрут
@auth_routes.route('/', methods=['GET'])
def root():
    return jsonify({
        'message': 'UNOST Backend is running!', 
        'status': 'OK',
        'endpoints': {
            'login': '/api/login',
            'register': '/api/register',
            'students': '/api/students',
            'test': '/api/test',
            'check-token': '/api/check-token'
        }
    })

# Эндпоинт для отладки JWT
@auth_routes.route('/api/debug-token', methods=['POST'])
def debug_token():
    try:
        data = request.get_json()
        token = data.get('token')
        print(f"🔐 Отладка токена: {token}")
        
        if not token:
            return jsonify({'error': 'Токен не предоставлен'}), 400
        
        from flask_jwt_extended import decode_token
        try:
            decoded = decode_token(token)
            print(f"✅ Токен декодирован: {decoded}")
            return jsonify({
                'status': 'valid',
                'decoded': decoded
            }), 200
        except Exception as e:
            print(f"❌ Ошибка декодирования: {str(e)}")
            return jsonify({
                'status': 'invalid',
                'error': str(e)
            }), 422
            
    except Exception as e:
        return jsonify({'error': f'Ошибка отладки: {str(e)}'}), 500

# Маршруты для портфолио
@student_routes.route('/api/students/portfolio', methods=['GET'])
@jwt_required()
def get_portfolio_files():
    try:
        current_user_id = get_jwt_identity()
        student = Student.query.filter_by(user_id=int(current_user_id)).first()
        
        if not student:
            return jsonify({'error': 'Студент не найден'}), 404
        
        portfolio_files = PortfolioFile.query.filter_by(student_id=student.id).all()
        return jsonify([file.to_dict() for file in portfolio_files])
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@student_routes.route('/api/students/portfolio', methods=['POST'])
@jwt_required()
def upload_portfolio_file():
    try:
        current_user_id = get_jwt_identity()
        student = Student.query.filter_by(user_id=int(current_user_id)).first()
        
        if not student:
            return jsonify({'error': 'Студент не найден'}), 404
        
        if 'file' not in request.files:
            return jsonify({'error': 'Файл не найден'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'Файл не выбран'}), 400
        
        if file and allowed_file(file.filename):
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            
            file_id = str(uuid.uuid4())
            original_filename = secure_filename(file.filename)
            file_extension = original_filename.rsplit('.', 1)[1].lower()
            saved_filename = f"{file_id}.{file_extension}"
            
            file_path = os.path.join(UPLOAD_FOLDER, saved_filename)
            file.save(file_path)
            
            portfolio_file = PortfolioFile(
                filename=original_filename,
                saved_filename=saved_filename,
                file_size=os.path.getsize(file_path),
                student_id=student.id
            )
            
            db.session.add(portfolio_file)
            db.session.commit()
            
            return jsonify(portfolio_file.to_dict()), 201
        
        return jsonify({'error': 'Недопустимый тип файла'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@student_routes.route('/api/students/portfolio/<int:file_id>/download', methods=['GET'])
@jwt_required()
def download_portfolio_file(file_id):
    try:
        current_user_id = get_jwt_identity()
        student = Student.query.filter_by(user_id=int(current_user_id)).first()
        
        if not student:
            return jsonify({'error': 'Студент не найден'}), 404
        
        portfolio_file = PortfolioFile.query.filter_by(id=file_id, student_id=student.id).first()
        
        if not portfolio_file:
            return jsonify({'error': 'Файл не найден'}), 404
        
        file_path = os.path.join(UPLOAD_FOLDER, portfolio_file.saved_filename)
        
        if not os.path.exists(file_path):
            return jsonify({'error': 'Файл не найден на сервере'}), 404
        
        return send_file(file_path, as_attachment=True, download_name=portfolio_file.filename)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@student_routes.route('/api/students/portfolio/<int:file_id>', methods=['DELETE'])
@jwt_required()
def delete_portfolio_file(file_id):
    try:
        current_user_id = get_jwt_identity()
        student = Student.query.filter_by(user_id=int(current_user_id)).first()
        
        if not student:
            return jsonify({'error': 'Студент не найден'}), 404
        
        portfolio_file = PortfolioFile.query.filter_by(id=file_id, student_id=student.id).first()
        
        if not portfolio_file:
            return jsonify({'error': 'Файл не найден'}), 404
        
        file_path = os.path.join(UPLOAD_FOLDER, portfolio_file.saved_filename)
        if os.path.exists(file_path):
            os.remove(file_path)
        
        db.session.delete(portfolio_file)
        db.session.commit()
        
        return jsonify({'message': 'Файл удален'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Получить IP адрес пользователя
def get_client_ip():
    if request.environ.get('HTTP_X_FORWARDED_FOR'):
        return request.environ['HTTP_X_FORWARDED_FOR'].split(',')[0]
    else:
        return request.environ.get('HTTP_X_REAL_IP', request.remote_addr)

# Эндпоинт для создания жалобы
@complaint_routes.route('/api/complaints', methods=['POST'])
def create_complaint():
    try:
        data = request.get_json()
        
        if not data or not data.get('complaint_text'):
            return jsonify({'error': 'Текст жалобы обязателен'}), 400
        
        # Получаем IP и User-Agent
        ip_address = get_client_ip()
        user_agent = request.headers.get('User-Agent', 'Не указан')
        
        complaint = Complaint(
            ip_address=ip_address,
            user_agent=user_agent,
            complaint_text=data.get('complaint_text')
        )
        
        db.session.add(complaint)
        db.session.commit()
        
        return jsonify({
            'message': 'Жалоба успешно отправлена',
            'complaint_id': complaint.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Ошибка при отправке жалобы: {str(e)}'}), 500

# Эндпоинт для получения всех жалоб (только для админов)
@complaint_routes.route('/api/complaints', methods=['GET'])
@jwt_required()
def get_all_complaints():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(int(current_user_id))
        
        if not user or user.role != 'admin':
            return jsonify({'error': 'Доступ запрещен'}), 403
        
        complaints = Complaint.query.order_by(Complaint.created_at.desc()).all()
        return jsonify([complaint.to_dict() for complaint in complaints])
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Эндпоинт для получения статистики по жалобам (только для админов)
@complaint_routes.route('/api/complaints/stats', methods=['GET'])
@jwt_required()
def get_complaints_stats():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(int(current_user_id))
        
        if not user or user.role != 'admin':
            return jsonify({'error': 'Доступ запрещен'}), 403
        
        total_complaints = Complaint.query.count()
        
        # Жалобы за последние 7 дней
        week_ago = datetime.utcnow() - timedelta(days=7)
        recent_complaints = Complaint.query.filter(Complaint.created_at >= week_ago).count()
        
        return jsonify({
            'total_complaints': total_complaints,
            'recent_complaints': recent_complaints
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Эндпоинт для создания обратной связи
@feedback_routes.route('/api/feedback', methods=['POST'])
def create_feedback():
    try:
        data = request.get_json()
        
        if not data or not data.get('name') or not data.get('email') or not data.get('message'):
            return jsonify({'error': 'Все поля обязательны для заполнения'}), 400
        
        # Получаем IP и User-Agent
        ip_address = get_client_ip()
        user_agent = request.headers.get('User-Agent', 'Не указан')
        
        feedback = Feedback(
            name=data.get('name'),
            email=data.get('email'),
            message=data.get('message'),
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        db.session.add(feedback)
        db.session.commit()
        
        return jsonify({
            'message': 'Форма обратной связи успешно отправлена',
            'feedback_id': feedback.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Ошибка при отправке формы: {str(e)}'}), 500

# Эндпоинт для получения всех форм обратной связи (только для админов)
@feedback_routes.route('/api/feedback', methods=['GET'])
@jwt_required()
def get_all_feedback():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(int(current_user_id))
        
        if not user or user.role != 'admin':
            return jsonify({'error': 'Доступ запрещен'}), 403
        
        feedback_list = Feedback.query.order_by(Feedback.created_at.desc()).all()
        return jsonify([feedback.to_dict() for feedback in feedback_list])
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Эндпоинт для получения статистики по обратной связи (только для админов)
@feedback_routes.route('/api/feedback/stats', methods=['GET'])
@jwt_required()
def get_feedback_stats():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(int(current_user_id))
        
        if not user or user.role != 'admin':
            return jsonify({'error': 'Доступ запрещен'}), 403
        
        total_feedback = Feedback.query.count()
        
        # Формы за последние 7 дней
        week_ago = datetime.utcnow() - timedelta(days=7)
        recent_feedback = Feedback.query.filter(Feedback.created_at >= week_ago).count()
        
        return jsonify({
            'total_feedback': total_feedback,
            'recent_feedback': recent_feedback
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500