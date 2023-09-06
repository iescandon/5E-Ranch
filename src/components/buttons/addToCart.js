import { useContext } from "react";
import { CartContext } from "@/contexts/cart";
import { addToCart } from "@/contexts/cart/reducer";
import { NotificationsContext } from "@/contexts/notifications";
import { showPopover } from "@/contexts/notifications/reducer";

export default function AddToCartBtn({ data, slug, quantity }) {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);
  const [cartState, cartDispatch] = useContext(CartContext);

  return (
    <button
      className="w-full bg-black text-white p-4 uppercase"
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
