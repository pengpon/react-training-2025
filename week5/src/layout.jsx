import { Outlet, NavLink } from "react-router";

function Layout() {
  return (
    <>
      <header>Header</header>
      <div className="flex gap-2">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">List</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </div>
      <Outlet />
      <footer>Footer</footer>
    </>
  );
}

export default Layout;
