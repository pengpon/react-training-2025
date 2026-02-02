function Cart() {
  return (
    <>
      <div class="w-125 max-w-[80%] m-auto">
        <div class="mb-4">
          <h1 class="text-center text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
        </div>

        <ul class="divide-y divide-gray-200 border-t border-b border-gray-200">
          <li class="flex py-6 justify-around">
            <div class="size-30 lg:size-40">
              <img
                src="https://dummyimage.com/600x400/eeeeee/fff"
                alt="cover"
              />
            </div>
            <div class="text-gray-900">
              <p class="text-md">清香多汁新鮮柑橘</p>
              <span class="text-sm font-medium"> $32 </span>
            </div>
            <div>
              <div class="mx-auto w-fit inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                <button class="px-3 py-2 text-secondary hover:bg-gray-100 transition-colors active:scale-95 select-none font-bold">
                  －
                </button>

                <input
                  type="number"
                  value="1"
                  min="1"
                  class="w-12 text-center border-x border-gray-300 py-2 font-poppins font-medium text-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <button class="px-3 py-2 text-secondary hover:bg-gray-100 transition-colors active:scale-95 select-none font-bold">
                  ＋
                </button>
              </div>
            </div>
            <div>
              <button class="size-6 rounded-full text-gray-800 hover:text-gray-500 bg-gray-300">
                x
              </button>
            </div>
          </li>
          <li class="flex py-6 justify-around">
            <div class="size-30 lg:size-40">
              <img
                src="https://dummyimage.com/600x400/eeeeee/fff"
                alt="cover"
              />
            </div>
            <div class="text-gray-900">
              <p class="text-md">清香多汁新鮮柑橘</p>
              <span class="text-sm font-medium"> $32 </span>
            </div>
            <div>
              <div class="mx-auto w-fit inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                <button class="px-3 py-2 text-secondary hover:bg-gray-100 transition-colors active:scale-95 select-none font-bold">
                  －
                </button>

                <input
                  type="number"
                  value="1"
                  min="1"
                  class="w-12 text-center border-x border-gray-300 py-2 font-poppins font-medium text-secondary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <button class="px-3 py-2 text-secondary hover:bg-gray-100 transition-colors active:scale-95 select-none font-bold">
                  ＋
                </button>
              </div>
            </div>
            <div>
              <button class="size-6 rounded-full text-gray-800 hover:text-gray-500 bg-gray-300">
                x
              </button>
            </div>
          </li>
        </ul>
        <div class="mb-4 p-4 flex justify-between">
          <div>
            <h2 class="font-medium text-xl">Subtotal</h2>
            <p class="text-gray-400">
              Shipping and taxes will be calculated at checkout.
            </p>
          </div>
          <div>
            <span>$1000</span>
          </div>
        </div>
        <div class="mb-4">
          <button class="w-full px-4 bg-primary hover:bg-accent text-white py-2 rounded-button transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
