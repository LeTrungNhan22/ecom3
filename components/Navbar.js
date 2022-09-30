import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { GoThreeBars } from "react-icons/go";

import logo from "../assets/amazon_logo.png";

const Header = () => {
  return (
    <header className="px-3 lg:px-10 py-4 shadow-md bg-gray-100 ">
      <nav className="flex items-center justify-between transition duration-200">
        <Link href="/">
          <div className="text-xs shadow-md p-2 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 mr-3 bg-white ">
            <Image src={logo} width={50} height={50} alt="logo"></Image>
          </div>
        </Link>

        <div className="hidden xl:flex items-center space-x-6">
          <Link href="/">
            <a>
              <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-amber-400 relative inline-block hover:scale-105 duration-200">
                <span class="relative text-white uppercase lg:text-md text-xs">
                  Sell now!
                </span>
              </span>
            </a>
          </Link>
          <Link href="/">
            <a href="">Home</a>
          </Link>
          <Link href="/">
            <a href="">Category</a>
          </Link>
        </div>

        {/* search bar */}
        <div
          className="hidden lg:flex justify-center w-1/2 max-w-sm relative shadow-md rounded-ful
                        transition duration-300 focus-within:scale-105 focus-within:shadow-xl rounded-full"
        >
          <input
            type="text"
            className="w-full border border-amber-500 border-r-0 pl-12 py-3 pr-3 rounded-l-full
                        focus:outline-none "
            placeholder="Search..."
          />

          <button class="relative inline-flex items-center justify-start px-7 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group border border-amber-500 rounded-r-full">
            <span class="w-48 h-48 rounded rotate-[-40deg] bg-amber-500 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              <AiOutlineSearch size={20} />
            </span>
          </button>
        </div>

        <div className=" flex items-center justify-center space-x-4 border border-gray-500 px-7 py-2 rounded-full shadow-md bg-white">
          <Link href="/cart">
            <a className="text-center flex flex-col items-center justify-center   text-gray-700 hover:text-amber-500 hover:scale-105 duration-300 transition relative">
              <div className="text-2xl ">
                <AiOutlineHeart />
              </div>
              <div className="text-xs leading-3 font-semibold ">Wish list</div>
              <span
                className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center
              justify-center bg-amber-500 text-white text-xs shadow-sm"
              >
                8
              </span>
            </a>
          </Link>
          <Link href="/cart">
            <a className="text-center flex flex-col items-center justify-center  text-gray-700 hover:text-amber-500 hover:scale-105 duration-300 transition relative">
              <div className="text-2xl">
                <AiOutlineHeart />
              </div>
              <div className="text-xs leading-3 font-semibold">Wish list</div>
              <span
                className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center
              justify-center bg-amber-500 text-white text-xs shadow-sm"
              >
                8
              </span>
            </a>
          </Link>
          <Link href="/wishlist">
            <a className="text-center flex flex-col items-center justify-center text-gray-700 hover:text-amber-500 hover:scale-105 duration-300  transition relative">
              <div className="text-2xl">
                <AiOutlineShoppingCart />
              </div>
              <div className="text-xs leading-3 font-semibold">Cart</div>
              <span
                className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center
              justify-center bg-amber-500 text-white text-xs shadow-sm"
              >
                2
              </span>
            </a>
          </Link>
        </div>

        <div className="hidden xl:flex space-x-4 items-center ">
          <Link href="/">
            <a class="relative px-6 py-3 font-bold text-black group shadow-md bg-white">
              <span class="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-gray-200 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span class="absolute inset-0 w-full h-full border-4 border-black"></span>
              <span class="relative uppercase  text-center text-xs xl:text-sm">
                Sign Up
              </span>
            </a>
          </Link>
          <Link href="/">
            <a class="relative px-6 py-3 font-bold text-black group shadow-md bg-white">
              <span class="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-amber-400 group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span class="absolute inset-0 w-full h-full border-4 border-black"></span>
              <span class="relative uppercase  text-center text-xs xl:text-sm">
                Sign In
              </span>
            </a>
          </Link>
        </div>
        <div className="flex xl:hidden">
          <GoThreeBars size={30} />
        </div>
      </nav>
    </header>
  );
};

export default Header;