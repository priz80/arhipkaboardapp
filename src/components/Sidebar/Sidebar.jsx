import { Link } from "react-router-dom";

const sidebarServices = [
  {
    img: `${process.env.PUBLIC_URL}/image/side-img_truck.svg`,
    imgAlt: "side-img_truck",
    title: "Доставка",
    text: "Проверка при получении и возможность бесплатно вернуть товар",
  },
  {
    img: `${process.env.PUBLIC_URL}/image/side-img_sedan.svg`,
    imgAlt: "side-img_sedan",
    title: "Автотека",
    text: "Отчёт с историей авто: пробег, владельцы, сведения о залоге, ДТП и ремонтах",
  },
  {
    img: `${process.env.PUBLIC_URL}/image/side-img_love.svg`,
    imgAlt: "side-img_build",
    title: "Онлайн-бронирование жилья",
    text: "Посуточная аренда квартир и домов: большой выбор вариантов для поездок по России",
  },
];

export const Sidebar = () => {
  return (
    <div className="content-side">
      <h3 className="content-side_title">Сервисы и услуги</h3>

      <div className="content-side_box">
        <div className="content-side_list">
          {sidebarServices.map((service, index) => (
            <div key={index} className="content-side_list-item">
              <img
                className="content-side_list-item--img"
                src={service.img}
                alt={service.imgAlt}
              />
              <h5 className="content-side_list-item--title">
                {service.title}
              </h5>
              <p className="content-side_list-item--text">
                {service.text}
              </p>
            </div>
          ))}
        </div>

        <div className="content-side_footer">
          <p className="content-side_footer-item">
            © ООО «Абито», 2026
          </p>
          <Link to="/" className="content-side_footer-item">
            Политика конфиденциальности
          </Link>
          <Link to="/" className="content-side_footer-item">
            Обработка данных
          </Link>
        </div>
      </div>
    </div>
  );
};
