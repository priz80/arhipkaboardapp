import { Card } from "../components/Card/Card";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { useOutletContext } from "react-router-dom";

export const Home = () => {
  const { products, titleText } = useOutletContext();

  return (
    <section className="content">
      <div className="container">
        <div className="content-box">
          <div className="content-main">
            <h2 className="content-main_title">{titleText}</h2>
            <div className="content-main_list">
              {products.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  prise={card.prise}
                  adress={card.adress}
                  data={card.data}
                  img={card.img}
                />
              ))}
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </section>
  );
};
