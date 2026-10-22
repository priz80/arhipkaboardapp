import { cardArray, categories } from "../constants";

/**
 * Слой данных для работы с товарами
 * В будущем можно заменить на API-запросы к MySQL
 */

// Получить все товары с фильтрацией
export const getAllProducts = (filters = {}) => {
  let products = [...cardArray];

  // Фильтрация по категории
  if (filters.category && filters.category !== "all") {
    products = products.filter((p) => p.category === filters.category);
  }

  // Фильтрация по статусу (только активные)
  products = products.filter((p) => p.status === "active");

  return products;
};

// Получить одну категорию
export const getCategoryById = (id) => {
  return categories.find((c) => c.id === id);
};

// Получить все категории
export const getAllCategories = () => {
  return categories;
};

// Найти товар по ID
export const getProductById = (id) => {
  return cardArray.find((p) => p.id === +id && p.status === "active");
};

// Поиск товаров по тексту
export const searchProducts = (searchText, itemsToSearch = cardArray) => {
  if (!searchText.trim()) {
    return getAllProducts();
  }

  const lowerValue = searchText.toLowerCase();
  return itemsToSearch.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerValue) ||
      item.prise.toLowerCase().includes(lowerValue)
  );
};

// Получить количество товаров
export const getProductCount = () => {
  return cardArray.filter((p) => p.status === "active").length;
};
