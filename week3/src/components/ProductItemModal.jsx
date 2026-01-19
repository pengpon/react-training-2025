import { useState, useEffect } from "react";
import { IconX } from "../components/Icons";

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
  const originalData = { ...selectedItem };
  const [isShowOriginalData, setIsShowOriginalData] = useState({
    title: false,
    category: false,
    origin_price: false,
    price: false,
    unit: false,
  });

  const isDisabledSubmit = Object.values(isShowOriginalData).some(
    (value) => value,
  );

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

  const handleRequiredOnBlur = (e) => {
    const { value, name } = e.target;
    // 清空必填欄位時, 提醒原本設定的內容
    if (!value.trim()) {
      setIsShowOriginalData((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    let fields = Object.keys(isShowOriginalData);
    if (fields.includes(name)) {
      if (value.trim())
        setIsShowOriginalData((prev) => ({ ...prev, [name]: false }));
    }

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
                    <span className="text-status-warning">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-white border border-primary-light text-neutral-gray text-sm rounded-lg focus:border-primary focus:outline-0 block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-600"
                    defaultValue={formData.title}
                    onChange={handleOnChange}
                    required={isNewItem}
                    onBlur={handleRequiredOnBlur}
                  />
                  <span
                    className={
                      isShowOriginalData.title
                        ? "text-xs text-status-error"
                        : "hidden"
                    }
                  >
                    提醒：名稱為必填，原輸入內容為 {originalData.title}
                  </span>
                </div>
                <div className="col-span-1 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2.5 text-sm font-medium"
                  >
                    類別
                    <span className="text-status-warning">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    className="bg-white border border-primary-light text-sm rounded-lg focus:border-primary focus:outline-0 block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-600"
                    required={isNewItem}
                    defaultValue={formData.category}
                    onChange={handleOnChange}
                    onBlur={handleRequiredOnBlur}
                  />
                  <span
                    className={
                      isShowOriginalData.category
                        ? "text-xs text-status-error"
                        : "hidden"
                    }
                  >
                    提醒：類別為必填，原輸入內容為 {originalData.category}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2.5 text-sm font-medium"
                  >
                    售價
                    <span className="text-status-warning">*</span>
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
                    onBlur={handleRequiredOnBlur}
                  />
                  <span
                    className={
                      isShowOriginalData.price
                        ? "text-xs text-status-error"
                        : "hidden"
                    }
                  >
                    提醒：售價為必填，原輸入內容為 {originalData.price}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="origin_price"
                    className="block mb-2.5 text-sm font-medium"
                  >
                    原價
                    <span className="text-status-warning">*</span>
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
                    onBlur={handleRequiredOnBlur}
                  />
                  <span
                    className={
                      isShowOriginalData.origin_price
                        ? "text-xs text-status-error"
                        : "hidden"
                    }
                  >
                    提醒：原價為必填，原輸入內容為 {originalData.origin_price}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="unit"
                    className="block mb-2.5 text-sm font-medium"
                  >
                    單位
                    <span className="text-status-warning">*</span>
                  </label>
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    className="bg-white border border-primary-light text-sm rounded-lg focus:border-primary focus:outline-0 block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-600"
                    required={isNewItem}
                    defaultValue={formData.unit}
                    onChange={handleOnChange}
                    onBlur={handleRequiredOnBlur}
                  />
                  <span
                    className={
                      isShowOriginalData.unit
                        ? "text-xs text-status-error"
                        : "hidden"
                    }
                  >
                    提醒：單位為必填，原輸入內容為 {originalData.unit}
                  </span>
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
                  className="inline-flex items-center text-white bg-primary hover:bg-primary-dark box-border border border-transparent focus:ring-4 focus:ring-white shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400 disabled:border-0 disabled:cursor-auto cursor-pointer"
                  disabled={isDisabledSubmit}
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

export default ProductItemModal;
