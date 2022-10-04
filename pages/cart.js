import Link from "next/link";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import emptyCart from "../assets/emptyCart.svg";
import Image from "next/image";

import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const CartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const router = useRouter();

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
        <div className="flex justify-center items-center space-x-10 mt-28">
          <div>
            <Image width={500} height={500} src={emptyCart} alt="..."></Image>
          </div>
          <div className="flex flex-col ">
            <span className="mb-5 text-xl font-bold uppercase">
              Cart is empty.
            </span>
            <Link href="/">
              <a class="relative inline-block px-5 py-5 font-medium group">
                <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-gray-600"></span>
                <span class="relative text-black group-hover:text-white text-xl font-semibold">
                  Go to shopping now!
                </span>
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:map-5 mt-28">
          <div className="overflow-x-auto md:col-span-3 mx-3">
            <table className="min-w-full mb-3">
              <thead className="border border-b">
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
                  <tr key={item.slug} className="border border-b">
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
                          <td className="text-center font-bold">{item.name}</td>
                        </a>
                      </Link>
                    </td>

                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">{item.price}</td>
                    <td className="h-10 w-10 mx-auto">
                      <span className="flex items-center justify-center text-xl">
                        <button onClick={() => removeItemHandler(item)}>
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
                  onClick={() => router.push("/shipping")}
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

export default CartScreen;
