import ProductTableRow from "./ProductTableRow";

function ProductTable({ columns, data, onActionClick }) {
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
              key={item.id}
              columns={columns}
              data={item}
              onActionClick={onActionClick}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductTable;
