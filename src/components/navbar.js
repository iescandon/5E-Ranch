import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../contexts/cart";
import { NotificationsContext } from "@/contexts/notifications";
import { showMenu } from "@/contexts/notifications/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ isBlack }) {
  const [cartState, cartDispatch] = useContext(CartContext);
  const [state, dispatch] = useContext(NotificationsContext);

  return (
    <div className="flex flex-row justify-center p-4 h-1/3 w-full">
      <div className="w-1/3 flex items-start py-4 px-2 md:p-4">
        <button
          className="hover:cursor-pointer"
          onClick={() => {
            dispatch(showMenu());
          }}
        >
          <FontAwesomeIcon
            className={`${
              isBlack ? "text-black" : "text-white"
            } text-lg lg:text-xl`}
            icon={faBars}
          />
        </button>
      </div>
      <div className="w-1/3 flex justify-center">
        <Link href="/">
          {isBlack ? (
            <img
              src="/images/fullLogoBlack.svg"
              alt=""
              className="h-[80px] lg:h-[100px]"
            />
          ) : (
            <img
              src="/images/fullLogoWhite.svg"
              alt=""
              className="h-[80px] lg:h-[100px]"
            />
          )}
        </Link>
      </div>
      <div className="w-1/3 flex items-start justify-end py-4 px-2 md:p-4">
        <Link href="/cart" className="relative">
          <FontAwesomeIcon
            className={`${
              isBlack ? "text-black" : "text-white"
            } text-lg lg:text-xl`}
            icon={faShoppingCart}
          />
          <div
            className={`absolute -top-1.5 -right-1.5 rounded-full bg-red-500 text-white h-[14px] w-[14px] text-[10px] font-semibold flex justify-center items-center ${
              cartState.totalQuantity ? "block" : "hidden"
            }`}
          >
            {cartState.totalQuantity}
          </div>
        </Link>
      </div>
    </div>
  );
}
