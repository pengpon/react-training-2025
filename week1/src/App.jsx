import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

const API_URL = import.meta.env.VITE_API_URL;

const Product = ({ item }) => {
  const [isExpand, setIsExpand] = useState(false);
  const { title, price, origin_price, description, content, imageUrl } = item;

  const handleClick = () => {
    setIsExpand(!isExpand);
  };

  return (
    <>
      <div className="product-container">
        <div className="product-item">
          <div className="product-image">
            <img src={imageUrl} alt={title} />
          </div>
          <div className="product-info">
            <p className="product-info--title">{title}</p>
            <div className="product-info--price">
              <span className="price-sale">${price}</span>
              <span className="price-regular">${origin_price}</span>
            </div>
          </div>
          <div className="product-action">
            <button type="button" className="button" onClick={handleClick}>
              {isExpand ? (
                <div className="button-content">
                  <span>收合細節</span>
                  <span className="material-symbols-outlined">
                    expand_circle_up
                  </span>
                </div>
              ) : (
                <div className="button-content">
                  <span>展開細節</span>
                  <span className="material-symbols-outlined">
                    expand_circle_down
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
        {isExpand && (
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
        )}
      </div>
    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const res = await axios.get(`${API_URL}/root/products/all`);
        setProductsData(res.data.products);
      } catch (error) {
        console.error(error.message);
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchProductsData();
  }, []);

  return (
    <>
      <main className="main">
        <h1 className="main-title">查看產品列表 & 單一產品細節</h1>
        <div className="container">
          <div className="product-list">
            {isLoading && (
              <>
                <p className="status">資料載入中...</p>
              </>
            )}
            {isError && (
              <>
                <p className="status">無法取得資料</p>
              </>
            )}

            {productsData.map((product) => (
              <Product key={product.id} item={product} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
