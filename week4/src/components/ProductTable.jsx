import ProductTableRow from "./ProductTableRow";

function ProductTable({ columns, data, openEditModal }) {
  return (
    <>
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
            <ProductTableRow
              columns={columns}
              data={item}
              key={item.id}
              openEditModal={openEditModal}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductTable;
