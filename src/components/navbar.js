import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../contexts/cart";
import { NotificationsContext } from "@/contexts/notifications";
import { showMenu, setCurrentPage } from "@/contexts/notifications/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHamburger } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ isBlack }) {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);
  const [cartState, cartDispatch] = useContext(CartContext);

  return (
    <div className="flex flex-row justify-center p-4 h-1/3 w-full">
      <div className="w-1/3 flex items-start py-4 px-2 md:p-4">
        <button
          id="hamburger-menu"
          className="hover:cursor-pointer"
          onClick={() => {
            notificationsDispatch(showMenu());
            setTimeout(() => {
              document
                .getElementById("close-menu")
                .focus({ focusVisible: true });
            }, [400]);
          }}
        >
          <FontAwesomeIcon
            className={`${
              isBlack ? "text-black" : "text-white"
            } text-lg lg:text-xl`}
            icon={faHamburger}
          />
        </button>
      </div>
      <div className="w-1/3 flex justify-center items-start">
        <Link
          href="/"
          onClick={() => {
            notificationsDispatch(setCurrentPage("home"));
          }}
        >
          {isBlack ? (
            <img
              src="/images/fullLogoBlack.svg"
              className="h-[80px] lg:h-[100px]"
              alt="5E Ranch logo in black"
            />
          ) : (
            <img
              src="/images/fullLogoWhite.svg"
              className="h-[80px] lg:h-[100px]"
              alt="5E Ranch logo in white"
            />
          )}
        </Link>
      </div>
      <div className="w-1/3 flex items-start justify-end py-4 px-2 md:p-4">
        <Link
          href="/cart"
          onClick={() => {
            notificationsDispatch(setCurrentPage("cart"));
          }}
          className="relative"
        >
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
