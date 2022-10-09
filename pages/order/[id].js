import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function OrderScreen() {
  // order/:id
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        console.log(data);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <Layout title={`Oder ${orderId}`}>
      <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className=" grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3 space-y-3">
            <div className="card p-5">
              <div>
                {shippingAddress.fullName} ,{shippingAddress.address} ,
                {shippingAddress.city} ,{shippingAddress.postalCode} ,
                {shippingAddress.country}
              </div>
              {isDelivered ? (
                <div className="alert-success"> Delivered at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not delivered</div>
              )}
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Phương thức thanh toán</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success"> Paid at {paidAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>

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
                  {orderItems.map((item) => (
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
            </div>
          </div>
          <div>
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
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tổng tiền thanh toán </div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;
