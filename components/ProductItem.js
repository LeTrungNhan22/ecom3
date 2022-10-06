/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useContext } from "react";
import ReactStars from "react-rating-stars-component";
import { BsFillHeartFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import { pageZoom, pageTransition } from "../utils/util";

import toast from "react-hot-toast";
import { Store } from "../utils/Store";
const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(Store);

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
    toast.success(() => (
      <span>
        Đã thêm <span className="text-cyan-500 font-bold">{product.name} </span>{" "}
        vào
        <b className="font-bold text-amber-500">
          <Link href="/cart">
            <a> Giỏ hàng</a>
          </Link>
        </b>
      </span>
    ));
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageZoom}
      transition={pageTransition}
      layout
      className="product"
    >
      <div className="card hover:scale-105">
        <Link href={`/product/${product.slug}`}>
          <a>
            <motion.div layoutId={product.slug} className="product__image">
              <img
                loading="lazy"
                src={product.image}
                alt={product.name}
                className="w-full max-h-fit object-cover object-center shadow-md hover:shadow-lg"
              />
            </motion.div>
          </a>
        </Link>
        <div className="p-5 flex-col gap-4 space-y-2">
          {/* badge */}
          <div className="flex items-center  gap-2">
            <span className="badge">{product.brand}</span>
          </div>
          <h2 className="product-title" title={product.name}>
            {product.name}
          </h2>
          <span className=" text-xs font-bold">{product.description}</span>
          <div>
            <span className=" text-2xl font-bold">${product.price}</span>
            <div
              className="flex items-center
                       gap-2 mt-1"
            >
              <span className="text-sm line-through opacity-50">
                ${product.price * 0.2 + product.price}
              </span>
              <span className="discount-percent">save 20%</span>
            </div>
          </div>
          <span className="flex items-center mt-1">
            <ReactStars
              size={20}
              isHalf={true}
              value={product.rating}
              edit={false}
            />
            <span className="text-xs ml-2 text-gray-500 font-semibold">
              {product.numReviews} reviews
            </span>
          </span>
          {/* product action button */}
          <div className="mt-5 flex gap-2">
            <button
              onClick={addToCartHandler}
              className="button-primary text-black uppercase text-sm font-semibold"
            >
              Add to cart
            </button>
            <button className="button-icon">
              <BsFillHeartFill className="opacity-50" />
            </button>
            <button className="button-icon">
              <Link href={`/product/${product.slug}`}>
                <a>
                  <AiFillEye className="opacity-50 duration-[0]" />
                </a>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductItem;
