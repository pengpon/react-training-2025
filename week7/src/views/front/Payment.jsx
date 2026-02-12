import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { payOrder } from "../../api/front/payment";
import { LineWave } from "react-loader-spinner";
import { logger } from "../../utils/logger";
import Toast from "../../utils/swal";
import { useEffect, useState } from "react";
import { addThousandsSeparator } from "../../utils/format";
import { fetchOrder } from "../../api/front/order";

function Payment() {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [order, setOrder] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    setIsPending(true);
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
      setIsPending(false);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetchOrder(id);
      setOrder(res.data.order);
    })();
  }, [id, setOrder]);

  useEffect(() => {
    if (isPending) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isPending]);

  return (
    <>
      {/* overlay */}
      {isPending && (
        <div className="absolute z-50 w-screen h-screen left-0 top-0 bg-gray-800/50 "></div>
      )}
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
              <p>Date</p>
              <p>
                {new Date(
                  Number(String(order?.create_at).padEnd(13, "0")) || 0,
                ).toLocaleDateString("zh-tw", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>${addThousandsSeparator(order?.total || 0)}</p>
            </div>
            <div className="text-sm flex justify-between text-gray-500 ">
              <p>Shipping</p>
              <p>$0</p>
            </div>
          </div>

          <div className="flex justify-between p-2 text-xl">
            <p>Total</p>
            <p>${addThousandsSeparator(order?.total || 0)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
