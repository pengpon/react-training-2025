import { useState, useEffect, useCallback, useRef } from "react";
import {
  fetchProducts,
  createProduct,
  editProduct,
  deleteProduct,
} from "../../api/admin/products";
import { uploadImage } from "../../api/admin/upload";
import Toast from "../../utils/swal";
import { logger } from "../../utils/logger";

import ProductTable from "../../components/ProductTable";
import Pagination from "../../components/Pagination";
import ProductItem from "../../components/ProductItem";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";

function AdminProductList() {
  const pageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [pagination, setPagination] = useState({
    current: null,
    total: null,
  });
  const [tempFiles, setTempFiles] = useState({
    imageUrl: null,
    imagesUrl: [],
  });

  const [previews, setPreviews] = useState({
    imageUrl: "",
    imagesUrl: [],
  });

  const columns = [
    { header: "Product", key: "summary" },
    { header: "Category", key: "category" },
    { header: "Original Price", key: "origin_price" },
    { header: "Sale Price", key: "price" },
    { header: "Status", key: "is_enabled" },
    { header: "Actions", key: "actions" },
  ];

  const getProductByQuery = useCallback(async (page, category) => {
    const res = await fetchProducts(page, category);
    const { current_page: current, total_pages: total } = res.data.pagination;
    setPagination({ current, total });
    setProductsData(res.data.products);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setPreviews({ imageUrl: "", imagesUrl: [] });
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

  const handleFilePreview = (e) => {
    const { files, multiple } = e.target;
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    // 檢查檔案大小, 限制 3 MB
    const MAX_FILE_SIZE = 3 * 1024 * 1024;
    const oversizedFiles = fileArray.filter(
      (file) => file.size > MAX_FILE_SIZE,
    );
    const checkSizedFilesArr = fileArray.filter(
      (file) => file.size <= MAX_FILE_SIZE,
    );

    if (oversizedFiles.length > 0) {
      const fileNames = oversizedFiles.map((file) => file.name).join(", ");
      Toast.fire({
        position: "top",
        icon: "warning",
        title: `${fileNames} Maximum file size is 3MB. Please re-upload.`,
        color: "#fff",
        iconColor: "#fff",
        background: "#ff8f40",
      });
    }

    const previews = checkSizedFilesArr.map((file) =>
      URL.createObjectURL(file),
    );

    if (multiple) {
      setPreviews((prev) => ({
        ...prev,
        imagesUrl: [...prev.imagesUrl, ...previews],
      }));
      setTempFiles((prev) => ({
        ...prev,
        imagesUrl: [...prev.imagesUrl, ...checkSizedFilesArr],
      }));
    } else {
      setPreviews((prev) => ({ ...prev, imageUrl: previews[0] }));
      setTempFiles((prev) => ({ ...prev, imageUrl: checkSizedFilesArr[0] }));
    }

    e.target.value = "";
  };

  const handleOnInputChange = (e) => {
    // ＊＊＊＊＊＊＊＊移除圖片
    let action;
    let { tagName, name, value } = e.target;
    if (tagName !== "INPUT" && tagName !== "TEXTAREA") {
      let target = e.target.closest("button");
      name = target.name;
      value = target.value;
      action = target.dataset.action;
    }

    // 封面圖片
    if (action === "remove" && name === "imageUrl") {
      if (value.includes("blob")) {
        setPreviews((prev) => ({ ...prev, [name]: "" }));
        setTempFiles((prev) => ({ ...prev, [name]: "" }));
      } else {
        setSelectedProduct((prev) => ({ ...prev, [name]: "" }));
      }
      return;
    }
    // 其他圖片
    if (action === "remove" && name === "imagesUrl") {
      if (value.includes("blob")) {
        const newArray = previews.imagesUrl.filter((image) => image !== value);
        setPreviews((prev) => ({ ...prev, [name]: newArray }));
        setTempFiles((prev) => ({ ...prev, [name]: newArray }));
      } else {
        const newArray = selectedProduct.imagesUrl.filter(
          (image) => image !== value,
        );
        setSelectedProduct((prev) => ({ ...prev, [name]: newArray }));
      }
      return;
    }

    // 特定欄位 value 處理
    if (name === "is_enabled") value = e.target.checked ? true : false;
    if (name === "price" || name === "origin_price") value = Number(value);

    setSelectedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const uploadTasks = (fileArray) => {
    if (fileArray.length === 0) return [];
    return fileArray.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      return uploadImage(formData);
    });
  };

  const handleSubmit = async () => {
    if (!selectedProduct) return;
    setIsLoading(true);
    let { id, ...data } = { ...selectedProduct };
    let res;

    // ＊＊新增欄位 最近更新時間
    data["modified_at"] = Date.now();

    // 1. 上傳封面圖片 File
    if (tempFiles.imageUrl) {
      const responses = await Promise.all(uploadTasks([tempFiles.imageUrl]));
      data.imageUrl = responses[0].data.imageUrl;
    }
    // 2. 上傳其他圖片 Files
    if (tempFiles.imagesUrl && tempFiles.imagesUrl.length > 0) {
      const responses = await Promise.all(uploadTasks(tempFiles.imagesUrl));
      const urls = responses.map((res) => res.data.imageUrl);
      data.imagesUrl = [...(data.imagesUrl || []), ...urls];
    }

    // 3. 清空暫存 Files
    setTempFiles({
      imageUrl: null,
      imagesUrl: [],
    });

    try {
      // 4. 送出表單 ( 新增 or 修改 )
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
      // 5. 重新取得產品列表
      await getProductByQuery(1);
      setIsLoading(false);
      closeModal();
    } catch (error) {
      logger.error(error.message, error);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
      setIsAlertOpen(false);
    } catch (error) {
      logger.error(error.message, error);
      throw error;
    }
  };

  const handlePageChange = useCallback(
    async (page) => {
      setIsLoading(true);
      setPagination((prev) => ({ ...prev, current: page }));
      await getProductByQuery(page);
      setIsLoading(false);
    },
    [getProductByQuery],
  );

  useEffect(() => {
    const init = async () => {
      await getProductByQuery(1);
      setIsLoading(false);
    };
    init();
  }, [getProductByQuery]);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pagination]);

  useEffect(() => {
    return () => {
      previews.imagesUrl.forEach((url) => URL.revokeObjectURL(url));
      if (previews.imageUrl) URL.revokeObjectURL(previews.main);
    };
  }, [previews, isModalOpen]);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="fixed z-100 w-screen h-screen bg-gray-700/60">
          <Spinner />
        </div>
      )}

      <div className="min-w-200 min-h-screen p-10 bg-secondary/60 overflow-auto" ref={pageRef}>
        <div className="relative px-10 py-8 bg-white shadow-xs rounded-main overflow-auto">
          <div className="flex flex-column flex-row flex-wrap mb-10 items-center ">
            <button
              type="button"
              className="text-white bg-secondary/80 rounded-button px-4 py-2 hover:bg-secondary cursor-pointer"
              onClick={(e) => onActionClick(e.target.dataset.type, "")}
              data-type="create"
            >
              Add New Product
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
            previews={previews}
            onSubmit={handleSubmit}
            closeModal={closeModal}
            onFileChange={handleFilePreview}
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

export default AdminProductList;
