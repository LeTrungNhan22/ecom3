import React, { useEffect } from "react";
import { FaFacebookF, FaGoogle, FaRegEnvelope } from "react-icons/fa";
import { TbLock } from "react-icons/tb";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { getError } from "../utils/error";

const LoginScreen = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    console.log(session?.user);
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [session, router, redirect]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Login">
      <main className="flex items-center justify-center w-full flex-1 px-3 lg:px-20 text-center md:mt-28 mt-10 transition duration-300">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-full lf:w-2/3 max-w-4xl">
          {/* login section */}
          <div className="w-full lf:w-3/5 p-5">
            <div className="text-left font-bold ">
              Nhóm{" "}
              <span className="text-amber-500 text-xl line-through font-mono">
                10
              </span>
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-amber-500 mb-2 ">
                Đăng nhập
              </h2>
              <div className="border-2 w-10 bg-amber-600 border-amber-600 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <a
                  href=""
                  className="border-2 text-amber-600 shadow-lg hover:text-blue-600  hover:scale-105  duration-300 transition border-gray-400 rounded-full p-3 mx-1"
                >
                  <FaFacebookF className="text-2xl" />
                </a>
                <a
                  href=""
                  className="border-2 text-amber-600 shadow-lg hover:scale-105 hover:text-green-500  duration-300 transition  border-gray-400 rounded-full p-3 mx-1"
                >
                  <FaGoogle className="text-2xl" />
                </a>
              </div>
              <p className="italic text-gray-500 mb-3">
                hoặc sử dụng tải khoản email của bạn
              </p>
              <form
                className="flex items-center flex-col"
                onSubmit={handleSubmit(submitHandler)}
              >
                <div className="bg-gray-200 w-64 p-3 flex items-center mb-2  rounded-2xl shadow-inner shadow-gray-400 transition duration-200 focus-within:shadow-gray-600 focus-within:scale-105">
                  <FaRegEnvelope className="text-gray-400 mr-2" />
                  <label htmlFor="email"></label>
                  <input
                    {...register("email", {
                      required: "Please enter email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                        message: "Please enter valid email",
                      },
                    })}
                    name="email"
                    id="email"
                    placeholder="Email"
                    autoFocus
                    className="outline-none bg-gray-200 text-sm flex-1 "
                  ></input>
                </div>

                {errors.email && (
                  <div className="text-red-500 mb-2 w-2/5 text-left font-medium italic inline-block duration-300 transition-all">
                    {errors.email.message}
                  </div>
                )}

                <div className="bg-gray-200 w-64 p-3 flex items-center mb-3 rounded-2xl shadow-inner shadow-gray-400 transition duration-200 focus-within:shadow-gray-600 focus-within:scale-105">
                  <TbLock className="text-gray-400 mr-2" />
                  <label htmlFor="password"></label>
                  <input
                    {...register("password", {
                      required: "Please enter password",
                      minLength: {
                        value: 6,
                        message: "Password is more than 5 chars",
                      },
                    })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="outline-none bg-gray-200 text-sm flex-1"
                  />
                </div>
                {errors.password && (
                  <div className="text-red-500 mb-2 w-2/5 text-left font-medium italic inline-block duration-200 transition-all">
                    {errors.password.message}
                  </div>
                )}
                <div className="flex w-64 mb-5 justify-between">
                  <label
                    htmlFor=""
                    className="flex items-center text-xs italic font-semibold"
                  >
                    <input
                      type="checkbox"
                      name="remember"
                      className="mr-1 border-none outline-none cursor-pointer "
                    />
                    Nhớ tài khoản
                  </label>
                  <a
                    href=""
                    className=" font-bold text-xs outline-none cursor-pointer text-amber-600"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <button>
                  <div
                    href=""
                    className="font-semibold hover:scale-110 hover:bg-amber-500 hover:text-white duration-300 transition shadow-md border-2 border-amber-500 rounded-full px-12 py-2 inline-block"
                  >
                    Đăng nhập
                  </div>
                </button>
              </form>
            </div>
          </div>
          {/* login section */}

          <div className="w-full lg:w-2/5 bg-amber-500 text-white  rounded-br-2xl rounded-bl-2xl lg:rounded-tr-2xl lg:rounded-bl-none py-36 px-12">
            <p className="text-3xl font-bold mb-2">Welcome our shop </p>
            <div className="border-2 w-10 bg-white border-white inline-block mb-2"></div>
            <p className="mb-10">
              Ứng dụng mua sắm trực tuyến và là sàn giao dịch thương mại điện
              tử!!
            </p>
            <Link href="/register">
              <a className="font-semibold hover:scale-110 hover:bg-white hover:text-amber-600 duration-300 transition shadow-md border-2 border-white rounded-full px-12 py-2 inline-block">
                Đăng ký
              </a>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default LoginScreen;
