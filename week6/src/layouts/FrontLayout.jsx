import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

function FrontLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col bg-gray-100">
          <div className="flex-1 lg:max-w-300 mx-auto flex justify-center items-center ">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default FrontLayout;
