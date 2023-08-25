import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart";
import Navbar from "@/components/navbar";
import CartItem from "@/components/cartItem";
import formatAmountForDisplay from "@/utils/stripeHelpers";

export default function Cart() {
  const [state, dispatch] = useContext(CartContext);
  const [cartItems, setCartItems] = useState();
  const [cartTotal, setCartTotal] = useState();

  useEffect(() => {
    setCartItems(state.items);
    if (state.items.length > 0) {
      let total = 0;
      state.items.forEach((item) => {
        total = total + item.price.unit_amount * item.quantity;
      });
      console.log(total);
      const formattedTotal = formatAmountForDisplay(
        total,
        state.items[0].price.currency
      );
      setCartTotal(formattedTotal);
    }
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
      <div className="p-6 md:p-10">
        <h2 className="pb-1">Shopping cart</h2>
        {cartItems?.length === 0 ? (
          <p>You have nothing in your shopping cart.</p>
        ) : (
          <>
            {cartItems?.map((item) => {
              return <CartItem item={item} key={item.id} />;
            })}
            <div className="flex flex-col items-end border-t">
              <div className="flex items-center my-8">
                <h4 className="pr-12">Subtotal</h4>
                <h3 className="font-semibold">{cartTotal}</h3>
              </div>
              <button
                className="p-4 bg-black text-white uppercase"
                type="submit"
                onClick={handleCheckout}
                role="link"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
