import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";


function ErrorState() {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <div className="text-gray-300 mb-6">
          <ExclamationTriangleIcon className="size-10" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Unable to load content
        </h2>
        <p className="text-gray-500 mb-8 max-w-sm">
          Something went wrong while fetching the data. Please check your
          connection or try again later.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Retry
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </>
  );
}

export default ErrorState;
