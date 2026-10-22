import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { CategoryFilter } from "../components/CategoryFilter/CategoryFilter";
import { useSearch } from "../hooks/useSearch";
import { getAllProducts, getAllCategories } from "../services/products";

export const Layout = () => {
  const allProducts = getAllProducts();
  const categories = getAllCategories();

  const {
    searchText,
    filteredItems: products,
    titleText,
    selectedCategory,
    setSearchText,
    search,
    filterByCategory,
    clearSearch,
  } = useSearch(allProducts);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = () => {
    search(searchText, allProducts);
  };

  const handleCategorySelect = (categoryId) => {
    filterByCategory(categoryId, allProducts);
  };

  const handleClearSearch = () => {
    clearSearch(allProducts);
  };

  return (
    <>
      <Header />

      <main>
        <div className="container">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={handleCategorySelect}
          />

          <section className="search">
            <div className="search-box">
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                  }
                }}
                placeholder="Поиск по объявлениям"
              />
              <button
                className="btn search-clear"
                style={{ display: searchText ? "flex" : "none" }}
                onClick={handleClearSearch}
              >
                <span style={{ color: "gray", fontSize: "28px" }}>×</span>
              </button>
              <button
                className="btn btn-primary search-btn"
                onClick={handleSearchSubmit}
                disabled={!searchText}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/image/search.svg`}
                  className="search-btn_item"
                  alt="search"
                />
                <span className="search-btn_text">Найти</span>
              </button>
            </div>
          </section>
        </div>
        <Outlet context={{ products, titleText }} />
      </main>
    </>
  );
};
