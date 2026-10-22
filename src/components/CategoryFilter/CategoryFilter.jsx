import "./CategoryFilter.css";

export const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="category-filter">
      <nav className="category-filter_nav">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-filter_btn ${
              selectedCategory === cat.id ? "category-filter_btn--active" : ""
            }`}
            onClick={() => onSelect(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </nav>
    </div>
  );
};
