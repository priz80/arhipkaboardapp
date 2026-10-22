-- =====================================================
-- База данных для boardposterapp
-- Создание БД и таблицы
-- =====================================================

-- Создаём базу данных
CREATE DATABASE IF NOT EXISTS boardposter DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE boardposter;

-- Таблица категорий
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица товаров
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  prise VARCHAR(50) NOT NULL,
  adress VARCHAR(255),
  data DATE,
  img VARCHAR(500),
  description TEXT,
  category_id INT,
  status ENUM('active', 'pending', 'archived') DEFAULT 'active',
  author_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  INDEX idx_category (category_id),
  INDEX idx_status (status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- Тестовые данные категорий
-- =====================================================

INSERT INTO categories (name, slug) VALUES
  ('Все', 'all'),
  ('Авто', 'auto'),
  ('Недвижимость', 'realty'),
  ('Электроника', 'electronics'),
  ('Услуги', 'services'),
  ('Одежда', 'clothing');

-- =====================================================
-- Тестовые данные товаров (из constants.js)
-- =====================================================

INSERT INTO products (title, prise, adress, data, img, description, category_id, status) VALUES
  ('Электросамокат Kugoo G5', '75 000 ₽', 'Казань, Вахитовский', '2026-07-10', '/image/card-img.jpg',
   'Продаю не спеша самокат в хорошем состоянии. Торг возможен. За период эксплуатации не выявлено ни одной проблемы.', 2, 'active'),
  
  ('Квартира 2-комн., 54 м², 5/9 эт.', '5 200 000 ₽', 'Казань, Кремлёвская', '2026-07-09', '/image/kugoo-img.jpg',
   'Просторная квартира с хорошим ремонтом. Рядом школа и магазины.', 3, 'active'),
  
  ('iPhone 14 Pro 128GB', '65 000 ₽', 'Казань, Вахитовский', '2026-07-08', '/image/card-img.jpg',
   'Состояние нового телефона. Полный комплект. Гарантия.', 4, 'active'),
  
  ('Ремонт квартир под ключ', 'от 5 000 ₽/м²', 'Казань и область', '2026-07-07', '/image/kugoo-img.jpg',
   'Выполняем все виды ремонтных работ. Опыт 10 лет. Договор.', 5, 'active'),
  
  ('Зимняя куртка Columbia', '8 500 ₽', 'Казань, Ново-Савиновский', '2026-07-06', '/image/card-img.jpg',
   'Размер L. Носил один сезон. Тёплая, водонепроницаемая.', 6, 'active'),
  
  ('Samsung Galaxy S23', '42 000 ₽', 'Казань, Советский', '2026-07-05', '/image/kugoo-img.jpg',
   'Состояние отличное. Батарея 95%. В комплекте чек и коробка.', 4, 'active');
