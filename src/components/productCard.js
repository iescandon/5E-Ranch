import { useContext } from "react";
import { CartContext } from "@/contexts/cart";
import { addToCart, setSelectedItem } from "@/contexts/cart/reducer";
import Link from "next/link";

export default function ProductCard({ card, data, slug }) {
  const [state, dispatch] = useContext(CartContext);

  return (
    <div className="flex flex-col space-y-3">
      <Link
        onClick={() => dispatch(setSelectedItem(card))}
        href={`/products/${slug}/${card.fields.title.toLowerCase()}`}
      >
        <div
          className="w-[300px] h-[300px] shadow-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${card.fields.file.url})` }}
        ></div>
      </Link>
      <div className="flex justify-between align-center">
            <h2 className="text-xl md:text-2xl font-bold">Bruce</h2>
            <h3 className="text-md md:text-lg uppercase">$100</h3>
      </div>
      <div className="">{card.fields.description}</div>
      <button
        className="bg-black text-white p-4 uppercase"
        onClick={() =>
          dispatch(
            addToCart({
              id: data.id,
              category: slug,
              name: data.name,
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
