import "./Card.css";
import { Link } from "react-router-dom";

export const Card = ({id, title, prise, adress, data, img }) => {
  return (
    <Link to={`/product/${id}`} className="card">
      <div className="card--img">
        <img src={img} alt="card-img" />
      </div>
      <h5 className="card--title">{title}</h5>

      <strong className="card--prise">{prise}</strong>

      <div className="card--desc-box">
        <span className="card--desc">{adress}</span>
        <span className="card--desc">{data}</span>
      </div>
    </Link>
  );
};
