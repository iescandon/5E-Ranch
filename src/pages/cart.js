import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart";
import Navbar from "@/components/navbar";
import CartItem from "@/components/cartItem";

export default function Cart() {
  const [state, dispatch] = useContext(CartContext);
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    setCartItems(state.items);
  }, [state]);

  const handleCheckout = async () => {
    const line_items = cartItems.map((item) => {
      return {
        price: item.priceId,
        quantity: item.quantity,
      };
    });
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      body: JSON.stringify({ line_items }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const session = await res.json();
    window.location.href = session.url;
  };

  return (
    <>
      <Navbar isBlack={true} />
      <div className="p-10">
        <h2 className="pb-1">Shopping cart</h2>
        {cartItems?.length === 0 ? (
          <p>You have nothing in your shopping cart.</p>
        ) : (
          <>
            {cartItems?.map((item) => {
              return <CartItem item={item} key={item.id} />;
            })}
            <button
              className="p-4 bg-black text-white uppercase"
              type="submit"
              onClick={handleCheckout}
              role="link"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
}
