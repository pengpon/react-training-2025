import {
  MapPinIcon,
  Bars3CenterLeftIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/images/logo.png";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";

function Header() {
  const menuItems = [
    { title: "Catalog", path: "products" },
    // { title: "Vegetables & Fruits", path: "products" },
    { title: "Blog", path: "blog" },
    { title: "About Us", path: "about" },
  ];
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    menuRef.current.style.left = "0";
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    menuRef.current.style.left = "-400px";
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleMediaChange = (e) => {
      if (e.matches) {
        menuRef.current.style.left = "-400px";
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full shadow-">
        <div className="flex h-10 lg:h-20 px-4 lg:px-10 justify-between bg-root-surface shadow-soft-md">
          {/* navbar start */}
          <div className="flex items-center flex-1">
            <div
              tabIndex="0"
              role="button"
              className="lg:hidden"
              onClick={handleMenuOpen}
            >
              <Bars3CenterLeftIcon className="size-8 hover:stroke-[2px] p-1 text-primary/80 transition-all duration-300 hover:text-primary-dark cursor-pointer" />
            </div>

            <ul className="text-base px-1 hidden lg:flex lg:gap-4 lg:items-center">
              {menuItems.map((item, index) => (
                <li key={index} className="relative group hover:text-primary-dark">
                  <NavLink to={item.path}>
                    {item.title}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* navbar center */}
          <div className="flex">
            <a href="#" className="inline">
              <h1 className="sr-only">r・oot</h1>
              <img
                className="w-full h-full object-contain"
                src={logo}
                alt="logo"
              />
            </a>
          </div>
          {/* navbar end */}
          <div className="flex flex-1 gap-2 items-center justify-end">
            <Link to="login">
              <UserIcon className="size-8 hover:stroke-[2px] p-1 transition-all duration-300 hover:text-primary-dark cursor-pointer" />
            </Link>
            <Link to="/location">
              <MapPinIcon className="size-8 hover:stroke-[2px] p-1  transition-all duration-300 hover:text-primary-dark cursor-pointer" />
            </Link>
            <Link to="/cart">
              <div className="relative">
                <ShoppingBagIcon className="size-8 p-1 hover:stroke-[2px] transition-all duration-300 hover:text-primary-dark cursor-pointer" />
                {/* <span className="absolute top-0 right-0 rounded-full bg-accent w-3 h-3"></span> */}
              </div>
            </Link>
          </div>

          {/* overlay */}
          {isMenuOpen && (
            <div className="absolute z-10 w-screen h-screen left-0 top-0 bg-gray-800/50"></div>
          )}

          {/* menu */}
          <div
            className="fixed z-10 -left-100 w-[320px] h-screen px-4 py-10 bg-root-bg transition-all duration-300 ease-in-out"
            ref={menuRef}
          >
            <div className="h-full flex flex-col gap-6">
              <div className="flex justify-end">
                <button
                  className="group p-2 -m-2 text-content-muted hover:text-content-main rounded-full transition-all duration-200 cursor-pointer"
                  onClick={handleMenuClose}
                >
                  <XMarkIcon className="size-6 transition-transform group-hover:rotate-90" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold leading-tight mb-10">Shop</h2>
                <ul
                  className="flex flex-col gap-4 text-xl font-normal"
                  onClick={handleMenuClose}
                >
                  {menuItems.map((item, index) => (
                    <li key={index} className="relative w-fit group">
                      <NavLink to={item.path}>
                        {item.title}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="">
                <Link to="login" onClick={handleMenuClose}>
                  <button className="text-white bg-secondary/80 rounded-button px-4 py-2 hover:bg-secondary cursor-pointer">
                    Log In
                  </button>
                </Link>
                <div className="text-sm italic text-content-muted py-2">
                  <div className="flex gap-2">
                    <span>No Account Yet ?</span>
                    <Link to="register" onClick={handleMenuClose}>
                      <button
                        type="button"
                        className="flex gap-2 items-center cursor-pointer  text-content-muted hover:text-primary transition-colors duration-300 group"
                      >
                        <span className="text-sm font-medium underline underline-offset-4 decoration-root-border hover:decoration-primary">
                          Create Account
                        </span>
                        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
