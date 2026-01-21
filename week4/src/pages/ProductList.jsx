import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../api/products";
import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";
import ProductItem from "../components/ProductItem";

function ProductList() {
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openCreateModal = () => {
    setSelectProduct(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (id) => {
    const [item] = productsData.filter((product) => product.id === id);
    setSelectProduct(item);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    // TODO: create new product or edit item
    console.log(data)
    setIsModalOpen(false);
  }
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
              onClick={openCreateModal}
            >
              新增產品
            </button>
          </div>
          <div className="mb-10">
            <ProductTable
              columns={columns}
              data={productsData}
              openEditModal={openEditModal}
            />
          </div>
          <Pagination />
        </div>
        {isModalOpen && (
          <ProductItem
            isEditMode={isEditMode}
            closeModal={closeModal}
            data={selectedProduct}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
}

export default ProductList;
