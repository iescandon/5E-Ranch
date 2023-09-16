import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { hideMenu, setCurrentPage } from "@/contexts/notifications/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import NotificationsLayout from "./layouts/notificationsLayout";
// FIXME: Pull this from stripe maybe
import { menuBtns } from "@/types";

export default function Menu({ menu }) {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);
  const [selectedTab, setSelectedTab] = useState();

  useEffect(() => {
    setSelectedTab(notificationsState.currentPage);
  }, [notificationsState.currentPage]);

  return (
    <NotificationsLayout show={menu.isOpen} notificationType={"menu"}>
      <div
        className={`absolute transition-transform ease-in-out delay-150 duration-300 -top-[500px] left-0 md:top-0 md:-left-[350px] ${
          menu.isOpen
            ? "translate-y-[500px] md:translate-y-0 md:translate-x-[350px]"
            : "-translate-y-[500px] md:-translate-y-0 md:-translate-x-[350px]"
        } flex flex-col bg-white w-screen md:w-[350px] h-screen z-20 py-8 px-6 md:p-8`}
      >
        <div className="flex">
          <button onClick={() => notificationsDispatch(hideMenu())}>
            <FontAwesomeIcon
              className="text-black text-lg lg:text-xl"
              icon={faXmark}
            />
          </button>
        </div>
        <div className="flex flex-col py-4">
          {menuBtns.map((btn) => {
            return (
              <Link
                href={btn.url}
                className={`text-lg font-bold text-left p-2 hover:bg-slate-100 capitalize ${
                  selectedTab === btn.label && "bg-slate-100"
                }`}
                key={btn.label}
                onClick={() => {
                  setSelectedTab(btn.label);
                  notificationsDispatch(setCurrentPage(btn.label));
                  notificationsDispatch(hideMenu());
                }}
              >
                {btn.label}
              </Link>
            );
          })}
        </div>
      </div>
    </NotificationsLayout>
  );
}
