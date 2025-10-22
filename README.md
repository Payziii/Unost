# Unost

## Быстрый старт фронтенда

1. Установите [Node.js](https://nodejs.org).
2. Склонируйте репозиторий и перейдите в корень проекта.
3. Установите зависимости: `npm install`.
4. Запустите dev-сервер: `npm run dev`.
5. Для сборки продакшен-версии выполните: `npm run build`.

## Запуск бэкенда

1. Перейдите в каталог `back`: `cd back`.
2. Создайте виртуальное окружение (опционально, но рекомендуется):
   - Windows: `python -m venv venv`
   - macOS/Linux: `python3 -m venv venv`
3. Активируйте окружение:
   - Windows: `.\venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
4. Установите зависимости: `pip install -r requirements.txt`.
5. Запустите сервер: `python run.py`.
6. Бэкенд будет доступен по адресу `http://localhost:5000`. При первом запуске создаётся администратор `admin@college.ru / admin123`.

## Структура проекта

- `public/` — статические ресурсы.
- `src/assets/` — стили и медиа.
- `src/components/` — Vue-компоненты.
- `src/router/` — маршрутизация.
- `src/views/` — страницы приложения.
