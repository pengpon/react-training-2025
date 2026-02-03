import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: "-OhYqNYOyROLs-DVZT3N",
      title: "清脆鮮採小黃瓜",
      price: 17,
      quantity: 1,
      imageUrl:
        "https://storage.googleapis.com/vue-course-api.appspot.com/root/1767017558836.jpg",
    },
    {
      id: "-OiSFkA5o9oRQDPxCx1R",
      title: "清新酸香新鮮檸檬",
      price: 28,
      quantity: 1,
      imageUrl:
        "https://storage.googleapis.com/vue-course-api.appspot.com/root/1767868736194.jpg",
    },
  ]);

  // 加減按鈕
  const handleQuantityChange = (id, type) => {
    if (type === "plus") {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      );
    }
  };

  // 手動輸入
  const handleQuantityInputChange = (e) => {
    const value = e.target.value;
    const id = e.target.dataset.id;

    if (value === "" || !isNaN(value)) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: value } : item,
        ),
      );
    }
  };

  // Blur 檢查
  const handleQuantityInputBlur = (e) => {
    const id = e.target.dataset.id;
    const value = parseInt(e.target.value, 10);

    let finalQuantity = value;
    if (isNaN(value) || value < 1) {
      finalQuantity = 1;
    } else if (value > 99) {
      finalQuantity = 99;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: finalQuantity } : item,
      ),
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => [...prev].filter((item) => item.id !== id));
  };

  return (
    <>
      {cartItems.length > 0 ? (
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
                      item.imageUrl ||
                      "https://dummyimage.com/600x400/eeeeee/fff"
                    }
                    alt="cover"
                  />
                </div>
                <div className="text-gray-900">
                  <p className="text-md">{item.title}</p>
                  <span className="text-sm font-medium"> ${item.price} </span>
                </div>
                <div>
                  <div className="mx-auto w-fit inline-flex items-center border border-[--color-brand-secondary]/20 rounded-lg overflow-hidden bg-white shadow-sm">
                    <button
                      className="px-3 py-2 text-secondary hover:bg-gray-100 transition-colors active:scale-95 select-none font-bold cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed"
                      onClick={() => handleQuantityChange(item.id, "minus")}
                      disabled={item.quantity <= 1}
                    >
                      －
                    </button>

                    <input
                      type="number"
                      value={item.quantity}
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
                      disabled={item.quantity >= 99}
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
              <h2 className="font-medium text-xl">Subtotal</h2>
              <p className="text-gray-400">
                Shipping and taxes will be calculated at checkout.
              </p>
            </div>
            <div>
              <span>$1000</span>
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
          <h1 className="text-3xl text-primary font-bold">Your cart is empty</h1>
          <button className="w-fit p-2 text-base text-white rounded-button bg-accent/90 hover:bg-accent cursor-pointer">Continue Shopping</button>
        </div>
      )}
    </>
  );
}

export default Cart;
