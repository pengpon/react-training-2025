import { useState } from "react";

function ProductItem({ isEditMode, closeModal, data, onSubmit }) {
  const title = isEditMode ? "編輯產品" : "新增產品";
  const [formData, setFormData] = useState({ ...data });

  // TODO: 檢查必填欄位是否有值
  const handleOnChange = (e) => {
    let { name, value } = e.target;

    // 特定欄位 value 處理
    if (name === "is_enabled") value = e.target.checked ? true : false;
    if (name === "price" || name === "origin_price") value = Number(value);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div
        tabIndex="-1"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 justify-center items-center w-full md:inset-0 h-full bg-gray-950/50"
        onClick={closeModal}
      >
        <div
          className="relative z-30 w-full max-w-xl max-h-full m-auto  p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-4 rounded-main bg-white border-gray-100 shadow-soft">
            <div className="pb-4 flex justify-between items-center border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <button
                type="button"
                className="inline-flex justify-center items-center w-10 h-10 rounded-full text-gray-800 bg-transparent hover:text-white hover:bg-primary cursor-pointer"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form>
              <div className="grid gap-4 grid-cols-4 py-4 text-sm font-medium text-gray-600">
                <div className="col-span-3">
                  <label htmlFor="title" className="block mb-2.5">
                    名稱
                    <span className="text-status-warning">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="input-base"
                    value={formData?.title}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="category" className="block mb-2.5">
                    類別
                    <span className="text-status-warning">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    className="input-base"
                    value={formData?.category}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="price" className="block mb-2.5">
                    售價
                    <span className="text-status-warning">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    id="price"
                    className="input-base"
                    value={formData?.price}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="origin_price" className="block mb-2.5">
                    原價
                    <span className="text-status-warning">*</span>
                  </label>
                  <input
                    type="number"
                    name="origin_price"
                    min="0"
                    id="origin_price"
                    className="input-base"
                    value={formData?.origin_price}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="unit" className="block mb-2.5">
                    單位
                    <span className="text-status-warning">*</span>
                  </label>
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    className="input-base"
                    value={formData?.unit}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-span-1 flex">
                  <label
                    className="inline-flex items-center cursor-pointer"
                    htmlFor="is_enabled"
                  >
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      id="is_enabled"
                      name="is_enabled"
                      checked={!!formData.is_enabled}
                      onChange={handleOnChange}
                    />
                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 dark:peer-focus:ring-gray-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    <span className="select-none ms-3"> 是否上架 </span>
                  </label>
                </div>
                <div className="col-span-2 pb-3">
                  <label htmlFor="imageUrl" className="block mb-2.5">
                    封面圖片
                  </label>
                  {formData.imageUrl ? (
                    <div className="relative p-3">
                      <input id="imageUrl" className="hidden" />
                      <img
                        className="w-full border rounded-xl border-neutral-gray-light object-cover"
                        src={formData?.imageUrl}
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/300x300/9CAB84/FFF?text=Error";
                        }}
                        alt={`${formData.title}-cover`}
                      />
                      <button
                        title="移除封面"
                        type="button"
                        className="absolute top-1 right-1 p-1 text-white bg-primary/80 rounded-full cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        name="imageUrl"
                        id="imageUrl"
                        className="btn-primary w-full"
                        accept="image/*"
                      />
                    </div>
                  )}
                </div>
                <div className="col-span-2 pb-3">
                  <label htmlFor="imagesUrl" className="block mb-2.5 text-sm">
                    其他圖片
                  </label>
                  <div className="grid grid-cols-2">
                    <div className="relative p-3 col-span-1">
                      <img
                        src="https://dummyimage.com/300x200/000/fff"
                        className="w-full border rounded-xl border-neutral-gray-light object-cover"
                      />

                      <button
                        title="移除圖片"
                        type="button"
                        className="absolute top-1 right-1 p-1 text-white bg-primary/80 rounded-full cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="relative p-3 col-span-1">
                      <img
                        src="https://dummyimage.com/300x200/000/fff"
                        className="w-full border rounded-xl border-neutral-gray-light object-cover"
                      />
                      <button
                        title="移除圖片"
                        type="button"
                        className="absolute top-1 right-1 p-1 text-white bg-primary/80 rounded-full cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <input
                        type="file"
                        name="imagesUrl"
                        id="imagesUrl"
                        className="btn-primary w-full"
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
                    className="input-base"
                    value={formData?.description}
                    onChange={handleOnChange}
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label htmlFor="content" className="block mb-2.5">
                    {" "}
                    食用方式{" "}
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows="3"
                    className="input-base"
                    value={formData?.content}
                    onChange={handleOnChange}
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center space-x-4 border-t border-gray-200 pt-4 md:pt-6 justify-center">
                <button
                  type="button"
                  title="儲存"
                  className="inline-flex items-center  text-white bg-primary hover:bg-primary-dark box-border border border-transparent focus:ring-4 focus:ring-white shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none cursor-pointer"
                  onClick={() => onSubmit(formData)}
                >
                  儲存
                </button>
                <button
                  type="button"
                  title="取消"
                  className="text-primary-dark bg-white box-border border border-primary focus:ring-4 focus:ring-gray-100 shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none cursor-pointer"
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

export default ProductItem;
