import { Link } from "react-router";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
function PaymentSuccess() {
  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <div className="mx-auto mb-4">
          <CheckBadgeIcon className="size-20 text-primary" />
        </div>
        <h1 className="text-xl lg:text-3xl font-medium mb-4">Payment Successful</h1>
        <p className="text-base lg:text-xl mb-10">Thank you for your purchase!</p>
        <Link to="/">
          <button className="px-4 py-2 font-bold text-base text-white bg-primary hover:bg-primary-dark hover-shadow-soft-md rounded-button cursor-pointer">
            Let's Go Home
          </button>
        </Link>
      </div>
    </>
  );
}

export default PaymentSuccess;
