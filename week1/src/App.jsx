import "./App.scss";

function App() {
  return (
    <>
      <main className="main">
        <h1 className="main-title">查看產品列表 & 單一產品細節</h1>
        <div className="container">
          <div className="product-list">
            <div className="product-container">
              <div className="product-item">
                <div className="product-image">
                  <img
                    src="https://storage.googleapis.com/vue-course-api.appspot.com/root/1766909565058.jpg"
                    alt="apple"
                  />
                </div>
                <div className="product-info">
                  <p className="product-info--title">
                    清甜爽脆新鮮蘋果（1 顆）
                  </p>
                  <div className="product-info--price">
                    <span className="price-sale">$30</span>
                    <span className="price-regular">$30</span>
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
                  <span className="content">
                    含有膳食纖維與多酚，來自新鮮產地，口感清脆。
                  </span>
                </span>
                <span>
                  <span className="title">食用方式：</span>
                  <span className="content">適合直接食用或入甜點。</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
