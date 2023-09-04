import AppLayout from "@/components/layouts/appLayout";
import { CartProvider } from "../contexts/cart";
import { NotificationsProvider } from "@/contexts/notifications";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <NotificationsProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </NotificationsProvider>
    </CartProvider>
  );
}
