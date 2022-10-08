import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import React, { useContext } from "react";
import { BsCartPlus, BsFillHeartFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
/*<-------------------------/------------------------->*/
import Layout from "../../components/Layout";
import { Store } from "../../utils/Store";
import { motion } from "framer-motion";
import db from "../../utils/db";
import Product from "../../models/Product";

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  if (!product) {
    return (
      <Layout title="Product not found">
        <div className="text-2xl text-red-500">Product not found!</div>
      </Layout>
    );
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    toast.success(() => (
      <span>
        {" "}
        Added product in your cart go to your{" "}
        <b className="font-bold text-amber-500">
          <Link href="/cart">
            <a>Cart</a>
          </Link>
        </b>
      </span>
    ));
  };

  return (
    <Layout title={product.name}>
      <div className="py-2 my-3">
        <Link href="/">
          <a className=" w-full shadow-md bg-amber-400 mb-5 p-2 rounded-md font-bold">
            Back{" "}
          </a>
        </Link>
      </div>
      <div className=" grid md:grid-cols-4 md:gap-3 sm:space-x-5 space-y-5 mx-3">
        <div className="md:col-span-2">
          <motion.div layoutId={product.slug} className="productSingle__image">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              layout={"responsive"}
              className="rounded-lg shadow-xl"
            ></Image>
          </motion.div>
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
                  <BsCartPlus className="text-black text-xl" />
                  <span className="text-black text-sm uppercase font-bold">
                    Add to cart
                  </span>
                </div>
              </button>
              <button className="button-icon w-full">
                <div className="flex space-x-4 items-center justify-center p-2">
                  <BsFillHeartFill className="text-black text-xl" />
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
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
