import { useContext, useState, useEffect } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { CartContext } from "@/contexts/cart";
import { hidePopover } from "@/contexts/notifications/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import CheckoutBtn from "../buttons/checkout";
import { formatAmountForDisplay } from "@/utils/stripeHelpers";
import ViewCartBtn from "../buttons/viewCart";
import NotificationsLayout from "../layouts/notificationsLayout";

export default function Popover({ popover }) {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);
  const [cartState, cartDispatch] = useContext(CartContext);
  const [cartItems, setCartItems] = useState();
  const [lastItemAdded, setLastItemAdded] = useState();

  useEffect(() => {
    setCartItems(cartState.items);
    setLastItemAdded(cartState.lastItemAdded);
  }, [cartState]);

  return (
    <NotificationsLayout show={popover.isOpen}>
      <div
        className={`absolute top-0 right-0 md:top-16 md:right-8 flex flex-col justify-between bg-white w-screen h-[300px] md:w-[500px] md:h-[350px] z-20 p-6`}
      >
        {/* top row */}
        <div className="flex justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon
              className="text-green-600 text-lg lg:text-xl pr-2"
              icon={faCircleCheck}
            />
            <span className="font-bold">Added to Bag</span>
          </div>
          <button
            className=""
            onClick={() => notificationsDispatch(hidePopover())}
          >
            <FontAwesomeIcon
              className="text-black text-lg lg:text-xl"
              icon={faXmark}
            />
          </button>
        </div>
        {/* last item */}
        {lastItemAdded && lastItemAdded.price && (
          <div className="flex items-center">
            <div className="h-28 w-28 md:h-36 md:w-36">
              <img
                src={lastItemAdded.img}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pl-8 flex flex-col">
              <p className="text-lg font-bold">{lastItemAdded.name}</p>
              <p className="pb-[3px]">Quantity: {lastItemAdded.quantity}</p>
              <p>
                {formatAmountForDisplay(
                  lastItemAdded.price.unit_amount * lastItemAdded.quantity,
                  lastItemAdded.price.currency
                )}
              </p>
            </div>
          </div>
        )}
        {/* buttons */}
        <div className="flex justify-around space-x-6">
          <ViewCartBtn />
          <CheckoutBtn cartItems={cartItems} inPopover={true} />
        </div>
      </div>
    </NotificationsLayout>
  );
}
