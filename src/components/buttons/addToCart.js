import { useContext } from "react";
import { CartContext } from "@/contexts/cart";
import { addToCart } from "@/contexts/cart/reducer";
import { PopoverContext } from "@/contexts/popover";
import { showPopover } from "@/contexts/popover/reducer";

export default function AddToCartBtn({ data, slug, quantity }) {
  const [cartState, cartDispatch] = useContext(CartContext);
  const [popoverState, popoverDispatch] = useContext(PopoverContext);

  return (
    <button
      className="w-full bg-black text-white p-4 uppercase"
      onClick={() => {
        cartDispatch(
          addToCart({
            id: data.id,
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
        popoverDispatch(showPopover());
      }}
    >
      add to cart
    </button>
  );
}
