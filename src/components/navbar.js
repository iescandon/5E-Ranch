import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../contexts/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHamburger, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ isBlack }) {
    const [ state, dispatch ] = useContext(CartContext)

    return (
        <div className="flex flex-row justify-center p-4 h-1/3 w-full">
            <div className="w-1/3 flex items-start py-4 px-2 md:p-4">
            <button className="hover:cursor-pointer" onClick={() => { 
                    alert("clicked!")
                }}>
                    <FontAwesomeIcon
                    className={`${isBlack ? "text-black" : "text-white"} text-lg lg:text-xl`}
                    icon={faBars}
                    />
                </button>
            </div>
            <div className="w-1/3 flex justify-center">
                <Link href="/">
                    {isBlack ? 
                    <img src="/images/fullLogoBlack.svg"  alt="" className="h-[80px] lg:h-[100px]"/>
                    :
                    <img src="/images/fullLogoWhite.svg"  alt="" className="h-[80px] lg:h-[100px]"/>
                    }
                </Link>
            </div>
            <div className="w-1/3 flex items-start justify-end py-4 px-2 md:p-4">
                <Link href="/cart" className="relative">
                    <FontAwesomeIcon
                    className={`${isBlack ? "text-black" : "text-white"} text-lg lg:text-xl`}
                    icon={faShoppingCart}
                    />
                <div className={`absolute -top-1 -right-1 rounded-full bg-red-500 text-white h-3 w-3 text-[9px] font-semibold flex justify-center items-center ${state.totalQuantity ? "block" : "hidden"}`}>{state.totalQuantity}</div>
                </Link>
            </div>
        </div>
    )
}
