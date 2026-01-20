import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../api/products";
import ProductTable from "../components/ProductTable";

function ProductList() {
  const [productsData, setProductsData] = useState([]);

  const columns = [
    { header: "產品", key: "summary" },
    { header: "分類", key: "category" },
    { header: "原價", key: "origin_price" },
    { header: "售價", key: "price" },
    { header: "狀態", key: "is_enabled" },
    { header: "動作", key: "actions" },
  ];

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
      <ProductTable columns={columns} data={productsData} />
    </>
  );
}

export default ProductList;
