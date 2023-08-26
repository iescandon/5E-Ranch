import getContent from "@/utils/getContent";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart";
import { clearCart } from "@/contexts/cart/reducer";
import Navbar from "@/components/navbar";

export default function Success() {
  const [state, dispatch] = useContext(CartContext);

  useEffect(() => {
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
