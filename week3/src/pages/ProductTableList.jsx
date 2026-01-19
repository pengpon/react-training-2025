import { useEffect, useState, useCallback } from "react";
import {
  fetchProducts,
  createProduct,
  editProduct,
  deleteProduct,
} from "../api/products";

import { IconPlus } from "../components/Icons";
import Spinner from "../components/Spinner";
import ProductActionAlert from "../components/ProductActionAlert";
import ProductItemModal from "../components/ProductItemModal";
import ProductRow from "../components/ProductRow"
import Toast from "../utils/swal";

function ProductTableList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isActionAlertShow, setIsActionAlertShow] = useState(false);
  const [selectedProductItem, setSelectedProductItem] = useState({});
  const [productsData, setProductsData] = useState([]);

  const columnHeaders = ["名稱", "售價", "原價", "單位", "狀態", "動作"];

  const addNewProduct = async (data) => {
    try {
      const res = await createProduct(data);

      Toast.fire({
        position: "top",
        icon: "success",
        title: res.data.message,
        color: "#fff",
        iconColor: "#fff",
        background: "#80c684",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const editOriginProduct = async (id, data) => {
    try {
      const res = await editProduct(id, data);
      Toast.fire({
        position: "top",
        icon: "success",
        title: res.data.message,
        color: "#fff",
        iconColor: "#fff",
        background: "#80c684",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await deleteProduct(id);
      Toast.fire({
        position: "top",
        icon: "success",
        title: res.data.message,
        color: "#fff",
        iconColor: "#fff",
        background: "#80c684",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleModalShow = () => {
    setIsModalShow(true);
  };

  const handleModalClose = () => {
    setSelectedProductItem({});
    setIsModalShow(false);
  };

  const handleSelectedModal = (e) => {
    const [selectedItem] = productsData.filter(
      (product) => product.id === e.currentTarget.dataset.id,
    );
    setSelectedProductItem(selectedItem);
    handleModalShow();
  };

  const handleActionAlert = (e) => {
    const [selectedItem] = productsData.filter(
      (product) => product.id === e.currentTarget.dataset.id,
    );
    setSelectedProductItem(selectedItem);
    setIsActionAlertShow(true);
  };

  const handleRemoveProduct = async (e) => {
    setIsLoading(true);

    setIsActionAlertShow(false);
    const isDelete = e.currentTarget.dataset.confirm;
    try {
      if (isDelete) {
        await removeProduct(selectedProductItem.id);
        await getAllProducts();
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setSelectedProductItem({});
      setIsLoading(false);
    }
  };

  const handleFormKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    }
  };

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    setIsLoading(true);
    handleModalClose();

    const isCreateProduct = Object.keys(selectedProductItem).length === 0;

    if (isCreateProduct) {
      await addNewProduct(formData);
    } else {
      await editOriginProduct(selectedProductItem.id, formData);
    }

    await getAllProducts();
    setIsLoading(false);
  };

  const getAllProducts = useCallback(async () => {
    try {
      const res = await fetchProducts();
      setProductsData(Object.values(res.data.products));
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await getAllProducts();
      setIsLoading(false);
    };
    init();
  }, [getAllProducts]);

  return (
    <>
      <div className="w-screen h-screen bg-secondary/60 p-10">
        <div className="relative overflow-x-auto px-10 py-8 bg-white shadow-xs rounded-xl ">
          <div className="flex items-center flex-column md:flex-row flex-wrap mb-10 ">
            <button
              title="新增產品"
              type="button"
              className="inline-flex items-center text-white bg-primary hover:bg-primary-dark box-border border border-transparent focus:ring-4 focus:ring-white shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none cursor-pointer"
              onClick={handleModalShow}
            >
              <IconPlus style={"size-5 me-2"} />
              新增產品
            </button>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-neutral-gray">
            <thead className="text-sm text-neutral-gray border-b border-neutral-gray-light">
              <tr>
                {columnHeaders.map((header, index) => (
                  <th scope="col" className="px-6 py-3 font-medium" key={index}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <>
                  <tr>
                    <td className="p-2" colSpan={columnHeaders.length}>
                      <Spinner />
                    </td>
                  </tr>
                </>
              ) : (
                productsData.map((item) => (
                  <ProductRow
                    item={item}
                    key={item.id}
                    openModal={handleSelectedModal}
                    removeProduct={handleActionAlert}
                  />
                ))
              )}
            </tbody>
          </table>
          {isModalShow && (
            <ProductItemModal
              onSubmit={handleSubmit}
              onKeyDown={handleFormKeyDown}
              closeModal={handleModalClose}
              selectedItem={selectedProductItem}
              isNewItem={Object.keys(selectedProductItem).length === 0}
            />
          )}
        </div>
      </div>
      {isActionAlertShow && (
        <ProductActionAlert
          selectedItem={selectedProductItem}
          handleAlertAction={handleRemoveProduct}
        />
      )}
    </>
  );
}

export default ProductTableList;
