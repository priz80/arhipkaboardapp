// Категории товаров (CommonJS для Node.js)
const categories = [
  { id: "all", name: "Все", slug: "all" },
  { id: "auto", name: "Авто", slug: "auto" },
  { id: "realty", name: "Недвижимость", slug: "realty" },
  { id: "electronics", name: "Электроника", slug: "electronics" },
  { id: "services", name: "Услуги", slug: "services" },
  { id: "clothing", name: "Одежда", slug: "clothing" },
];

// Моковые данные товаров (CommonJS для Node.js)
const cardArray = [
  {
    id: 1,
    title: "Электросамокат Kugoo G5",
    prise: "75 000 ₽",
    adress: "Казань, Вахитовский",
    data: "2026-07-10",
    img: "/image/card-img.jpg",
    description:
      "Продаю не спеша самокат в хорошем состоянии. Торг возможен. За период эксплуатации не выявлено ни одной проблемы. Из минусов — нужно прокачать задний тормоз. Установлен отсекатель сзади. Покрышки CST внедорожные. Все на подшипниках, болты протянуты. Пробег 881км, это немного для такого зверя.",
    category: "auto",
    status: "active",
  },
  {
    id: 2,
    title: "Квартира 2-комн., 54 м², 5/9 эт.",
    prise: "5 200 000 ₽",
    adress: "Казань, Кремлёвская",
    data: "2026-07-09",
    img: "/image/kugoo-img.jpg",
    description: "Просторная квартира с хорошим ремонтом. Рядом школа и магазины.",
    category: "realty",
    status: "active",
  },
  {
    id: 3,
    title: "iPhone 14 Pro 128GB",
    prise: "65 000 ₽",
    adress: "Казань, Вахитовский",
    data: "2026-07-08",
    img: "/image/card-img.jpg",
    description: "Состояние нового телефона. Полный комплект. Гарантия.",
    category: "electronics",
    status: "active",
  },
  {
    id: 4,
    title: "Ремонт квартир под ключ",
    prise: "от 5 000 ₽/м²",
    adress: "Казань и область",
    data: "2026-07-07",
    img: "/image/kugoo-img.jpg",
    description: "Выполняем все виды ремонтных работ. Опыт 10 лет. Договор.",
    category: "services",
    status: "active",
  },
  {
    id: 5,
    title: "Зимняя куртка Columbia",
    prise: "8 500 ₽",
    adress: "Казань, Ново-Савиновский",
    data: "2026-07-06",
    img: "/image/card-img.jpg",
    description: "Размер L. Носил один сезон. Тёплая, водонепроницаемая.",
    category: "clothing",
    status: "active",
  },
  {
    id: 6,
    title: "Samsung Galaxy S23",
    prise: "42 000 ₽",
    adress: "Казань, Советский",
    data: "2026-07-05",
    img: "/image/kugoo-img.jpg",
    description: "Состояние отличное. Батарея 95%. В комплекте чек и коробка.",
    category: "electronics",
    status: "active",
  },
];

module.exports = { cardArray, categories };
