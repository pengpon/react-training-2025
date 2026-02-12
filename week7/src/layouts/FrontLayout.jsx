import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

function FrontLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col bg-gray-100">
          <div className="flex-1 w-3/4 lg:w-full lg:max-w-300 mx-auto flex justify-center">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default FrontLayout;
