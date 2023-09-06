import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../contexts/cart";
import Navbar from "@/components/navbar";
import CartItem from "@/components/cartItem";
import { formatAmountForDisplay } from "@/utils/stripeHelpers";
import { getSession, expireSession } from "@/utils/getStripe";
import CheckoutBtn from "@/components/buttons/checkout";

export default function Cart() {
  const [cartState, cartDispatch] = useContext(CartContext);
  const [cartItems, setCartItems] = useState();
  const [cartTotal, setCartTotal] = useState();

  const router = useRouter();

  useEffect(() => {
    router.replace("/cart", undefined, { shallow: true });
  }, []);

  useEffect(() => {
    setCartItems(cartState.items);
    if (cartState.items.length > 0) {
      let total = 0;
      cartState.items.forEach((item) => {
        total = total + item.price.unit_amount * item.quantity;
      });
      const formattedTotal = formatAmountForDisplay(
        total,
        cartState.items[0].price.currency
      );
      setCartTotal(formattedTotal);
    }
  }, [cartState]);

  return (
    <>
      <Navbar isBlack={true} />
      <div className="px-6 md:px-10">
        <h2 className="pb-1">Shopping cart</h2>
        {cartItems?.length === 0 ? (
          <p>You have nothing in your shopping cart.</p>
        ) : (
          <>
            {cartItems?.map((item) => {
              return <CartItem item={item} key={item.id} />;
            })}
            <div className="flex flex-col md:items-end">
              <div className="flex items-center my-8 justify-between md:justify-normal">
                <h4 className="pr-12">Subtotal</h4>
                <h3 className="font-semibold">{cartTotal}</h3>
              </div>
              <CheckoutBtn cartItems={cartItems} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  if (query.session_id) {
    const session = await getSession(query.session_id);
    if (session.status === "open") {
      await expireSession(query.session_id);
    }
  }

  return {
    props: {},
  };
};
