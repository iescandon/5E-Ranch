import getContent from "@/utils/getContent";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart";
import { clearCart } from "@/contexts/cart/reducer";
import Navbar from "@/components/navbar";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default function Success({ session }) {
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

export const getServerSideProps = async ({ query }) => {
  const session = await stripe.checkout.sessions.retrieve(query.session_id);

  return {
    props: { session },
  };
};
