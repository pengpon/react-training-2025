function Alert({data, onConfirm, onCancel}) {
  return (
    <>
      <div className="flex items-center justify-center fixed z-50 inset-0 bg-black/60">
        <div className="relative px-4 min-h-screen flex items-center justify-center">
          <div className="relative bg-white rounded-lg max-w-md p-4 inset-x-0 bottom-0 z-50 mb-4 shadow-lg">
            <p className="mb-4 font-bold text-center">提醒 ! </p>

            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-status-danger/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8 text-status-danger"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <div className="text-gray-700">
                <p className="text-md">Are you sure you want to delete "<span className="font-bold">{data.title}</span>" ?</p>
                <span className="text-sm font-normal">Warning: This action cannot be undone.</span>
              </div>
            </div>
            <div className="flex justify-center gap-2 text-center">
              <button
                title="delete"
                type="button"
                className="px-4 py-2 rounded-main border font-medium border-gray-200 text-status-danger bg-gray-100 hover:text-white hover:bg-status-danger cursor-pointer"
                onClick={onConfirm}
              >
                Delete
              </button>
              <button
                title="cancel"
                type="button"
                className="px-4 py-2 rounded-main border font-medium border-gray-200 text-gray-600 bg-white hover:bg-gray-50 cursor-pointer"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alert;
