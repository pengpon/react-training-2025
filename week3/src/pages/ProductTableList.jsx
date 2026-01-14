import { useEffect, useState } from "react";
import { IconEdit, IconTrash, IconX, IconPlus } from "../components/Icons";

function ProductRow({ item, openModal }) {
  const { id, title, description, price, origin_price, unit, is_enabled } =
    item;

  return (
    <>
      <tr className="bg-white border-b border-neutral-gray-light hover:bg-gray-100">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-neutral-gray-dark whitespace-nowrap"
        >
          <img
            className="w-10 rounded-full object-cover"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/root/1767869084719.jpg"
            alt="watermelon"
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
              className="size-5"
              onClick={openModal}
              data-id={id}
            >
              <IconEdit />
            </a>
            <a href="#" type="button" className="size-5 delete">
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
  closeModal,
  isNewItem,
}) {
  const [formData, setFormData] = useState({ ...selectedItem });

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    if (name === "is_enabled") {
      value = e.target.checked ? true : false;
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    setFormData(selectedItem);
  }, [selectedItem]);

  return (
    <>
      <div
        tabIndex="-1"
        onClick={closeModal}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-950/50 "
      >
        <div
          className="m-auto relative p-4 w-full max-w-md max-h-full z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-white border border-gray-100 rounded-md shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 md:pb-5">
              <h3 className="text-lg font-medium text-neutral-gray-dark">
                {isNewItem ? "新增" : "編輯"}商品
              </h3>
              <button
                type="button"
                className="text-neutral-gray bg-transparent hover:text-white hover:bg-primary rounded-full text-sm w-9 h-9 ms-auto inline-flex justify-center items-center cursor-pointer"
                onClick={closeModal}
              >
                <IconX />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form action="#" onSubmit={(e) => onSubmit(e, formData)}>
              <div className="grid gap-4 grid-cols-3 py-4 md:py-6 text-neutral-gray">
                <div className="col-span-2">
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
                <div className="col-span-1 sm:col-span-1 flex">
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
                <div className="col-span-3">
                  <label
                    htmlFor="description"
                    className="block mb-2.5 text-sm font-medium text-gray-900"
                  >
                    描述
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    className="block bg-white border border-primary-light text-sm rounded-md focus:border-primary focus:outline-0 w-full p-3.5 shadow-xs placeholder:text-gray-600"
                    defaultValue={formData.description}
                    onChange={handleOnChange}
                  ></textarea>
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="content"
                    className="block mb-2.5 text-sm font-medium"
                  >
                    食用方式
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows="2"
                    className="block bg-white border border-primary-light text-sm rounded-md focus:border-primary focus:outline-0 w-full p-3.5 shadow-xs placeholder:text-gray-600"
                    defaultValue={formData.content}
                    onChange={handleOnChange}
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center space-x-4 border-t border-gray-200 pt-4 md:pt-6 justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center  text-white bg-primary hover:bg-primary-dark box-border border border-transparent focus:ring-4 focus:ring-white shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none cursor-pointer"
                >
                  儲存
                </button>
                <button
                  type="button"
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
  const [isModalShow, setIsModalShow] = useState(false);
  const [selectedProductItem, setSelectedProductItem] = useState({});

  const columnHeaders = ["名稱", "售價", "原價", "單位", "狀態", "動作"];
  const productsData = [
    {
      id: "123",
      title: "新鮮柑橘",
      description: "富含維生素與天然果酸，清爽果香來自新鮮採收。",
      price: 32,
      origin_price: 40,
      unit: "顆",
      is_enabled: true,
      content: "123456",
    },
    {
      id: "456",
      title: "456",
      description: "123",
      price: 123,
      origin_price: 123,
      unit: "123",
      is_enabled: false,
      content: "123456",
    },
  ];

  const handleSelectedModal = (e) => {
    const [selectedItem] = productsData.filter(
      (product) => product.id === e.currentTarget.dataset.id
    );

    setSelectedProductItem(selectedItem);
    handleModalShow();
  };

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    console.log("submit", formData);
    handleModalClose();
  };

  const handleModalShow = () => {
    setIsModalShow(true);
  };

  const handleModalClose = () => {
    setSelectedProductItem({});
    setIsModalShow(false);
  };

  return (
    <>
      <div className="relative overflow-x-auto px-10 py-8 bg-white shadow-xs rounded-xl ">
        <div className="flex items-center justify-end flex-column md:flex-row flex-wrap mb-10 ">
          <button
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
            {productsData.map((item) => (
              <ProductRow
                item={item}
                key={item.id}
                openModal={handleSelectedModal}
              />
            ))}
          </tbody>
        </table>
        {isModalShow && (
          <ProductItemModal
            onSubmit={handleSubmit}
            closeModal={handleModalClose}
            selectedItem={selectedProductItem}
            isNewItem={Object.keys(selectedProductItem).length === 0}
          />
        )}
      </div>
    </>
  );
}

export default ProductTableList;
