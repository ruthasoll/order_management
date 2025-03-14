import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const token = localStorage.getItem("order-token");

  const handleLogout = () => {
    localStorage.removeItem("order-token");
   window.location.href = '/login'
  };

  return (
    <div className="py-3 px-4 flex items-center justify-between shadow-sm bg-white">
      <NavLink
        to={"/"}
        className="text-2xl text-zinc-900 flex items-center gap-x-2"
      >
        <HomeOutlined />
        OrderTracker
      </NavLink>
      <ul className="flex items-center gap-x-4 list-none">
        <li>
          <NavLink to={"/products"} className="flex items-center gap-x-2">
            <ShoppingCartOutlined />
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to={"/orders"} className="flex items-center gap-x-2">
            <OrderedListOutlined />
            Orders
          </NavLink>
        </li>
        {!token ? (
          <li>
            <NavLink to={"/login"} className="flex items-center gap-x-2">
              <LoginOutlined />
              Login
            </NavLink>
          </li>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-x-2 text-red-600"
            >
              <LogoutOutlined />
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
