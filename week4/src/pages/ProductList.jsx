function ProductList() {
  return (
    <>
      <div className="w-screen h-screen p-10 bg-secondary/60 ">
        <div className="relative overflow-x-auto px-10 py-8 bg-white shadow-xs rounded-main">
          <div className="flex flex-column flex-row flex-wrap mb-10 items-center ">
            <button type="button" className="btn-primary">
              新增產品
            </button>
          </div>
          <div className="mb-10">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    名稱
                  </th>
                  <th scope="col" className="px-6 py-3">
                    售價
                  </th>
                  <th scope="col" className="px-6 py-3">
                    原價
                  </th>
                  <th scope="col" className="px-6 py-3">
                    單位
                  </th>
                  <th scope="col" className="px-6 py-3">
                    狀態
                  </th>
                  <th scope="col" className="px-6 py-3">
                    動作
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-100">
                  <th
                    scope="row"
                    className="px-6 py-4 flex items-center text-gray-800"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://storage.googleapis.com/vue-course-api.appspot.com/root/1767869084719.jpg"
                      alt="cover-image"
                    />
                    <div className="ps-3">
                      <div className="text-lg font-semibold">清香多汁新鮮柑橘</div>
                      <div className="font-normal text-gray-500">
                        富含維生素與天然果酸，清爽果香來自新鮮採收。
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">40</td>
                  <td className="px-6 py-4">32</td>
                  <td className="px-6 py-4">顆</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-status-enabled me-2"></div>
                      上架
                    </div>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button href="#" type="button" className="btn-ghost">
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    <button href="#" type="button" className="btn-ghost">
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-100">
                  <th
                    scope="row"
                    className="px-6 py-4 flex items-center text-gray-800"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://storage.googleapis.com/vue-course-api.appspot.com/root/1767869084719.jpg"
                      alt="cover-image"
                    />
                    <div className="ps-3">
                      <div className="text-lg font-semibold">清香多汁新鮮柑橘</div>
                      <div className="font-normal text-gray-500">
                        富含維生素與天然果酸，清爽果香來自新鮮採收。
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">40</td>
                  <td className="px-6 py-4">32</td>
                  <td className="px-6 py-4">顆</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-status-disabled me-2"></div>
                      下架
                    </div>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button href="#" type="button" className="btn-ghost">
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    <button href="#" type="button" className="btn-ghost">
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center gap-2">
            <button className="w-10 h-10 rounded-main text-gray-400 bg-gray-100 hover:text-white hover:bg-primary cursor-pointer">
              xxx
            </button>
            <button className="w-10 h-10 rounded-main text-white bg-primary cursor-pointer">
              1
            </button>
            <button className="w-10 h-10 rounded-main text-gray-400 bg-gray-100 hover:text-white hover:bg-primary cursor-pointer">
              2
            </button>
            <button className="w-10 h-10 rounded-main text-gray-400 bg-gray-100 hover:text-white hover:bg-primary cursor-pointer">
              ...
            </button>
            <button className="w-10 h-10 rounded-main text-gray-400 bg-gray-100 hover:text-white hover:bg-primary cursor-pointer">
              xxxx
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
