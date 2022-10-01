import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - Amazon clone" : "Amazon clone"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon " href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <Navbar />
        <main className="container m-auto mt-4 px-4 max-h-screen">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
