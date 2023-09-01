import Layout from "@/components/layout";
import { CartProvider } from "../contexts/cart";
import { PopoverProvider } from "@/contexts/popover";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <PopoverProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PopoverProvider>
    </CartProvider>
  );
}
