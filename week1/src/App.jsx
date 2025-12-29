import "./App.scss";

function Product({ item }) {
  const { title, price, origin_price, description, content, imageUrl } = item;
  return (
    <>
      <div className="product-container">
        <div className="product-item">
          <div className="product-image">
            <img
              src={imageUrl}
              alt="apple"
            />
          </div>
          <div className="product-info">
            <p className="product-info--title">{title}</p>
            <div className="product-info--price">
              <span className="price-sale">${price}</span>
              <span className="price-regular">${origin_price}</span>
            </div>
          </div>
          <div className="product-action">
            <button type="button" className="button">
              <span className="button-content">展開細節</span>
            </button>
          </div>
        </div>
        <div className="product-detail">
          <span>
            <span className="title">產品描述：</span>
            <span className="content">{description}</span>
          </span>
          <span>
            <span className="title">食用方式：</span>
            <span className="content">{content}</span>
          </span>
        </div>
      </div>
    </>
  );
}

function App() {
  const products = [
    {
      title: "花椰菜",
      description:
        "富含膳食纖維與植化素，來自當季新鮮採收的產地，保留蔬菜最原始的營養。",
      content: "適合清炒、蒸煮或作為沙拉配菜。",
      category: "vegetable",
      unit: "顆",
      origin_price: 80,
      price: 65,
      imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/root/1766909689321.jpg"
    },
    {
      title: "玉米",
      description: "含有天然碳水化合物與膳食纖維，新鮮採收，保留自然香甜風味。",
      content: "可水煮、烤製或加入湯品。",
      category: "vegetable",
      unit: "條",
      origin_price: 45,
      price: 38,
      imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/root/1766909464300.jpg"
    },
    {
      title: "蘋果",
      description: "含有膳食纖維與多酚，來自新鮮產地，口感清脆。",
      content: "適合直接食用或入甜點。",
      category: "fruit",
      unit: "顆",
      origin_price: 60,
      price: 52,
      imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/root/1766909689321.jpg"
    },
    {
      title: "香蕉",
      description: "富含鉀與天然糖分，成熟採收，口感溫和順口。",
      content: "可直接食用或製作奶昔。",
      category: "fruit",
      unit: "條",
      origin_price: 25,
      price: 20,
      imageUrl: "https://storage.googleapis.com/vue-course-api.appspot.com/root/1766909464300.jpg"

    },
  ];

  return (
    <>
      <main className="main">
        <h1 className="main-title">查看產品列表 & 單一產品細節</h1>
        <div className="container">
          <div className="product-list">
            {products.map((product) => (
              <Product item={product} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
