/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import ReactStars from "react-rating-stars-component";
import { BsFillHeartFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
const ProductItem = ({ product }) => {
  return (
    // <div className="card">
    //   <Link href={`/product/${product.slug}`}>
    //     <a>
    //       <img
    //         src={product.image}
    //         alt={product.name}
    //         className="rounded shadow"
    //       />
    //     </a>
    //   </Link>
    //   <div className="flex flex-col justify-center items-center p-5">
    //     <Link href={`/product/${product.slug}`}>
    //       <a>
    //         <h2 className="text-lg">{product.name}</h2>
    //       </a>
    //     </Link>
    //     <p className="mb-2">{product.brand}</p>
    //     <p>{product.price}</p>
    //     <button className="primary-button" type="button">
    //       Add to cart
    //     </button>
    //   </div>
    // </div>

    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover shadow-lg rounded-md"
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
          <Link href={`/product/${product.slug}`}>
            <a>{product.name}</a>
          </Link>
        </h2>
        <span className=" text-xs font-bold">{product.description}</span>
        <div>
          <span className=" text-2xl font-bold">${product.price}</span>
          <div
            className="flex items-center
                       gap-2 mt-1"
          >
            <span className="text-sm line-through opacity-50">$5.99</span>
            <span className="discount-percent">save 20%</span>
          </div>
        </div>
        <span className="flex items-center mt-1">
          <ReactStars size={20} value={product.rating} edit={false} />
          <span className="text-xs ml-2 text-gray-500 font-semibold">
            {product.numReviews} reviews
          </span>
        </span>
        {/* product action button */}
        <div className="mt-5 flex gap-2">
          <button className="button-primary">Add to cart</button>
          <button className="button-icon">
            <BsFillHeartFill className="opacity-50" />
          </button>
          <button className="button-icon">
            <AiFillEye className="opacity-50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
