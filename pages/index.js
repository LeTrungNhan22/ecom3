/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Banner from "../components/Banner";

import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import data from "../utils/data";
import { AnimatePresence, LayoutGroup } from "framer-motion";

const Home = () => {
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
            {data.products.map((product) => (
              <ProductItem product={product} key={product.slug} />
            ))}
          </div>
        </Layout>
      </LayoutGroup>
    </AnimatePresence>
  );
};

export default Home;
