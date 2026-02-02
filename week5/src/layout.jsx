import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex gap-2"></div>
        <main className="flex-1 container">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
