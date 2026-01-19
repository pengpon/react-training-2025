
import { IconEdit, IconTrash } from "../components/Icons";

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

export default ProductRow