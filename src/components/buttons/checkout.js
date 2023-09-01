import { useContext } from "react";
import { PopoverContext } from "@/contexts/popover";
import { hidePopover } from "@/contexts/popover/reducer";

export default function CheckoutBtn({ cartItems, inPopover }) {
  const [state, dispatch] = useContext(PopoverContext);

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
    <button
      className={`w-full ${
        inPopover ? "md:w-full" : "md:w-max"
      } bg-black text-white p-4 uppercase`}
      type="submit"
      onClick={() => {
        handleCheckout();
        dispatch(hidePopover());
      }}
      role="link"
    >
      Checkout
    </button>
  );
}
