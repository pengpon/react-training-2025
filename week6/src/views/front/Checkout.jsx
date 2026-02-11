import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { createOrder } from "../../api/front/order";
import { logger } from "../../utils/logger";
import Toast from "../../utils/swal";
import { LineWave } from "react-loader-spinner";
import { useEffect } from "react";
import { fetchCarts } from "../../api/front/cart";

function Checkout() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState({});
  const [isSummaryShow, setSummaryShow] = useState(false);
  const toggleSummary = () => {
    setSummaryShow(!isSummaryShow);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailRegexPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const onSubmit = async (data) => {
    setIsPending(true);
    const { message, ...user } = data;
    try {
      const res = await createOrder({ user, message });
      navigate(`/payment/${res.data.orderId}`);
    } catch (error) {
      logger.error(error.message, error);
      Toast.fire({
        position: "top",
        icon: "warning",
        title: `Something Wrong...`,
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
      const res = await fetchCarts();
      setData(res.data.data);
      // console.log(res.data.data);
    })();
  }, []);
  return (
    <>
      <div className="py-0 flex flex-col-reverse w-full lg:w-3/4 lg:flex-row lg:items-start gap-6 text-primary-dark">
        <form
          className="mb-2 lg:mb-1 px-6 lg:py-10 w-full lg:w-1/2 lg:border-r border-gray-300"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="">
            <div className="font-medium">
              <h2 className="text-xl text-gray-900">Contact information</h2>

              <div className="my-4">
                <label htmlFor="email" className="block text-sm text-gray-700">
                  Email
                </label>
                <div className="my-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-input bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
                    {...register("email", {
                      required: "Enter email",
                      pattern: {
                        value: emailRegexPattern,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                </div>
                <div className="h-4 text-sm text-status-error">
                  {errors.email && errors.email.message}
                </div>
              </div>
              <div className="my-2">
                <label htmlFor="email" className="block text-sm text-gray-700">
                  Phone
                </label>
                <div className="my-2">
                  <input
                    id="tel"
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-input bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
                    {...register("tel", {
                      required: "Enter tel",
                      minLength: {
                        value: 8,
                        message: "Enter a valid phone number",
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Enter a valid phone number",
                      },
                    })}
                  />
                </div>
                <div className="h-4 text-sm text-status-error">
                  {errors.tel && errors.tel.message}
                </div>
              </div>
            </div>

            <div className="w-full h-px my-10 bg-gray-200"></div>

            <div className="font-medium">
              <h2 className="text-xl  text-gray-900">Shipping information</h2>

              <div className="mt-4 ">
                <div className="my-4">
                  <label htmlFor="name" className="block text-sm text-gray-700">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
                      {...register("name", {
                        required: "Enter name",
                      })}
                    />
                  </div>
                  <div className="h-4 text-sm text-status-error">
                    {errors.name && errors.name.message}
                  </div>
                </div>
                <div className="my-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
                      {...register("address", {
                        required: "Enter address",
                      })}
                    />
                  </div>
                  <div className="h-4 text-sm text-status-error">
                    {errors.address && errors.address.message}
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="message"
                      name="message"
                      rows="2"
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
                      {...register("message")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-px my-10 bg-gray-200"></div>
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
                <span className="leading-10">Proceed to Payment</span>
              )}
            </button>
          </div>
        </form>
        <div className="lg:w-1/2 lg:py-10 border-b border-gray-200 lg:border-0 lg:sticky lg:top-20">
          <div
            className="lg:sr-only px-6 py-4 flex items-center gap-2 text-gray-900  bg-gray-200 cursor-pointer"
            onClick={toggleSummary}
          >
            <h2 className=" text-xl font-medium ">Order summary</h2>
            {isSummaryShow ? (
              <ChevronUpIcon className="size-4" />
            ) : (
              <ChevronDownIcon className="size-4" />
            )}
          </div>

          <div
            className={`grid px-6 ${isSummaryShow ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} lg:block transition-grid-rows duration-300`}
          >
            <div className="overflow-hidden lg:overflow-visible">
              <div className="mt-6 lg:mt-0 mb-4">
                <ul>
                  {data?.carts?.map((item) => (
                    <li key={item.id} className="flex gap-4 w-full">
                      <div className="relative size-16">
                        <img
                          src={item.product.imageUrl || "" }
                          alt=""
                          className="rounded-main"
                        />
                        <span className="absolute -top-2 -right-2 text-white bg-gray-900 px-2 py-0.5 rounded-badge text-sm">
                          {item.qty}
                        </span>
                      </div>
                      <h3 className="grow">{item.product.title}</h3>
                      <span className="flex-end">${item.total}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Discount code"
                  className="grow rounded-input bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-primary"
                />
                <button
                  type="button"
                  className="text-base border border-transparent px-4 py-2 rounded-button bg-primary hover:bg-primary-dark text-white cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
              <div className="mb-6">
                <ul>
                  <li className="flex">
                    <span className="grow">
                      Subtotal・{data?.carts?.reduce((acc, cur)=> acc + Number(cur.qty), 0)} Items
                    </span>
                    <span>${data.total}</span>
                  </li>
                  <li className="flex">
                    <span className="grow">Shipping</span>
                    <span>$0</span>
                  </li>
                </ul>
              </div>
              <div className="flex text-xl font-medium mb-6">
                <span className="grow">Total</span>
                <span className="">${data.final_total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
