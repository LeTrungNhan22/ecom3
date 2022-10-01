import React from "react";

import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import data from "../utils/data";

const Home = () => {
  return (
    <>
      <Layout title="Home">
        <div
          className="grid grid-cols-1 gap-4 
                        md:grid-cols-3
                        lg:grid-cols-4"
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
