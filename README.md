# boardposterapp

React-приложение — витрина объявлений с фильтрацией по категориям и поиском.

## 📦 Стек технологий

### Frontend
- **React 19** — UI-фреймворк
- **React Router DOM 7** — роутинг
- **Create React App** — сборка и dev-сервер
- **CSS** — стили (BEM-подобная методология)

### Backend (для деплоя на VPS)
- **Node.js + Express** — API сервер
- **MySQL** — база данных
- **PM2** — менеджер процессов
- **Nginx** — веб-сервер

## 🏗 Архитектура

```
src/
├── index.js                    # Точка входа + роутинг + lazy loading
├── index.css                   # Глобальные стили
├── constants.js                # Моковые данные + категории
├── hooks/
│   └── useSearch.js            # Хук поиска и фильтрации
├── services/
│   └── products.js             # Слой данных (API-заглушки)
├── components/
│   ├── Card/                   # Карточка товара
│   ├── Header/                 # Шапка сайта
│   ├── Sidebar/                # Сайдбар "Сервисы и услуги"
│   └── CategoryFilter/         # Фильтр по категориям
├── layouts/
│   └── Layout.jsx              # Layout-обёртка + поиск + категории
└── pages/
    ├── Home.jsx                # Главная страница
    └── Product.jsx             # Страница товара

server/
├── index.js                    # Express сервер
├── routes/
│   ├── products.js             # API товаров
│   └── categories.js           # API категорий
├── bot/
│   └── maxBot.js               # Интеграция с ботом в Макс
└── database/
    └── dump.sql                # SQL дамп для MySQL

ecosystem.config.js             # PM2 конфиг
deploy.sh                       # Скрипт деплоя
```

## 📋 Запуск локально

### Frontend только

```bash
npm install
npm start
```

Откроется http://localhost:3000

### С сервером (для разработки API)

```bash
# Frontend
npm start

# Backend (в другом терминале)
cd server
npm install
node index.js
```

### Production сборка

```bash
npm run build
```

Собранные файлы находятся в папке `build/`.

## 🚀 Деплой на VPS (Ubuntu 24.04)

### Требования

- VPS сервер с Ubuntu 24.04
- MySQL установлен
- Домен arhipka.pagelist.ru

### Пошаговая инструкция

#### 1. Подключение к серверу

```bash
ssh root@5.188.30.56
```

#### 2. Установка Node.js и PM2

```bash
# Обновление системы
apt update && apt upgrade -y

# Установка Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Установка PM2
npm install -g pm2

# Проверка версий
node --version
npm --version
```

#### 3. Создание базы данных

```bash
# Создание БД и импорт данных
mysql -u root -p < server/database/dump.sql
```

#### 4. Клонирование репозитория

```bash
mkdir -p /var/www/boardposterapp
cd /var/www/boardposterapp
git clone https://github.com/priz80/boardposterapp.git .
```

#### 5. Установка зависимостей

```bash
npm install
cd server && npm install && cd ..
```

#### 6. Сборка проекта

```bash
npm run build
```

#### 7. Настройка PM2

```bash
# Копируем конфиг PM2
cp ecosystem.config.js /var/www/boardposterapp/

# Запускаем приложение
pm2 start ecosystem.config.js

# Сохраняем конфигурацию
pm2 save

# Добавляем автозапуск
pm2 startup
```

#### 8. Настройка Nginx

Создаём конфиг `/etc/nginx/sites-available/boardposterapp`:

```nginx
server {
    listen 80;
    server_name arhipka.pagelist.ru;

    root /var/www/boardposterapp/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
}
```

Активируем:

```bash
ln -s /etc/nginx/sites-available/boardposterapp /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

#### 9. Настройка DNS

В панели управления доменом создаём DNS запись:

```
Тип: A
Имя: arhipka
Значение: 5.188.30.56
TTL: 3600
```

#### 10. Деплой

```bash
# Запуск скрипта деплоя
/var/www/boardposterapp/deploy.sh
```

## 📝 Основные функции

- **Поиск товаров** — фильтрация по названию и цене
- **Фильтрация по категориям** — Авто, Недвижимость, Электроника, Услуги, Одежда
- **Склонение слов** — автоматическое определение формы ("1 объявление", "2 объявления", "5 объявлений")
- **Кнопка очистки поиска** — появляется при вводе текста
- **Страница товара** — детальный просмотр по ID
- **Lazy loading** — разделение кода на чанки для каждой страницы

## 🔧 Структура данных

### Товары

```js
{
  id: number,
  title: string,      // Название
  prise: string,      // Цена
  adress: string,     // Адрес
  data: string,       // Дата
  img: string,        // Путь к изображению
  description: string,// Описание
  category: string,   // Категория (auto, realty, electronics, services, clothing)
  status: string      // Статус (active, pending, archived)
}
```

### Категории

```js
[
  { id: "all", name: "Все", slug: "all" },
  { id: "auto", name: "Авто", slug: "auto" },
  { id: "realty", name: "Недвижимость", slug: "realty" },
  { id: "electronics", name: "Электроника", slug: "electronics" },
  { id: "services", name: "Услуги", slug: "services" },
  { id: "clothing", name: "Одежда", slug: "clothing" }
]
```

## 🤖 Бот в Макс

### API для публикации

```bash
# Публикация объявления
curl -X POST http://arhipka.pagelist.ru:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Новый товар",
    "prise": "1000 ₽",
    "adress": "Казань",
    "description": "Описание",
    "category": "auto",
    "botUserId": "user123"
  }'
```

### Получение данных

```bash
# Все товары
curl http://arhipka.pagelist.ru:3000/api/products

# С фильтром по категории
curl "http://arhipka.pagelist.ru:3000/api/products?category=auto"

# Поиск
curl "http://arhipka.pagelist.ru:3000/api/products?search=самокат"

# Категории
curl http://arhipka.pagelist.ru:3000/api/categories

# Один товар
curl http://arhipka.pagelist.ru:3000/api/products/1
```

## 📦 Зависимости

```json
{
  "react": "^19.3.1",
  "react-dom": "^19.3.1",
  "react-router-dom": "^7.18.4",
  "react-scripts": "5.0.1"
}
```

## 🔮 Планы развития

- [x] Фильтрация по категориям
- [x] Backend на Node.js/Express
- [x] MySQL база данных
- [ ] Интеграция с ботом в Макс
- [ ] Авторизация пользователей
- [ ] Загрузка изображений
- [ ] Пагинация и сортировка
