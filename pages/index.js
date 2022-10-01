import React from "react";
import Banner from "../components/Banner";

import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import data from "../utils/data";

const Home = () => {
  return (
    <>
      <Layout title="Home">
        <Banner />
        <div
          className="grid grid-cols-1 gap-5
                      md:grid-cols-2
                      lg:grid-cols-4 "
        >
          {data.products.map((product) => (
            <ProductItem product={product} key={product.slug} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Home;
