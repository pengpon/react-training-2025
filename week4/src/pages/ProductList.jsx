import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchProducts,
  createProduct,
  editProduct,
  deleteProduct,
} from "../api/products";
import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";
import ProductItem from "../components/ProductItem";
import Alert from "../components/Alert";
import { uploadImage } from "../api/upload";
import Toast from "../utils/swal";

function ProductList() {
  const pageRef = useRef(null);
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [pagination, setPagination] = useState({
    current: null,
    total: null,
  });

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
    const { current_page: current, total_pages: total } = res.data.pagination;
    setPagination({ current, total });
    setProductsData(res.data.products);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onActionClick = (type, id) => {
    const item = productsData.find((product) => product.id === id) || {};
    setSelectedProduct(item);

    switch (type) {
      case "create":
        setIsEdit(false);
        setIsModalOpen(true);
        break;
      case "edit":
        setIsEdit(true);
        setIsModalOpen(true);
        break;
      case "delete":
        setIsAlertOpen(true);
        break;
      default:
        break;
    }
  };

  // TODO: check size
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadImage(formData);
      const url = res.data.imageUrl;
      setSelectedProduct({ ...selectedProduct, imageUrl: url });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleOnInputChange = (e) => {
    let { name, value } = e.target;
    // 特定欄位 value 處理
    if (name === "is_enabled") value = e.target.checked ? true : false;
    if (name === "price" || name === "origin_price") value = Number(value);

    setSelectedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedProduct) return;
    const { id, ...data } = { ...selectedProduct };
    let res;

    try {
      if (isEdit) {
        res = await editProduct(id, data);
      } else {
        res = await createProduct(data);
      }

      Toast.fire({
        position: "top",
        icon: "success",
        title: res.data.message,
        color: "#fff",
        iconColor: "#fff",
        background: "#80c684",
      });
      await getProductByQuery(1);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteProduct(selectedProduct.id);
      Toast.fire({
        position: "top",
        icon: "success",
        title: res.data.message,
        color: "#fff",
        iconColor: "#fff",
        background: "#80c684",
      });
      await getProductByQuery(1);
      setIsAlertOpen(false);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  // // TODO: 增加 table list loading or skeleton
  const handlePageChange = useCallback(
    async (page) => {
      setPagination((prev) => ({ ...prev, current: page }));
      await getProductByQuery(page);
    },
    [getProductByQuery],
  );

  useEffect(() => {
    const init = () => {
      getProductByQuery(1);
    };
    init();
  }, [getProductByQuery]);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pagination]);

  return (
    <>
      <div className="w-screen h-screen p-10 bg-secondary/60" ref={pageRef}>
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
          <Pagination pagination={pagination} onChange={handlePageChange} />
        </div>
        {isModalOpen && (
          <ProductItem
            isEdit={isEdit}
            data={selectedProduct}
            onSubmit={handleSubmit}
            closeModal={closeModal}
            onFileChange={handleFileChange}
            onInputChange={handleOnInputChange}
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
