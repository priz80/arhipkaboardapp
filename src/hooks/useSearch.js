import { useState, useCallback } from "react";

/**
 * Кастомный хук для поиска и фильтрации товаров
 * @param {Array} items - массив товаров для поиска
 * @returns {Object} - состояние поиска и функции
 */
export function useSearch(items = []) {
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [titleText, setTitleText] = useState("Все предложения");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Склонение слов: объявление/объявления/объявлений
  const getDeclension = useCallback((count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "объявлений";
    if (lastDigit === 1) return "объявление";
    if (lastDigit >= 2 && lastDigit <= 4) return "объявления";
    return "объявлений";
  }, []);

  // Выполнение поиска
  const search = useCallback(
    (searchValue, itemsToSearch) => {
      if (!searchValue.trim()) {
        setFilteredItems(itemsToSearch);
        setTitleText("Все предложения");
        return;
      }

      const lowerValue = searchValue.toLowerCase();
      const filtered = itemsToSearch.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerValue) ||
          item.prise.toLowerCase().includes(lowerValue)
      );

      setFilteredItems(filtered);
      setTitleText(
        `По Вашему запросу нашлось ${filtered.length} ${getDeclension(filtered.length)}`
      );
    },
    [getDeclension]
  );

  // Фильтрация по категории
  const filterByCategory = useCallback(
    (categoryId, itemsToSearch) => {
      setSelectedCategory(categoryId);

      if (categoryId === "all") {
        setFilteredItems(itemsToSearch);
        setTitleText("Все предложения");
        return;
      }

      const filtered = itemsToSearch.filter(
        (item) => item.category === categoryId
      );
      setFilteredItems(filtered);
      setTitleText(
        `Категория: ${filtered.length} ${getDeclension(filtered.length)}`
      );
    },
    [getDeclension]
  );

  // Очистка поиска и сброс категории
  const clearSearch = useCallback((itemsToSearch) => {
    setSearchText("");
    setFilteredItems(itemsToSearch);
    setTitleText("Все предложения");
    setSelectedCategory("all");
  }, []);

  // Сброс к исходному состоянию
  const reset = useCallback((itemsToSearch) => {
    setSearchText("");
    setFilteredItems(itemsToSearch);
    setTitleText("Все предложения");
    setSelectedCategory("all");
  }, []);

  return {
    searchText,
    filteredItems,
    titleText,
    selectedCategory,
    setSearchText,
    search,
    filterByCategory,
    clearSearch,
    reset,
  };
}
