import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router";
import { fetchCarts, removeCartItem, updateCartItem } from "../../api/front/cart";
import Spinner from "../../components/Spinner";
import ErrorState from "../../components/ErrorState";
import Toast from "../../utils/swal"
import { addThousandsSeparator } from "../../utils/format";
import { logger } from "../../utils/logger";

function Cart() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const [finalTotal, setFinalTotal] = useState(0);
  const timerRef = useRef(null);

  const getCarts = useCallback(async () => {
    const res = await fetchCarts();
    setCartItems(res.data.data.carts);
    setFinalTotal(res.data.data.final_total);
  }, []);

  // 加減按鈕
  const handleQuantityChange = async (id, type) => {
    setIsActionLoading(true);
    const currentItem = cartItems.find((item) => item.id === id);
    const diff = type === "plus" ? 1 : -1;
    const newQty = currentItem.qty + diff;

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item,
    );
    setCartItems(updatedItems);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      await updateCart(id, updatedItems);
      setIsActionLoading(false);
    }, 500);
  };

  // 手動輸入
  const handleQuantityInputChange = (e) => {
    const value = e.target.value;
    const id = e.target.dataset.id;

    if (value === "" || !isNaN(value)) {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, qty: value } : item)),
      );
    }
  };

  // Blur 檢查
  const handleQuantityInputBlur = async (e) => {
    setIsActionLoading(true);
    const id = e.target.dataset.id;
    const value = parseInt(e.target.value, 10);

    let newQty = value;
    if (isNaN(value) || value < 1) {
      newQty = 1;
    } else if (value > 99) {
      newQty = 99;
    }

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item,
    );

    setCartItems(updatedItems);
    await updateCart(id, updatedItems);
    setIsActionLoading(false);
  };

  const updateCart = async (id, data) => {
    const updateItem = data.find((item) => item.id === id);

    await updateCartItem(id, {
      product_id: updateItem.product_id,
      qty: updateItem.qty,
    });
    await getCarts();
    setIsActionLoading(false);
  };

  const handleRemove = async (id) => {
    setCartItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);
      return updatedItems;
    });
    await removeCartItem(id);
    await getCarts();
    setIsActionLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await getCarts();
      } catch (error) {
        Toast.fire({
          position: "top",
          icon: "warning",
          title: `Something Wrong...`,
          color: "#fff",
          iconColor: "#fff",
          background: "#ff8f40",
        });
        logger.error(error.message, error);
      } finally {
        setIsPageLoading(false);
      }
    };
    init();
  }, [getCarts]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      {!cartItems && (isPageLoading ? <Spinner /> : <ErrorState />)}
      {!isPageLoading &&
        cartItems &&
        (cartItems?.length > 0 ? (
          <div className="max-w-250 w-[90%] m-auto">
            <div className="my-4">
              <h1 className="text-center text-3xl font-bold text-primary-dark">
                Shopping Cart
              </h1>
            </div>

            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cartItems.map((item) => (
                <li
                  className="flex py-6 items-center lg:justify-around gap-4"
                  key={item.id}
                >
                  <div className="size-20 lg:size-30">
                    <img
                      className="rounded-main w-full h-full object-cover"
                      src={
                        item.product.imageUrl ||
                        "https://dummyimage.com/600x400/eeeeee/fff"
                      }
                      alt="cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-4 lg:gap-8 lg:flex-row">
                    <div className="text-gray-900 lg:w-1/2 flex gap-6 items-center">
                      <p className="text-md">{item.product.title}</p>
                      <span className="text-sm font-medium">
                        {" "}
                        ${item.product.price}{" "}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="mx-auto w-fit inline-flex items-center border border-[--color-brand-secondary]/20 rounded-lg overflow-hidden bg-white shadow-sm">
                        <button
                          className="px-3 py-2 text-secondary hover:bg-gray-100 transition-colors active:scale-95 select-none font-bold cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed"
                          onClick={() => handleQuantityChange(item.id, "minus")}
                          disabled={item.qty <= 1}
                        >
                          －
                        </button>

                        <input
                          type="number"
                          value={item.qty}
                          min={1}
                          max={99}
                          className="w-12 text-center border-x border-[--color-brand-secondary]/10 py-2 font-poppins font-medium text-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          data-id={item.id}
                          onChange={handleQuantityInputChange}
                          onBlur={handleQuantityInputBlur}
                        />

                        <button
                          className="px-3 py-2 text-secondary hover:bg-gray-100 transition-colors active:scale-95 select-none font-bold cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed"
                          onClick={() => handleQuantityChange(item.id, "plus")}
                          disabled={item.qty >= 99}
                        >
                          ＋
                        </button>
                      </div>
                      <div className="p-2">
                        <button
                          className="text-red-500  hover:text-red-800 cursor-pointer"
                          onClick={() => handleRemove(item.id)}
                        >
                          <TrashIcon className="size-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mb-4 p-4 flex justify-between">
              <div className="">
                <h2 className="text-xl font-medium">Estimated total</h2>
                <p className="text-sm font-normal text-gray-400">
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-xl lg:text-3xl ">
                  {isActionLoading ? (
                    <Spinner />
                  ) : (
                    `$${addThousandsSeparator(finalTotal, ",")}`
                  )}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <Link to="/checkout">
                <button className="w-full px-4 bg-primary hover:bg-accent text-white py-2 rounded-button transition-colors">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-3xl text-primary font-bold">
              Your cart is empty
            </h1>
            <Link to="/products">
              <button className="w-fit p-2 text-base text-white rounded-button bg-accent/90 hover:bg-accent cursor-pointer">
                Continue Shopping
              </button>
            </Link>
          </div>
        ))}
    </>
  );
}

export default Cart;
