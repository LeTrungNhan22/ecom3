/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
/*<-------------------------/------------------------->*/
import Banner from "../components/Banner";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
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
    <AnimatePresence mode="wait">
      <LayoutGroup>
        <Layout title="Home">
          <Banner />
          <div
            className="grid grid-cols-2 gap-4
                       md:grid-cols-3
                      xl:grid-cols-4 "
          >
            {products.map((product) => (
              <ProductItem
                addToCartHandler={addToCartHandler}
                product={product}
                key={product.slug}
              />
            ))}
          </div>
        </Layout>
      </LayoutGroup>
    </AnimatePresence>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
