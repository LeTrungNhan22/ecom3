import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const router = useRouter();

  const submitHandler = (event) => {
    event.preventDefault();
    if (!selectedPaymentMethod) {
      toast.error("Payment method is required");
    }
    dispatch({
      type: "SAVE_PAYMENT_METHOD",
      payload: selectedPaymentMethod,
    });

    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);
  return (
    <Layout title="Payment method">
      <CheckoutWizard activeStep={2} />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-screen-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 ">
          <h1 className="mb-4 text-xl">Phương thức thanh toán</h1>
          <form className="mx-auto max-w-screen-md " onSubmit={submitHandler}>
            {["Paypal", "Stripe", "COD"].map((payment) => (
              <div key={payment} className="mb-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  id={payment}
                  className="outline-none focus:ring-0 mx-1 duration-200 transition shadow-xl shadow-gray-300  cursor-pointer"
                  checked={selectedPaymentMethod === payment}
                  onChange={() => setSelectedPaymentMethod(payment)}
                />
                <label className="p2" htmlFor={payment}>
                  {payment}
                </label>
              </div>
            ))}

            <div className="mb-4 flex justify-between space-x-3 ">
              <button
                onClick={() => router.push("/shipping")}
                type="button"
                className="default-button py-2"
              >
                Trở lại
              </button>
              <button className="button-primary">Tiếp theo</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

PaymentScreen.auth = true;
