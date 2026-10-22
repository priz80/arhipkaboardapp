import { Sidebar } from "../components/Sidebar/Sidebar";
import { getProductById } from "../services/products";
import { useParams } from "react-router-dom";

export const Product = () => {
  const { id } = useParams();
  const findProduct = getProductById(id);

  if (!findProduct) {
    return (
      <section className="content">
        <div className="container">
          <h2>Такого товара не существует!</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="content">
      <div className="container">
        <div className="content-box">
          <div className="content-product">
            <div className="content-product_info">
              <h2 className="content-product_title">{findProduct.title}</h2>

              <img
                className="content-product_img"
                src={findProduct.img}
                alt={findProduct.title}
              />
              <p className="content-product_text">
                {findProduct.description}
              </p>
            </div>
            <div className="content-product_prise">
              <h2 className="content-product_title-prise">
                {findProduct.prise}
              </h2>
              <button className="btn btn-primary btn-product">
                Показать телефон
              </button>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </section>
  );
};
