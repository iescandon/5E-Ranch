import getContent from "@/utils/getContent";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart";
import { clearCart } from "@/contexts/cart/reducer";
import Navbar from "@/components/navbar";

export default function Success() {
  const [state, dispatch] = useContext(CartContext);

  // FIXME: Fix this so it clears local storage and state
  useEffect(() => {
    localStorage.removeItem("cart");
    dispatch(clearCart());
  }, []);

  return (
    <>
      <Navbar isBlack={true} />
      <div className="flex flex-col items-center">
        <p>Thank you for your order!</p>
      </div>
    </>
  );
}
