// =====================================================
// Бот для публикации объявлений в Макс
// =====================================================
// Этот файл будет использоваться для интеграции
// с платформой "Макс" для публикации объявлений
// =====================================================

const API_URL = process.env.NODE_ENV === "production"
  ? "http://5.188.30.56:3000"
  : "http://localhost:3000";

/**
 * Отправить объявление через бота
 * @param {Object} data - данные объявления
 * @param {string} data.title - название
 * @param {string} data.prise - цена
 * @param {string} data.adress - адрес
 * @param {string} data.description - описание
 * @param {string} data.category - категория (auto, realty, electronics, services, clothing)
 * @param {string} data.img - путь к изображению
 * @param {string} data.botUserId - ID пользователя в Макс
 * @returns {Promise<Object>} - результат публикации
 */
export const publishAd = async (data) => {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Bot-Source": "max",
      },
      body: JSON.stringify({
        ...data,
        botUserId: data.botUserId,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Ошибка публикации");
    }

    return {
      success: true,
      message: result.message,
      productId: result.data.id,
    };
  } catch (error) {
    console.error("Ошибка публикации:", error);
    return {
      success: false,
      message: error.message || "Не удалось опубликовать объявление",
    };
  }
};

/**
 * Получить список категорий
 * @returns {Promise<Array>} - массив категорий
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/api/categories`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Ошибка получения категорий:", error);
    return [];
  }
};

/**
 * Получить все объявления
 * @param {Object} filters - фильтры
 * @returns {Promise<Array>} - массив объявлений
 */
export const getAds = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/api/products?${params}`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Ошибка получения объявлений:", error);
    return [];
  }
};

/**
 * Получить одно объявление по ID
 * @param {number} id - ID объявления
 * @returns {Promise<Object|null>} - объявление или null
 */
export const getAdById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Ошибка получения объявления:", error);
    return null;
  }
};
