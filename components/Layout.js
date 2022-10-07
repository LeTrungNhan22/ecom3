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
      <div className="flex min-h-screen flex-col justify-between ">
        <header className=" mb-32">
          <Navbar />
        </header>
        <main
          className="xl:container mx-auto w-full 
                         md:mt-0 relative px-2 sm:px-0 "
        >
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
