import { useContext } from "react";
import { CartContext } from "@/contexts/cart";
import { addToCart } from "@/contexts/cart/reducer";
import Link from "next/link";
import { formatAmountForDisplay } from "@/utils/stripeHelpers";

export default function ProductCard({ data, slug }) {
  const [state, dispatch] = useContext(CartContext);

  return (
    <div className="w-1/2 h-[50vw] md:w-full md:max-w-[350px] md:max-h-[350px] p-2 space-y-4">
      <Link href={`/products/${slug}/${data.id}`}>
        <img src={data.images[0]} className="object-cover h-full w-full" />
      </Link>
      <div>
        <div className="flex justify-between items-center pb-1">
          <h2 className="text-lg md:text-2xl">{data.name}</h2>
          <p className="text-xs md:text-sm">
            {formatAmountForDisplay(
              data.price.unit_amount,
              data.price.currency
            )}
          </p>
        </div>
        <div className="">{data.description}</div>
      </div>
      <button
        className="bg-black text-white p-4 w-full uppercase"
        onClick={() =>
          dispatch(
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
              quantity: 1,
            })
          )
        }
      >
        add to cart
      </button>
    </div>
  );
}
