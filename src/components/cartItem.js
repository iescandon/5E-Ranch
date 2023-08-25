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
import formatAmountForDisplay from "@/utils/stripeHelpers";

export default function CartItem({ item }) {
  const [state, dispatch] = useContext(CartContext);

  return (
    <div className="flex items-center h-32 md:h-40 w-full justify-between">
      <div className="flex items-center md:w-[55%]">
        <Link href={item.url} className="">
          <img src={item.img} className="h-20 w-20 object-cover" />
        </Link>
        <div className="pl-4 md:pl-12">{item.name}</div>
      </div>
      <div className="flex justify-end md:w-[20%]">
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
      <div className="md:w-[25%] flex justify-end items-center">
        <div className="pr-4 md:pr-12">
          {formatAmountForDisplay(item.price.unit_amount, item.price.currency)}
        </div>
        <button onClick={() => dispatch(removeFromCart({ id: item.id }))}>
          <FontAwesomeIcon
            className="text-black text-lg lg:text-xl"
            icon={faTrash}
          />
        </button>
      </div>
    </div>
  );
}
