import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
/*<-------------------------/------------------------->*/
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import emptyCart from "../assets/emptyCart.svg";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { getError } from "../utils/error";
import axios from "axios";
import Cookies from "js-cookie";

export default function PlaceOrderScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); //123,456 -> 123,46
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandle = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place Order </h1>
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
        <div className="grid md:grid-cols-4 md:gap-10">
          <div className="overflow-x-auto md:col-span-3 space-y-5">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Địa chỉ giao hàng</h2>
              <div>
                {shippingAddress.fullName} ,{shippingAddress.address} ,
                {shippingAddress.city} ,{shippingAddress.postalCode} ,
                {shippingAddress.country}
              </div>
              <div>
                <Link href="/shipping">Chỉnh sửa</Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Phương thức thanh toán</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment">Chỉnh sửa</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-xl">Đặt hàng</h2>
              <table className="min-w-full">
                <thead className="border border-amber-500">
                  <tr>
                    <th className="p-5 text-left">Sản phẩm </th>
                    <th className="p-5 text-center">Tên sản phẩm</th>
                    <th className="p-5 text-center">Số lượng </th>
                    <th className="p-5 text-center">Giá tiền</th>
                    <th className="p-5 text-center">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border border-amber-500">
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
                            <span className="px-3 items-center flex">
                              {item.quantity}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="text-xl">${item.price}</span>
                      </td>
                      <td className="text-center">
                        <span className="text-xl">
                          ${item.price * item.quantity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">Chỉnh sửa</Link>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Sản phẩm</div>
                  <div>${itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping </div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tổng tiền thanh toán </div>
                  <div>${totalPrice}</div>
                </div>
              </li>
              <li>
                <button
                  disabled={loading}
                  onClick={placeOrderHandle}
                  className="button-primary w-full"
                >
                  {loading ? "Loading" : "Place order"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
