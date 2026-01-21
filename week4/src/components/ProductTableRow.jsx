
const StatusBadge = ({isEnabled}) => {
  return (
    <>
      <div className="flex items-center">
        <div className={`h-2.5 w-2.5 me-2 rounded-full ${isEnabled ? 'bg-status-enabled': 'bg-status-disabled'}`}></div>
        {isEnabled ? "上架" : "下架"}
      </div>
    </>
  );
};

const ActionButtons = ({onEdit}) => {
  return (
    <>
      <button href="#" type="button" className="btn-ghost" onClick={onEdit}>
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
    </>
  );
};
function ProductTableRow({ columns, data, openEditModal }) {
  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-100 transition-colors duration-500">
        {columns.map((col) => {
          // summary 欄位, 包含 image, title, description 資訊
          if (col.key === "summary") {
            return (
              <th
                key={col.key}
                scope="row"
                className="px-6 py-4 flex items-center text-gray-800"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    data.imageUrl || "https://placehold.co/300x300?text=Empty"
                  }
                  alt="cover-image"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/300x300/9CAB84/FFF?text=Error";
                  }}
                />
                <div className="ps-3">
                  <div className="text-lg font-semibold">{data.title}</div>
                  <div className="font-normal text-gray-500">
                    {data.description}
                  </div>
                </div>
              </th>
            );
          }

          if (col.key === "actions") {
            return (
              <td key={col.key} className="px-6 py-4 flex gap-2">
                <ActionButtons onEdit={() => openEditModal(data.id)} />
              </td>
            );
          }

          if (col.key === "is_enabled") {
            return (
              <td key={col.key} className="px-6 py-4">
                <StatusBadge isEnabled={data.is_enabled}/>
              </td>
            );
          }

          return <td key={col.key} className="px-6 py-4">{data[col.key]}</td>;
        })}
      </tr>
    </>
  );
}

export default ProductTableRow;
