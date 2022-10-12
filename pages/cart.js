import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import {
  AiOutlineCloseCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
/*<-------------------------/------------------------->*/
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import emptyCart from "../assets/emptyCart.svg";

const CartScreen = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;
  const incQuantity = (item) => {
    const existItem = state.cart.cartItems.find((x) => x.slug === item.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (item.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const decQuantity = (item) => {
    const existItem = state.cart.cartItems.find((x) => x.slug === item.slug);
    const quantity = existItem ? existItem.quantity - 1 : 1;

    if (item.quantity <= 1) {
      dispatch({
        type: "CART_REMOVE_ITEM",
        payload: item,
      });
      toast.error(() => (
        <span>
          Item{" "}
          <b className="text-amber-500">
            <Link href={`product/${item.slug}`}>
              <a> {item.name} </a>
            </Link>
          </b>
          has been removed from the cart
        </span>
      ));
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    dispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
    toast.error(() => (
      <span>
        Item{" "}
        <b className="text-amber-500">
          <Link href={`product/${item.slug}`}>
            <a> {item.name} </a>
          </Link>
        </b>
        has been removed from the cart
      </span>
    ));
  };

  return (
    <Layout title="Shopping Cart">
      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center space-x-10">
          <div>
            <Image width={500} height={500} src={emptyCart} alt="..."></Image>
          </div>
          <div className="flex flex-col ">
            <span className="mb-5 text-xl font-bold uppercase">
              Cart is empty.
            </span>
            <Link href="/">
              <a className="relative inline-block px-5 py-5 font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-gray-600"></span>
                <span className="relative text-black group-hover:text-white text-xl font-semibold">
                  Go to shopping now!
                </span>
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:map-5 ">
          <div className="overflow-x-auto md:col-span-3 mx-3">
            <table className="min-w-full mb-3 card">
              <thead className="">
                <tr>
                  <th className="p-5 text-left">Sản phẩm </th>
                  <th className="p-5 text-center">Tên sản phẩm</th>
                  <th className="p-5 text-center">Số lượng </th>
                  <th className="p-5 text-center">Giá tiền</th>
                  <th className="p-5 text-left">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="">
                    <td>
                      <Link href={`product/${item.slug}`}>
                        <a className="flex items-center m-5 ">
                          <Image
                            src={item.image}
                            width={100}
                            height={100}
                            alt={item.name}
                          ></Image>
                          &nbsp;
                        </a>
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link href={`product/${item.slug}`}>
                        <a className=" hover:text-amber-500">
                          <b className="text-center font-bold">{item.name}</b>
                        </a>
                      </Link>
                    </td>

                    <td className="text-center">
                      <div className="flex items-center justify-center">
                        <span className="flex border border-gray-500 ">
                          <span
                            className=" border-r p-2 text-xl text-green-600 cursor-pointer"
                            onClick={() => decQuantity(item)}
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="px-3 items-center flex">
                            {item.quantity}
                          </span>
                          <span
                            onClick={() => incQuantity(item)}
                            className="border-l p-2 text-xl text-red-500 cursor-pointer"
                          >
                            <AiOutlinePlus />
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="text-xl">${item.price}</span>
                    </td>
                    <td className="h-10 w-10 mx-auto">
                      <span className="flex items-center justify-center text-xl">
                        <button
                          onClick={() => removeItemHandler(item)}
                          className="text-xl hover:text-red-500 hover:scale-110 duration-300 transition"
                        >
                          <AiOutlineCloseCircle />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-3  max-h-28">
            <ul>
              <li>
                <div className="p-3 text-xl font-semibold">
                  Tổng tiền ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                  <span className="text-rose-500">
                    {" "}
                    ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </span>
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("login?redirect=/shipping")}
                  className="button-primary w-full font-semibold text-xl text-black"
                >
                  Thanh toán
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
