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
    <div className="flex items-center h-28 md:h-40 w-full justify-between border-b">
      <div className="flex items-center w-1/3 md:w-[55%]">
        <Link href={item.url} className="">
          <img
            src={item.img}
            className="h-20 w-20 md:h-28 md:w-28 object-cover"
          />
        </Link>
        <div className="hidden md:block pl-4 md:pl-12">{item.name}</div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-end w-1/3 md:w-[20%]">
        <div className="md:hidden pb-2">{item.name}</div>
        <div className="border w-max">
          <button
            className="p-2 md:p-4"
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
            className="p-2 md:p-4"
            onClick={() => dispatch(incrementItem({ id: item.id }))}
          >
            +
          </button>
        </div>
      </div>
      <div className="w-1/3 md:w-[25%] flex justify-end items-center">
        <div className="pr-4 md:pr-12">
          {formatAmountForDisplay(
            item.price.unit_amount * item.quantity,
            item.price.currency
          )}
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
