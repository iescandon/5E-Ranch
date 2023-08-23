import { useContext } from "react";
import { CartContext } from "@/contexts/cart";
import { addToCart } from "@/contexts/cart/reducer";
import Link from "next/link";

export default function ProductCard({ data, slug }) {
  const [state, dispatch] = useContext(CartContext);

  return (
    <div className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] space-y-4">
      <Link href={`/products/${slug}/${data.id}`}>
        <img src={data.images[0]} className="object-cover h-full w-full" />
      </Link>
      <div>
        <div className="flex justify-between align-center pb-1">
          <h2 className="text-xl md:text-2xl">{data.name}</h2>
          <h3>${data.price.unit_amount / 100}</h3>
        </div>
        <div className="">{data.metadata.short_description}</div>
      </div>
      <button
        className="bg-black text-white p-4 w-full uppercase"
        onClick={() =>
          dispatch(
            addToCart({
              id: data.id,
              url: `/products/${slug}/${data.id}`,
              name: data.name,
              price: `$${data.price.unit_amount / 100}`,
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
