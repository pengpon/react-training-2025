function Pagination({ current = 1, total = 2, range = 3 }) {
  let pagesArr = [];
  const generateArr = (n, m) => Array.from({ length: m - n + 1 }, (_, i) => n + i);

  const getPagesArr = () => {
    let arr = [];
    if (total <= range + 2) return generateArr(1, total);

    let start = current - Math.floor(range / 2);
    let end = current + Math.floor(range / 2);

    if (start < 2) {
      start = 2;
      end = 2 + range - 1;
    }
    if (end - total >= 0) {
      end = total - 1;
      start = end - range + 1;
    }

    arr = generateArr(start, end);
    if (arr[0] > 2) arr[0] = "more"; // left more
    if (total - arr[arr.length - 1] > 1) arr[arr.length - 1] = "more"; // right more
    return [1, ...arr, total];
  };

  pagesArr = getPagesArr();

  return (
    <>
      <div className="flex justify-center gap-2">
        <button
          className="flex justify-center items-center w-10 h-10 rounded-main text-gray-900 bg-gray-100 hover:text-white hover:bg-primary cursor-pointer disabled:text-gray-300 disabled:bg-transparent disabled:cursor-auto"
          disabled={current === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {pagesArr.map((page, index) => (
          <button
            key={index}
            className={`flex justify-center items-center w-10 h-10 rounded-main text-gray-400 bg-gray-100 hover:text-white hover:bg-primary/70 cursor-pointer disabled:text-gray-300 disabled:bg-transparent disabled:cursor-auto ${page === current ? `text-white bg-primary hover:bg-primary-dark` : ""}`}
          >
            {page === "more" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            ) : (
              page
            )}
          </button>
        ))}
        <button
          className="flex justify-center items-center w-10 h-10 rounded-main text-gray-900 bg-gray-100 hover:text-white hover:bg-primary cursor-pointer disabled:text-gray-300 disabled:bg-transparent disabled:cursor-auto"
          disabled={current === total}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Pagination;
