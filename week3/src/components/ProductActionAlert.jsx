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

export default ProductActionAlert;
