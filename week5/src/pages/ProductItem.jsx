import { useParams } from "react-router";
import { fetchProduct } from "../api/products";
import { useEffect, useState } from "react";
import { logger } from "../utils/logger";
import { addToCart, fetchCarts, updateCartItem } from "../api/cart";

function ProductItem() {
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  // 切換大圖
  const handleImageClick = (e) => {
    setActiveImage(e.target.src);
  };

  // 加減按鈕
  const handleQuantityChange = (e) => {
    const type = e.target.dataset.type;

    if (type === "plus") {
      setQuantity((prev) => {
        const current = Number(prev) || 0;
        return current + 1;
      });
    } else {
      setQuantity((prev) => {
        const current = Number(prev) || 0;
        return current - 1;
      });
    }
  };

  // 手動輸入
  const handleQuantityInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setQuantity(value);
    }
  };

  // Blur 檢查
  const handleQuantityInputBlur = () => {
    if (!quantity) setQuantity(0);
  };

  const handleAddToCart = async () => {
    const res = await fetchCarts();
    const carts = res.data.data.carts;

    const existingItemIndex = carts.findIndex(
      (item) => item.product_id === product.id,
    );

    if (existingItemIndex >= 0) {
      await updateCartItem(carts[existingItemIndex].id, {
        product_id: product.id,
        qty: carts[existingItemIndex].qty + quantity,
      });
    } else {
      await addToCart({
        product_id: product.id,
        qty: quantity,
      });
    }
  };

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const res = await fetchProduct(id);

        setIsLoading(false);
        setProduct(res.data.product);
        setActiveImage(res.data?.product?.imageUrl);
      } catch (error) {
        logger.error(error.message, error);
      }
    };
    if (id) getProduct(id);
  }, [id]);

  return (
    <>
      {!isLoading && (
        <div className="min-h-screen p-8">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap:6">
            <div className="group">
              <figure className="">
                <img
                  className="w-full mb-2 rounded-main"
                  src={
                    activeImage || "https://dummyimage.com/600x400/eeeeee/fff"
                  }
                  alt="cover"
                />
                <div className="grid grid-cols-3 justify-start gap-2">
                  {product.imagesUrl.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="cursor-pointer"
                      onClick={handleImageClick}
                    >
                      <img
                        className="border border-primary/20 rounded-main"
                        src={
                          image || "https://dummyimage.com/600x400/eeeeee/fff"
                        }
                        alt="others"
                      />
                    </div>
                  ))}
                </div>
              </figure>
            </div>
            <div className="flex flex-col group">
              <div className="flex-1">
                <h1 className="font-bold text-3xl text-secondary mb-4">
                  {product.title}
                </h1>
                <div className="text-xl flex gap-2 items-center mb-2">
                  <span className="font-bold">${product.price}</span>
                  <span className="text-sm text-content-muted font-medium line-through italic">
                    ${product.origin_price}
                  </span>
                </div>
                <p>{product.description}</p>
              </div>

              <div className="w-full h-0.5 bg-gray-100 my-4"></div>
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="mx-auto w-fit inline-flex items-center border border-[--color-brand-secondary]/20 rounded-lg overflow-hidden bg-white shadow-sm">
                    <button
                      className="px-3 py-2 text-secondary hover:bg-gray-100 transition-colors active:scale-95 select-none font-bold cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed"
                      data-type="minus"
                      onClick={handleQuantityChange}
                      disabled={quantity === 0}
                    >
                      －
                    </button>

                    <input
                      type="number"
                      value={quantity}
                      min="1"
                      className="w-12 text-center border-x border-[--color-brand-secondary]/10 py-2 font-poppins font-medium text-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      onChange={handleQuantityInputChange}
                      onBlur={handleQuantityInputBlur}
                    />

                    <button
                      className="px-3 py-2 text-secondary hover:bg-gray-100 transition-colors active:scale-95 select-none font-bold cursor-pointer"
                      data-type="plus"
                      onClick={handleQuantityChange}
                    >
                      ＋
                    </button>
                  </div>

                  <button
                    className="px-4 bg-primary hover:bg-primary-dark text-white py-2 rounded-button transition-colors cursor-pointer"
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="">
                  <button className="w-full px-4 bg-primary hover:bg-primary-dark text-white py-2 rounded-button transition-colors disabled:bg-gray-200">
                    But It Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductItem;
