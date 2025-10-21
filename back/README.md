# Unost-backend
BackEnd for https://github.com/Payziii/Unost

## Установка и запуск

1.  Установить Python 3.12.7 https://www.python.org/ftp/python/3.12.7/python-3.12.7-amd64.exe

2.  Установить SQLite https://sqlite.org/download.html

3.  Клонировать репозиторий `git clone https://github.com/Ab4kshin/Unost-backend.git`

4.  Создать папку *instance* для бд

5.  Создать виртуальное окружение `python -m venv .venv` 

6.  Активировать виртуальное окружение `.\.venv\Scripts\activate.bat` или `.\.venv\Scripts\Activate.ps1`

7.  Установить зависимости `pip install -r requirements.txt`
        Если что то ещё отсутсвует то `pip install ` и название модуля

8.  Создать файл .env и вписать:
        DATABASE_URL=sqlite:///instance/unost.db
        SECRET_KEY=ваш-сгенерированный-секретный-ключ
        JWT_SECRET_KEY=ёщё-другой-ваш-сгенерированный-секретный-ключ

9.  Запустить проект командой `python run.py`

10. Приложение доступно по адресу: http://localhost:5000

## Структура

**Основные файлы**

`123.py` - скрипт для создания секретных ключей

`app.py` - главный файл приложения Flask, содержит конфигурацию и инициализацию

`create_groups.py` - создание групп для бд

`models.py` - модели базы данных (User, Student, Group, Grade)

`routes.py` - API endpoints (авторизация, регистрация, работа со студентами)

`run.py` - скрипт запуска приложения, создает БД и тестовые данные

**Вспомогательные файлы**

`requirements.txt` - зависимости Python

`.env` - конфигурация (ключи, настройки БД)

`create_groups.py` - скрипт создания учебных групп

`test_jwt.py` - тестирование JWT аутентификации

`instance/unost.db` - база данных SQLite