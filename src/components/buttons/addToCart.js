import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/contexts/cart";
import { addToCart } from "@/contexts/cart/reducer";
import { NotificationsContext } from "@/contexts/notifications";
import { showPopover } from "@/contexts/notifications/reducer";

export default function AddToCartBtn({ data, slug, quantity }) {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);
  const [cartState, cartDispatch] = useContext(CartContext);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (data.price.unit_amount === 0) {
      setIsDisabled(true);
    }
  }, [data]);

  return (
    <button
      className={`w-full p-4 uppercase ${
        isDisabled ? "bg-slate-700 text-slate-400" : "bg-black text-white"
      }`}
      disabled={isDisabled}
      onClick={() => {
        cartDispatch(
          addToCart({
            id: data.id,
            category: slug,
            url: `/products/${slug}/${data.id}`,
            name: data.name,
            price: {
              unit_amount: data.price.unit_amount,
              currency: data.price.currency,
            },
            priceId: data.default_price,
            img: data.images[0],
            quantity,
          })
        );
        notificationsDispatch(showPopover());
      }}
    >
      add to cart
    </button>
  );
}
