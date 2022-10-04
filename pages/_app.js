import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Toaster position="top-center" reverseOrder={true} />
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
