"use client";
import { CartProvider } from "../contexts/cart";
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {

  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}
