import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../api/products";
import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";
import ProductItem from "../components/ProductItem";
import Alert from "../components/Alert";

function ProductList() {
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const columns = [
    { header: "產品", key: "summary" },
    { header: "分類", key: "category" },
    { header: "原價", key: "origin_price" },
    { header: "售價", key: "price" },
    { header: "狀態", key: "is_enabled" },
    { header: "動作", key: "actions" },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onActionClick = (type, id) => {
    const item = productsData.find((product) => product.id === id) || {};
    setSelectProduct(item);

    switch (type) {
      case "create":
        setIsEditMode(false);
        setIsModalOpen(true);
        break;
      case "edit":
        setIsEditMode(true);
        setIsModalOpen(true);
        break;
      case "delete":
        setIsAlertOpen(true);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (data) => {
    // TODO: 串新增 / 編輯 API
    console.log(data);
    // 成功關閉, 失敗保持開啟
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    // TODO: 串 delete API
  };

  const getProductByQuery = useCallback(async (page, category) => {
    const res = await fetchProducts(page, category);

    setProductsData(res.data.products);
  }, []);

  useEffect(() => {
    const init = () => {
      getProductByQuery(1);
    };
    init();
  }, [getProductByQuery]);

  return (
    <>
      <div className="w-screen h-screen p-10 bg-secondary/60 ">
        <div className="relative overflow-x-auto px-10 py-8 bg-white shadow-xs rounded-main">
          <div className="flex flex-column flex-row flex-wrap mb-10 items-center ">
            <button
              type="button"
              className="btn-primary"
              onClick={(e) => onActionClick(e.target.dataset.type, "")}
              data-type="create"
            >
              新增產品
            </button>
          </div>
          <div className="mb-10">
            <ProductTable
              columns={columns}
              data={productsData}
              onActionClick={onActionClick}
            />
          </div>
          <Pagination />
        </div>
        {isModalOpen && (
          <ProductItem
            isEditMode={isEditMode}
            data={selectedProduct}
            onSubmit={handleSubmit}
            closeModal={closeModal}
          />
        )}
        {isAlertOpen && (
          <Alert
            data={selectedProduct}
            onConfirm={handleDelete}
            onCancel={() => setIsAlertOpen(false)}
          />
        )}
      </div>
    </>
  );
}

export default ProductList;
