function Payment() {
  return (
    <>
      <div className=" w-3/4 grid lg:grid-cols-2 gap-6">
        <form action="" className="py-10 px-4 lg:border-r border-gray-300">
          <h2 className="text-xl font-medium">Payment</h2>
          <div className="my-4">
            <label
              htmlFor="credit-card"
              className="block text-sm text-gray-700"
            >
              Credit Card
            </label>
            <div className="my-2">
              <input
                id="credit-card"
                name="credit-card"
                type="text"
                autoComplete="credit-card"
                className="block w-full rounded-input bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
              />
            </div>
            <div className="h-5 text-status-error">error</div>
          </div>
          <div className="my-4">
            <label
              htmlFor="expiration-date"
              className="block text-sm text-gray-700"
            >
              Expiration Date
            </label>
            <div className="my-2">
              <input
                id="expiration-date"
                name="expiration-date"
                type="text"
                autoComplete="expiration-date"
                placeholder="(MM/YY)"
                className="block w-full rounded-input bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
              />
            </div>
            <div className="h-5 text-status-error">error</div>
          </div>
          <div className="my-4">
            <label
              htmlFor="credit-card"
              className="block text-sm text-gray-700"
            >
              CVV Code
            </label>
            <div className="my-2">
              <input
                id="cvv-code"
                name="cvv-code"
                type="text"
                autoComplete="cvv-code"
                className="block w-full rounded-input bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
              />
            </div>
            <div className="h-5 text-status-error">error</div>
          </div>

          <div className="mb-4 lg:mb-0 mt-10 text-center">
            <button
              type="submit"
              className="text-white bg-primary rounded-button px-4 py-2 hover:bg-primary-dark cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </form>
        <div className="px-4 py-10">
          <h2 className="mb-10 text-xl font-medium text-gray-900">
            Order Details
          </h2>
          <div className=" p-2 mb-4 border-b border-gray-300">
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>$2980</p>
            </div>
            <div className="text-sm flex justify-between text-gray-500 ">
              <p>Shipping</p>
              <p>$20</p>
            </div>
          </div>

          <div className="flex justify-between p-2 text-xl">
            <p>Total</p>
            <p>$3000</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
