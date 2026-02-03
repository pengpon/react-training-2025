import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center gap-6 text-primary-dark">
        <div className="flex items-center gap-4">
          <ExclamationTriangleIcon className="size-10" />
          <p className="font-bold text-3xl">Page Not Found</p>
        </div>
        <Link to="/">
          <button className="px-4 py-2 font-bold text-base text-white bg-accent/80 hover:bg-accent hover-shadow-soft-md rounded-button cursor-pointer">
            Let's Go Home
          </button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
