import { useContext } from "react";
import { CartContext } from "../contexts/cart";
import {
  incrementItem,
  decrementItem,
  removeFromCart,
} from "@/contexts/cart/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function CartItem({ item }) {
  const [state, dispatch] = useContext(CartContext);

  return (
    <div className="flex space-x-10 items-center h-40 border-gray-300">
      <Link href={item.url}>
        <img src={item.img} className="h-20 w-20 object-cover" />
      </Link>
      <div>{item.name}</div>
      <div>
        <div className="w-full">
          <div className="border w-max">
            <button
              className="p-4"
              onClick={() => {
                if (item.quantity !== 1) {
                  dispatch(decrementItem({ id: item.id }));
                }
              }}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="p-4"
              onClick={() => dispatch(incrementItem({ id: item.id }))}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <button
        className=""
        onClick={() => dispatch(removeFromCart({ id: item.id }))}
      >
        <FontAwesomeIcon
          className="text-black text-lg lg:text-xl"
          icon={faTrash}
        />
      </button>
    </div>
  );
}
