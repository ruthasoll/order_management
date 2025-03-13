import React from 'react'
import { NavLink, Link } from "react-router";

const Navbar = () => {
  return (
    <div className='py-3 px-4 flex items-center justify-between shadow-sm'>
        <NavLink to={"/"} className='text-2xl text-zinc-900'>Order</NavLink>
        <ul className='flex items-center gap-x-4 list-none'>
            <li><NavLink to={"/products"}>Products</NavLink> </li>
            <li><NavLink to={"/orders"}>Orders</NavLink> </li>
            <li><NavLink to={"/login"}>Login</NavLink> </li>
            <li><NavLink to={"/"}>Logout</NavLink> </li>
        </ul>
    </div>
  )
}

export default Navbar