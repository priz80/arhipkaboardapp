#!/bin/bash

# =====================================================
# Скрипт деплоя arhipkaboardapp
# =====================================================

echo "🚀 Начинаю деплой..."

# Переходим в папку проекта
cd /var/www/pagelist_ru_usr/data/www/pagelist.ru/arhipka

# Забираем последние изменения
echo "📥 Забираем изменения из Git..."
git pull origin main

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm install
cd server && npm install && cd ..

# Собираем проект
echo "🔨 Собираем проект..."
npm run build

# Перезапускаем приложение через PM2
echo "🔄 Перезапускаем приложение..."
pm2 restart boardposterapp

# Проверяем статус
pm2 status

echo "✅ Деплой завершён успешно!"
echo "🌐 Сайт доступен: http://arhipka.pagelist.ru"
