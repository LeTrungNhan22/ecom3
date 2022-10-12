/* eslint-disable no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineLogout,
} from "react-icons/ai";
import { BiCoinStack } from "react-icons/bi";
import { CgMenuGridR } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { signOut, useSession } from "next-auth/react";
import { Disclosure, Menu } from "@headlessui/react";
import Cookies from "js-cookie";

import logo from "../assets/amazon_logo.png";
import avatar from "../assets/Avatar.png";
import { Store } from "../utils/Store";
import DropdownLink from "./DropdownLink";

const Header = () => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCounts] = useState(0);
  useEffect(() => {
    setCartItemsCounts(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };
  return (
    <header className="px-3 lg:px-10 py-4 shadow-md bg-gray-100 fixed w-full z-[99] bg-gradient-to-t from-gray-100 to-transparent">
      <nav className="flex items-center justify-between transition duration-200">
        <Link href="/">
          <div className="hidden md:inline-block text-xs shadow-md p-2 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 mr-3 bg-white ">
            <Image src={logo} width={50} height={50} alt="logo"></Image>
          </div>
        </Link>
        <div className="hidden xl:flex items-center space-x-6">
          <Link href="/" className="">
            <a>
              <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-amber-400 relative inline-block hover:scale-105 duration-200">
                <span className="relative text-white uppercase lg:text-md text-xs">
                  Kênh người bán
                </span>
              </span>
            </a>
          </Link>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/">
            <a href="">Category</a>
          </Link>
        </div>

        {/* search bar */}
        <div
          className="flex justify-center w-1/2 max-w-sm relative shadow-md rounded-ful
                        transition duration-200 focus-within:scale-105 focus-within:shadow-xl rounded-full"
        >
          <input
            className="w-full border border-gray-500 border-r-0 pl-12 py-3 pr-3 rounded-l-full
                        focus:outline-none text-xs md:text-base"
            placeholder="Tìm kiểm sản phẩm..."
          />

          <button className="relative inline-flex items-center justify-start px-7 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group border border-gray-500 rounded-r-full">
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-amber-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              <AiOutlineSearch size={20} />
            </span>
          </button>
        </div>

        <div className=" flex items-center justify-center space-x-4 border border-gray-500 px-7 py-2 rounded-full shadow-md bg-white">
          <Link href="/">
            <a className="text-center flex flex-col items-center justify-center   text-gray-700 hover:text-amber-500 hover:scale-105 duration-300 transition relative">
              <div className="text-3xl ">
                <AiOutlineHeart />
              </div>

              {/* <span
                className="absolute -right-2 -top-1 w-5 h-5 rounded-full flex items-center
              justify-center bg-amber-500 text-white text-xs shadow-sm"
              >
                8
              </span> */}
            </a>
          </Link>
          <Link href="/cart">
            <a className=" text-center flex flex-col items-center justify-center text-gray-700 hover:text-amber-500 hover:scale-105 duration-300  transition relative">
              <div className="text-3xl">
                <AiOutlineShoppingCart />
              </div>

              {cartItemsCount > 0 && (
                <span
                  className="absolute -right-2 -top-1 w-5 h-5 rounded-full flex items-center
                             justify-center bg-amber-500 text-white text-xs shadow-sm"
                >
                  {cartItemsCount}
                </span>
              )}
            </a>
          </Link>
          <Link href="/">
            <a className="text-center flex flex-col items-center justify-center  text-gray-700 hover:text-amber-500 hover:scale-105 duration-300 transition relative">
              <div className="text-3xl">
                <CgMenuGridR />
              </div>
            </a>
          </Link>
        </div>

        {status === "loading" ? (
          "Loading"
        ) : session?.user ? (
          <Menu as="div" className="hidden relative md:inline-block">
            <Menu.Button>
              <div className=" flex items-center space-x-5   border border-gray-500 px-3 py-2 rounded-full shadow-md bg-white">
                <span className="mx-3 font-semibold text-gray-600">
                  Xin chào,{" "}
                  <span className="text-amber-600"> {session.user.name}</span>
                </span>
                <Image
                  src={avatar}
                  alt="avatar__profile"
                  width={40}
                  height={40}
                  className="rounded-full shadow-md border border-gray-400"
                ></Image>
              </div>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-1 w-56 origin-top-right bg-white p-1 rounded-2xl shadow-lg ">
              <div className="flex flex-col mb-3">
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    <a
                      className="dropdown-link"
                      href="#"
                      onClick={logoutClickHandler}
                    >
                      <span className="flex flex-row space-x-10 items-center text-lg">
                        <CgProfile className="text-green-500 mx-1 " />
                        Profile
                      </span>
                    </a>
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    <a
                      className="dropdown-link"
                      href="#"
                      onClick={logoutClickHandler}
                    >
                      <span className="flex flex-row space-x-10 items-center text-lg">
                        <BiCoinStack className="text-yellow-500 mx-1 " />
                        Coin
                      </span>
                    </a>
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    <a
                      className="dropdown-link"
                      href="#"
                      onClick={logoutClickHandler}
                    >
                      <span className="flex flex-row space-x-10 items-center text-lg">
                        <AiOutlineLogout className="text-red-500 mx-1 " />
                        Logout
                      </span>
                    </a>
                  </DropdownLink>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        ) : (
          <div className="hidden xl:flex space-x-4 items-center ">
            <Link href="/register">
              <a className="relative px-6 py-3 font-bold text-black group shadow-md bg-white">
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-gray-200 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
                <span className="relative uppercase  text-center text-xs xl:text-sm">
                  Đăng ký
                </span>
              </a>
            </Link>
            <Link href="/login">
              <a className="relative px-6 py-3 font-bold text-black group shadow-md bg-white">
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-amber-400 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
                <span className="relative uppercase  text-center text-xs xl:text-sm">
                  Đăng nhập
                </span>
              </a>
            </Link>
          </div>
        )}

        <Disclosure as="nav">
          <div className="lg:hidden shadow-md rounded-md border flex  border-gray-500 p-1 bg-white">
            <Disclosure.Button className="group w-full hover:text-amber-500 peer  items-end">
              <GiHamburgerMenu size={30} aria-hidden="true" />
            </Disclosure.Button>
          </div>
          <Disclosure.Panel>
            <div className="p-6 w-[150%] h-[100vh] bg-white z-40 fixed top-0 -left-96 lg:w-60 lg:left-0 peer-focus:left-0 ease-out transition-all delay-150 duration-200 "></div>
          </Disclosure.Panel>
        </Disclosure>
      </nav>
    </header>
  );
};

export default Header;
