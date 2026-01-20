function Pagination() {
  return (
    <>
      <div className="flex justify-center gap-2">
        <button className="w-10 h-10 rounded-main text-gray-400 bg-gray-100 hover:text-white hover:bg-primary cursor-pointer">
          xxx
        </button>
        <button className="w-10 h-10 rounded-main text-white bg-primary cursor-pointer">
          1
        </button>
        <button className="w-10 h-10 rounded-main text-gray-400 bg-gray-100 hover:text-white hover:bg-primary cursor-pointer">
          2
        </button>
        <button className="w-10 h-10 rounded-main text-gray-400 bg-gray-100 hover:text-white hover:bg-primary cursor-pointer">
          ...
        </button>
        <button className="w-10 h-10 rounded-main text-gray-400 bg-gray-100 hover:text-white hover:bg-primary cursor-pointer">
          xxxx
        </button>
      </div>
    </>
  );
}

export default Pagination;
