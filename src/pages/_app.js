import Layout from "@/components/layout";
import { CartProvider } from "../contexts/cart";
import { NotificationsProvider } from "@/contexts/notifications";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <NotificationsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationsProvider>
    </CartProvider>
  );
}
