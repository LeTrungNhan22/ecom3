import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

const ShippingScreen = () => {
  //router
  const router = useRouter();

  // declare useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);
  //submitHandler  function
  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
          location,
        },
      })
    );
    router.push("/payment");
  };
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1}></CheckoutWizard>
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-screen-md">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <h1 className="mb-4 text-xl">Địa chỉ giao hàng</h1>
            <div className="mb-0 space-y-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Họ và tên
                </label>
                <div className="mt-1">
                  <input
                    {...register("fullName", {
                      required: "Vui lòng nhập họ và tên đầy đủ của bạn",
                    })}
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoFocus
                  />
                  {errors.fullName && (
                    <div className="text-red-500 mt-2">
                      {errors.fullName.message}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Địa chỉ giao hàng
                </label>
                <div className="mt-1">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    {...register("address", {
                      required: "Vui lòng nhập địa chỉ giao hàng của bạn",
                      minLength: {
                        value: 5,
                        message: "Địa chỉ giao hàng phải nhiều hơn 5 kí tự",
                      },
                    })}
                  />
                  {errors.address && (
                    <div className="text-red-500 mt-2">
                      {errors.address.message}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  Thành phố
                </label>
                <div className="mt-1">
                  <input
                    {...register("city", {
                      required: "Vui lòng nhập tên thành phố của bạn",
                    })}
                    id="city"
                    name="city"
                    type="text"
                    autoFocus
                  />
                  {errors.city && (
                    <div className="text-red-500 mt-2">
                      {errors.city.message}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP code
                </label>
                <div className="mt-1">
                  <input
                    {...register("postalCode", {
                      required: "Vui lòng nhập mã ZIP",
                    })}
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    autoFocus
                  />
                  {errors.postalCode && (
                    <div className="text-red-500 mt-2">
                      {errors.postalCode.message}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quốc gia
                </label>
                <div className="mt-1">
                  <input
                    {...register("country", {
                      required: "Vui lòng nhập tên quốc gia",
                    })}
                    id="country"
                    name="country"
                    type="text"
                    autoFocus
                  />
                  {errors.country && (
                    <div className="text-red-500 mt-2">
                      {errors.country.message}
                    </div>
                  )}
                </div>
              </div>
              {/* <div>
                <label
                  for="company-size"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company size
                </label>
                <div class="mt-1">
                  <select name="company-size" id="company-size" class="">
                    <option value="">Please select</option>
                    <option value="small">1 to 10 employees</option>
                    <option value="medium">11 to 50 employees</option>
                    <option value="large">50+ employees</option>
                  </select>
                </div>
              </div> */}

              <div>
                <button className="transition duration-150 mt-3 divide-neutral-300 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  Tiếp theo
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default ShippingScreen;
ShippingScreen.auth = true;
