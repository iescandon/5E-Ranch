import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHamburger, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ content}) {
    return (
        <div className="flex flex-row justify-center p-4 h-1/3 w-full">
            <div className="w-1/3 flex items-start p-4">
            <button className="hover:cursor-pointer" onClick={() => { 
                    alert("clicked!")
                }}>
                    <FontAwesomeIcon
                    className="text-white text-lg lg:text-xl"
                    icon={faHamburger}
                    />
                </button>
            </div>
            <div className="w-1/3 flex justify-center">
                <img src={content.heroIcon.fields.file.url}  alt="" className="h-[80px] lg:h-[100px]"/>
            </div>
            <div className="w-1/3 flex items-start justify-end p-4">
                <button className="hover:cursor-pointer" onClick={() => { 
                    alert("clicked!")
                }}>
                    <FontAwesomeIcon
                    className="text-white text-lg lg:text-xl"
                    icon={faShoppingCart}
                    />
                </button>
            </div>
        </div>
    )
}
