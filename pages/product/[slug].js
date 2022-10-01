import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { BsCartPlus, BsFillHeartFill } from "react-icons/bs";
import { toast } from "react-hot-toast";

import Layout from "../../components/Layout";
import data from "../../utils/data";
import { Store } from "../../utils/Store";

const ProductScreen = () => {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    toast.success("Added product in your cart");
  };

  return (
    <Layout title={product.name}>
      <div className="py-2 mt-28 my-3">
        <Link href="/">
          <a className=" w-full shadow-md bg-amber-400 mb-5 p-2 rounded-md font-bold">
            Back{" "}
          </a>
        </Link>
      </div>
      <div className=" grid md:grid-cols-4 md:gap-3 sm:space-x-5 space-y-5 mx-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            layout={"responsive"}
            className="rounded-lg shadow-xl"
          ></Image>
        </div>
        <div className="md:col-span-2">
          <ul className="space-y-3">
            <li>
              <h1 className="text-4xl font-bold">{product.name}</h1>
            </li>
            <li className="text-lg font-semibold">
              Category: {product.category}
            </li>
            <li className="text-lg font-semibold">
              Brand: <span className="badge">{product.brand}</span>
            </li>
            <li className="text-lg font-semibold">
              Rating: {product.rating} ⭐ of {product.numReviews} reviews
            </li>
            <li className="text-lg font-semibold">
              Description: {product.description}
            </li>
          </ul>
          <div className="border mx-auto bg-gray-700 w-[90%] border-gray-700 my-10" />
          <div className="my-3">
            <div className="flex space-x-3">
              <button
                className="button-primary w-full"
                onClick={addToCartHandler}
              >
                <div className="flex space-x-4 items-center justify-center p-2">
                  <BsCartPlus />
                  <span className="text-black text-sm uppercase font-bold">
                    Add to cart
                  </span>
                </div>
              </button>
              <button className="button-icon w-full">
                <div className="flex space-x-4 items-center justify-center p-2">
                  <BsFillHeartFill />
                  <span className="text-black text-sm uppercase font-bold">
                    Add to wishlist
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* action */}
      </div>
    </Layout>
  );
};

export default ProductScreen;
