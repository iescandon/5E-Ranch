import { useContext, useEffect, useState } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { hideMenu } from "@/contexts/notifications/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import NotificationsLayout from "./layouts/notificationsLayout";

const menuBtns = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
  { label: "Beef", url: "/products/beef" },
  { label: "Cattle", url: "/products/cattle" },
  { label: "Merch", url: "/products/merch" },
  { label: "Cart", url: "/cart" },
];

export default function Menu({ isMenuOpen }) {
  const [state, dispatch] = useContext(NotificationsContext);
  const [selectedPage, setSelectedPage] = useState();

  const router = useRouter();

  useEffect(() => {
    menuBtns.forEach((btn) => {
      const path = window.location.pathname;
      if (path.includes(btn.url)) {
        setSelectedPage(btn.label);
      }
    });
  }, []);

  return (
    <NotificationsLayout show={isMenuOpen} notificationType={"menu"}>
      <div
        className={`absolute transition-transform ease-in-out delay-150 duration-300 -top-[500px] left-0 md:top-0 md:-left-[350px] ${
          isMenuOpen
            ? "translate-y-[500px] md:translate-y-0 md:translate-x-[350px]"
            : "-translate-y-[500px] md:-translate-y-0 md:-translate-x-[350px]"
        } flex flex-col bg-white w-screen md:w-[350px] h-screen z-20 py-8 px-6 md:p-8`}
      >
        <div className="flex">
          <button onClick={() => dispatch(hideMenu())}>
            <FontAwesomeIcon
              className="text-black text-lg lg:text-xl"
              icon={faXmark}
            />
          </button>
        </div>
        <div className="flex flex-col py-4">
          {menuBtns.map((btn) => {
            return (
              <button
                className={`text-lg font-bold text-left p-2 hover:bg-slate-100 ${
                  selectedPage === btn.label && "bg-slate-100"
                }`}
                key={btn.label}
                onClick={() => {
                  setSelectedPage(btn.label);
                  dispatch(hideMenu());
                  router.push(btn.url);
                }}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>
    </NotificationsLayout>
  );
}
