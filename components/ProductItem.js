/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import ReactStars from "react-rating-stars-component";
import { BsFillHeartFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
const ProductItem = ({ product }) => {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover object-center shadow-md hover:shadow-lg"
          />
        </a>
      </Link>
      <div className="p-5 flex-col gap-3">
        {/* badge */}
        <div className="flex items-center gap-2">
          <span className="badge">{product.brand}</span>
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
          <button className="button-primary text-black uppercase text-sm font-semibold">
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
  );
};

export default ProductItem;
