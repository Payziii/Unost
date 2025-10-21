import requests
import json

BASE_URL = "http://localhost:5000"

def test_jwt_flow():
    print("=== ТЕСТИРОВАНИЕ JWT ===")
    
    # 1. Тест корневого endpoint
    print("1. Тест корневого endpoint...")
    response = requests.get(BASE_URL)
    print(f"   Status: {response.status_code}, Response: {response.json()}")
    
    # 2. Регистрация нового пользователя
    print("2. Регистрация пользователя...")
    reg_data = {
        "email": "test_jwt@example.com",
        "password": "test123",
        "full_name": "Тестовый JWT Пользователь",
        "phone": "+79998887766",
        "birth_date": "2000-01-01",
        "group": "ТМ-1417"
    }
    
    response = requests.post(f"{BASE_URL}/api/register", json=reg_data)
    print(f"   Status: {response.status_code}")
    if response.status_code == 201:
        data = response.json()
        token = data['token']
        print(f"   ✅ Токен получен: {token[:50]}...")
        
        # 3. Проверка токена
        print("3. Проверка токена...")
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{BASE_URL}/api/check-token", headers=headers)
        print(f"   Status: {response.status_code}, Response: {response.json()}")
        
        # 4. Получение профиля
        print("4. Получение профиля...")
        response = requests.get(f"{BASE_URL}/api/students/profile", headers=headers)
        print(f"   Status: {response.status_code}, Response: {response.json()}")
    else:
        print(f"   ❌ Ошибка регистрации: {response.json()}")
    
    # 5. Тест входа
    print("5. Тест входа...")
    login_data = {
        "email": "test_jwt@example.com",
        "password": "test123"
    }
    response = requests.post(f"{BASE_URL}/api/login", json=login_data)
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        token = data['token']
        print(f"   ✅ Токен входа получен: {token[:50]}...")
        
        # 6. Проверка токена после входа
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{BASE_URL}/api/check-token", headers=headers)
        print(f"   Status: {response.status_code}, Response: {response.json()}")

if __name__ == "__main__":
    test_jwt_flow()