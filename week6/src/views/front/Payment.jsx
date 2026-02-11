import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { payOrder } from "../../api/front/payment";
import { LineWave } from "react-loader-spinner";
import { logger } from "../../utils/logger";
import Toast from "../../utils/swal";
import { useState } from "react";

function Payment() {
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    setIsPending(true)
    try {
      await payOrder(id);
      navigate("/payment/thanks");
    } catch (error) {
      logger.error(error.message, error);
      Toast.fire({
        position: "top",
        icon: "warning",
        title: error.response.data.message,
        color: "#fff",
        iconColor: "#fff",
        background: "#ff8f40",
      });
    } finally {
      setIsPending(false)
    }
  };
  return (
    <>
      <div className="w-full lg:w-3/4 grid lg:grid-cols-2 gap-6">
        <form
          action=""
          className="py-10 px-4 lg:border-r border-gray-300"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-xl font-medium">Payment</h2>
          <div className="my-4">
            <label
              htmlFor="credit-card"
              className="block text-sm text-gray-700"
            >
              Credit Card Number
            </label>
            <div className="my-2">
              <input
                id="credit-card"
                name="credit-card"
                type="text"
                autoComplete="credit-card"
                className="block w-full rounded-input bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
                {...register("credit-card", {
                  required: "Enter a card number",
                  pattern: {
                    value: /^[0-9]{13,19}$/,
                    message: "Enter a valid card number",
                  },
                })}
              />
            </div>
            <div className="h-4 text-sm text-status-error">
              {errors["credit-card"] && errors["credit-card"].message}
            </div>
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
                {...register("expiration-date", {
                  required: "Enter expiration date",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                    message: "Enter a valid expiration date",
                  },
                })}
              />
            </div>
            <div className="h-4 text-sm  text-status-error">
              {errors["expiration-date"] && errors["expiration-date"].message}
            </div>
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
                {...register("cvv-code", {
                  required: "Enter the CVV or security code on your card",
                  pattern: {
                    value: /^[0-9]{3,4}$/,
                    message: "Enter the CVV or security code on your card",
                  },
                })}
              />
            </div>
            <div className="h-4 text-sm text-status-error">
              {errors["cvv-code"] && errors["cvv-code"].message}
            </div>
          </div>

          <div className="mb-4 lg:mb-0 mt-10 text-center">
            <button
              type="submit"
              className="text-white bg-primary rounded-button px-4 py-2 hover:bg-primary-dark cursor-pointer"
            >
              {isPending ? (
                <LineWave
                  width={40}
                  height={40}
                  color="#fff"
                  ariaLabel="line-wave-loading"
                />
              ) : (
                <span className="leading-10">Confirm</span>
              )}
            </button>
          </div>
        </form>
        <div className="px-4 py-10 order-first lg:order-last">
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
