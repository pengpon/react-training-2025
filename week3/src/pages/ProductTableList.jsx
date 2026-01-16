import { useEffect, useState, useCallback } from "react";
import {
  fetchProducts,
  createProduct,
  editProduct,
  deleteProduct,
} from "../api/products";

import { IconEdit, IconTrash, IconX, IconPlus } from "../components/Icons";
import Spinner from "../components/Spinner";
import Toast from "../utils/swal";

function ProductActionAlert({ selectedItem, handleAlertAction }) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
        <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
          <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
            <div className="md:flex items-center">
              <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 shrink-0 mx-auto">
                <i className="bx bx-error text-3xl">&#9888;</i>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p className="font-bold">提醒！</p>
                <p className="text-sm text-gray-700 mt-1">
                  是否確定刪除 {selectedItem.title} 嗎？
                </p>
              </div>
            </div>
            <div className="text-center md:text-right mt-4 md:flex md:justify-end md:gap-2">
              <button
                title="刪除"
                type="button"
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-medium text-sm md:ml-2 cursor-pointer"
                data-confirm="true"
                onClick={handleAlertAction}
              >
                刪除
              </button>
              <button
                title="取消"
                type="button"
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-neutral-gray-light rounded-lg font-medium text-sm mt-4 md:mt-0 cursor-pointer"
                data-confirm=""
                onClick={handleAlertAction}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductRow({ item, openModal, removeProduct }) {
  const {
    id,
    title,
    description,
    price,
    origin_price,
    unit,
    is_enabled,
    imageUrl,
  } = item;

  return (
    <>
      <tr className="bg-white border-b border-neutral-gray-light hover:bg-gray-100">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-neutral-gray-dark whitespace-nowrap"
        >
          <img
            src={imageUrl || "https://placehold.co/300x300?text=Empty"}
            alt={title}
            className="w-10 rounded-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/300x300/9CAB84/FFF?text=Error";
            }}
          />
          <div className="ps-3">
            <div className="text-base font-semibold">{title}</div>
            <div className="font-normal text-neutral-gray">{description}</div>
          </div>
        </th>
        <td className="px-6 py-4">${price}</td>
        <td className="px-6 py-4">${origin_price}</td>
        <td className="px-6 py-4">{unit}</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full me-2 ${
                is_enabled ? "bg-enabled" : "bg-disabled"
              }`}
            ></div>
            {is_enabled ? "上架" : "下架"}
          </div>
        </td>
        <td className="px-6 py-4 ">
          <div className="flex gap-3 items-center">
            <a
              href="#"
              type="button"
              title="編輯"
              className="size-5"
              onClick={openModal}
              data-id={id}
            >
              <IconEdit />
            </a>
            <a
              href="#"
              type="button"
              title="刪除"
              className="size-5"
              onClick={removeProduct}
              data-id={id}
            >
              <IconTrash />
            </a>
          </div>
        </td>
      </tr>
    </>
  );
}

function ProductItemModal({
  selectedItem,
  onSubmit,
  onKeyDown,
  closeModal,
  isNewItem,
}) {
  // title, category, unit, price, origin_price 必填
  const [formData, setFormData] = useState({ ...selectedItem });
  const [tempEditImageUrl, setTempEditImageUrl] = useState("");
  const [tempEditOtherImageUrl, setTempEditOtherImageUrl] = useState("");

  // 封面 & 其他圖片共用
  const handleImageEdit = (e) => {
    const { name, value } = e.target;
    if (name === "imageUrl") setTempEditImageUrl(value);
    if (name === "imagesUrl") setTempEditOtherImageUrl(value);
  };

  const handleRemoveOtherImage = (index) => {
    setFormData((prevData) => {
      const newImages = prevData.imagesUrl.filter((_, i) => i !== index);
      return {
        ...prevData,
        imagesUrl: newImages,
      };
    });
  };

  const handleImageRemove = () => {
    setFormData((prevData) => ({ ...prevData, imageUrl: "" }));
  };

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    if (name.includes("imageUrl") || name.includes("imagesUrl")) {
      if (value.trim().length === 0) return;
      value = value.trim();
    }

    // 特定個別欄位判斷
    if (name === "is_enabled") value = e.target.checked ? true : false;
    if (name === "price" || name === "origin_price") value = Number(value);

    if (name === "imageUrl") {
      setTempEditImageUrl("");
    }

    if (name === "imagesUrl") {
      setTempEditOtherImageUrl("");
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name == "imagesUrl" ? [...(prevData.imagesUrl || []), value] : value,
    }));
  };

  useEffect(() => {
    setFormData(selectedItem);
  }, [selectedItem]);

  return (
    <>
      <div
        tabIndex="-1"
        onClick={closeModal}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 justify-center items-center w-full md:inset-0 h-full bg-gray-950/50 "
      >
        <div
          className="m-auto relative p-4 w-full max-w-xl max-h-full z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-white border border-gray-100 rounded-md shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 md:pb-5">
              <h3 className="text-lg font-medium text-neutral-gray-dark">
                {isNewItem ? "新增" : "編輯"}商品
              </h3>
              <button
                type="button"
                title="關閉"
                className="text-neutral-gray bg-transparent hover:text-white hover:bg-primary rounded-full text-sm w-9 h-9 ms-auto inline-flex justify-center items-center cursor-pointer"
                onClick={closeModal}
              >
                <IconX />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={(e) => onSubmit(e, formData)} onKeyDown={onKeyDown}>
              <div className="grid gap-4 grid-cols-4 py-4 md:py-6 text-neutral-gray">
                <div className="col-span-3">
                  <label
                    htmlFor="title"
                    className="block mb-2.5 text-sm font-medium text-neutral-gray"
                  >
                    名稱
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-white border border-primary-light text-neutral-gray text-sm rounded-lg focus:border-primary focus:outline-0 block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-600"
                    defaultValue={formData.title}
                    onChange={handleOnChange}
                    required={isNewItem}
                  />
                </div>
                <div className="col-span-1 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2.5 text-sm font-medium"
                  >
                    類別
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    className="bg-white border border-primary-light text-sm rounded-lg focus:border-primary focus:outline-0 block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-600"
                    required={isNewItem}
                    defaultValue={formData.category}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2.5 text-sm font-medium"
                  >
                    售價
                  </label>
                  <input
                    type="number"
                    name="price"
                    min={0}
                    id="price"
                    className="bg-white border border-primary-light text-sm rounded-lg focus:border-primary focus:outline-0 block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-600"
                    required={isNewItem}
                    defaultValue={formData.price}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="origin_price"
                    className="block mb-2.5 text-sm font-medium"
                  >
                    原價
                  </label>
                  <input
                    type="number"
                    name="origin_price"
                    min={0}
                    id="origin_price"
                    className="bg-white border border-primary-light text-sm rounded-lg focus:border-primary focus:outline-0 block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-600"
                    required={isNewItem}
                    defaultValue={formData.origin_price}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="unit"
                    className="block mb-2.5 text-sm font-medium"
                  >
                    單位
                  </label>
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    className="bg-white border border-primary-light text-sm rounded-lg focus:border-primary focus:outline-0 block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-600"
                    required={isNewItem}
                    defaultValue={formData.unit}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 flex">
                  <label
                    className="inline-flex items-center cursor-pointer"
                    htmlFor="is_enabled"
                  >
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      id="is_enabled"
                      checked={!!formData.is_enabled}
                      name="is_enabled"
                      onChange={handleOnChange}
                    />
                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 dark:peer-focus:ring-gray-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    <span className="select-none ms-3 text-sm font-medium">
                      是否上架
                    </span>
                  </label>
                </div>
                <div className="col-span-2 border-b border-neutral-gray-light pb-3">
                  <label className="block mb-2.5 text-sm font-medium text-gray-900 ">
                    封面圖片
                  </label>
                  <div className="relative p-3">
                    {/* 有封面 */}
                    {formData.imageUrl && (
                      <>
                        <img
                          className="w-full border rounded-xl border-neutral-gray-light object-cover"
                          src={formData.imageUrl}
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/300x300/9CAB84/FFF?text=Error";
                          }}
                          alt="cover"
                        />
                        <button
                          title="移除封面"
                          type="button"
                          className="absolute top-1 right-1 p-1 text-white bg-primary/80 rounded-full cursor-pointer"
                          onClick={handleImageRemove}
                        >
                          <IconX style="size-3" />
                        </button>
                      </>
                    )}
                  </div>
                  {/* 無封面 */}
                  {!formData.imageUrl && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="imageUrl"
                        className="col-span-2 bg-white border border-primary-light text-sm rounded-lg focus:border-primary focus:outline-0 block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-600"
                        defaultValue={tempEditImageUrl}
                        onChange={handleImageEdit}
                        onBlur={handleOnChange}
                      />
                    </div>
                  )}
                </div>
                <div className="col-span-2 border-b border-neutral-gray-light pb-3">
                  <label
                    htmlFor="imagesUrl"
                    className="block mb-2.5 text-sm font-medium text-gray-900"
                  >
                    其他圖片
                  </label>
                  <div className="grid grid-cols-2">
                    {formData.imagesUrl?.[0] &&
                      formData.imagesUrl.map((image, index) => (
                        <div
                          className="relative p-3 col-span-1"
                          key={`${image}-${index}`}
                        >
                          <img
                            className="w-full border rounded-xl border-neutral-gray-light object-cover"
                            src={image}
                            alt={`other-image-${index}`}
                            onError={(e) => {
                              e.target.src =
                                "https://placehold.co/300x300/9CAB84/FFF?text=Error";
                            }}
                          />

                          <button
                            title="移除圖片"
                            type="button"
                            className="absolute top-1 right-1 p-1 text-white bg-primary/80 rounded-full cursor-pointer"
                            onClick={() => handleRemoveOtherImage(index)}
                          >
                            <IconX style="size-3" />
                          </button>
                        </div>
                      ))}

                    <div className="col-span-2 flex items-center gap-2 text-primary">
                      <input
                        type="text"
                        name="imagesUrl"
                        id="imagesUrl"
                        className="bg-white border border-primary-light text-sm rounded-lg focus:border-primary focus:outline-0 block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-600"
                        value={tempEditOtherImageUrl}
                        onChange={handleImageEdit}
                        onBlur={handleOnChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-2 mb-3">
                  <label
                    htmlFor="description"
                    className="block mb-2.5 text-sm font-medium text-gray-900"
                  >
                    描述
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    className="block bg-white border border-primary-light text-sm rounded-md focus:border-primary focus:outline-0 w-full p-3.5 shadow-xs placeholder:text-gray-600"
                    defaultValue={formData.description}
                    onChange={handleOnChange}
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="content"
                    className="block mb-2.5 text-sm font-medium"
                  >
                    食用方式
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows="3"
                    className="block bg-white border border-primary-light text-sm rounded-md focus:border-primary focus:outline-0 w-full p-3.5 shadow-xs placeholder:text-gray-600"
                    defaultValue={formData.content}
                    onChange={handleOnChange}
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center space-x-4 border-t border-gray-200 pt-4 md:pt-6 justify-center">
                <button
                  type="submit"
                  title="儲存"
                  className="inline-flex items-center  text-white bg-primary hover:bg-primary-dark box-border border border-transparent focus:ring-4 focus:ring-white shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none cursor-pointer"
                >
                  儲存
                </button>
                <button
                  type="button"
                  title="取消"
                  className="text-primary-dark bg-white box-border border border-primary focus:ring-4 focus:ring-gray-100 shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none cursor-pointer"
                  onClick={closeModal}
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

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
      (product) => product.id === e.currentTarget.dataset.id
    );
    setSelectedProductItem(selectedItem);
    handleModalShow();
  };

  const handleActionAlert = (e) => {
    const [selectedItem] = productsData.filter(
      (product) => product.id === e.currentTarget.dataset.id
    );
    setSelectedProductItem(selectedItem);
    setIsLoading(true);
    setIsActionAlertShow(true);
  };

  const handleRemoveProduct = async (e) => {
    setIsActionAlertShow(false);
    const isDelete = e.currentTarget.dataset.confirm;
    try {
      if (isDelete) await removeProduct(selectedProductItem.id);
    } catch (error) {
      console.error(error.message);
    } finally {
      setSelectedProductItem({});
      await getAllProducts();
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
