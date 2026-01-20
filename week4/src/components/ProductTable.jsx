import Pagination from "./Pagination";
import ProductTableRow from "./ProductTableRow";

function ProductTable({ columns, data }) {
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
                  {columns.map((col) => (
                    <th key={col.key} scope="col" className="px-6 py-3">
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <ProductTableRow columns={columns} data={item} key={item.id} />
                ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      </div>
    </>
  );
}

export default ProductTable;
