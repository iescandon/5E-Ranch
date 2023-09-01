import Link from "next/link";
import { useContext } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { hideMenu } from "@/contexts/notifications/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Menu({ isMenuOpen }) {
  const [state, dispatch] = useContext(NotificationsContext);

  return (
    <>
      <div
        className={`absolute ${
          isMenuOpen ? "top-0 left-0 visible" : "top-0 -left-[500px] invisible"
        } flex flex-col justify-between bg-white w-screen md:w-[500px] h-screen z-20 py-8 px-6 md:p-8`}
      >
        <div className="flex">
          <button className="" onClick={() => dispatch(hideMenu())}>
            <FontAwesomeIcon
              className="text-black text-lg lg:text-xl"
              icon={faXmark}
            />
          </button>
        </div>
      </div>
      <div
        className={`absolute h-screen w-screen inset-0 bg-black bg-opacity-70 z-10 visible ${
          !isMenuOpen && "invisible"
        }`}
      ></div>
    </>
  );
}
