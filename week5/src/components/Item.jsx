import { Link } from "react-router";
import { addThousandsSeparator } from "../utils/format";
function Item({ data }) {
  return (
    <>
      <div className="p-2 lg:p-6 rounded-main group bg-root-bg">
        <Link to={`/product/${data.id}`}>
          <div className="relative aspect-square overflow-hidden rounded-main mb-4 ">
            <figure className="w-full h-full overflow-hidden relative">
              <img
                src={
                  data?.imageUrl ||
                  "https://placehold.co/600x400/89986D/FFFFFF?text=Oops"
                }
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              />

              <div className="opacity-0 transition-all duration-700 group-hover:opacity-100 ">
                <img
                  src={
                    (data?.imagesUrl && data.imagesUrl[0]) ||
                    data.imageUrl ||
                    "https://placehold.co/600x400/89986D/FFFFFF?text=Oops"
                  }
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
                />
                <button className="absolute bottom-10 left-0 right-0 mx-auto px-4 w-fit bg-primary hover:bg-accent text-white py-2 mt-4 rounded-button transition-colors">
                  Quick Add
                </button>
              </div>
            </figure>
            {/* <span className="w-fit absolute top-4 right-4 rounded-badge px-4 bg-white">
              sale
            </span> */}
          </div>
        </Link>

        <h2 className="text-secondary font-bold">{data.title}</h2>
        <div className="flex gap-2 items-center p-2">
          <span className="text-primary text-md font-semibold">
            ${addThousandsSeparator(data.price)}
          </span>
          <span className="text-muted text-sm line-through italic">
            ${addThousandsSeparator(data.origin_price)}
          </span>
        </div>
      </div>
    </>
  );
}

export default Item;
