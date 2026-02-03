import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import { fetchCarts, removeCartItem, updateCartItem } from "../api/cart";
import { addThousandsSeparator } from "../utils/format";
import Spinner from "../components/Spinner";

function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [finalTotal, setFinalTotal] = useState(0);

  const getCarts = useCallback(async () => {
    const res = await fetchCarts();
    setCartItems(res.data.data.carts);
    setFinalTotal(res.data.data.final_total);
  }, []);

  // 加減按鈕
  const handleQuantityChange = async (id, type) => {
    setIsLoading(true);
    const currentItem = cartItems.find((item) => item.id === id);
    const diff = type === "plus" ? 1 : -1;
    const newQty = currentItem.qty + diff;

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item,
    );

    setCartItems(updatedItems);
    await updateCart(id, updatedItems);
    setIsLoading(false);
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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const updateCart = async (id, data) => {
    const updateItem = data.find((item) => item.id === id);

    await updateCartItem(id, {
      product_id: updateItem.product_id,
      qty: updateItem.qty,
    });
    await getCarts();
    setIsLoading(false);
  };

  const handleRemove = async (id) => {
    setCartItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);
      return updatedItems;
    });
    await removeCartItem(id);
    await getCarts();
    setIsLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      await getCarts();
    };
    init();
  }, [getCarts]);

  return (
    <>
      {cartItems?.length > 0 ? (
        <div className="w-125 max-w-[80%] m-auto">
          <div className="mb-4">
            <h1 className="text-center text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
          </div>

          <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {cartItems.map((item) => (
              <li className="flex py-6 justify-around" key={item.id}>
                <div className="size-30 lg:size-40">
                  <img
                    src={
                      item.product.imageUrl ||
                      "https://dummyimage.com/600x400/eeeeee/fff"
                    }
                    alt="cover"
                  />
                </div>
                <div className="text-gray-900">
                  <p className="text-md">{item.product.title}</p>
                  <span className="text-sm font-medium">
                    {" "}
                    ${item.product.price}{" "}
                  </span>
                </div>
                <div>
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
                </div>
                <div className="p-2">
                  <button
                    className="text-red-500  hover:text-red-800 cursor-pointer"
                    onClick={() => handleRemove(item.id)}
                  >
                    <TrashIcon className="size-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mb-4 p-4 flex justify-between">
            <div>
              <h2 className="font-medium text-xl">Estimated total</h2>
              <p className="text-gray-400">
                Shipping and taxes will be calculated at checkout.
              </p>
            </div>
            <div>
              {isLoading ? (
                <div className="w-5">
                  <Spinner />
                </div>
              ) : (
                <span>${addThousandsSeparator(finalTotal, ",")}</span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <button className="w-full px-4 bg-primary hover:bg-accent text-white py-2 rounded-button transition-colors">
              Checkout
            </button>
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
      )}
    </>
  );
}

export default Cart;
