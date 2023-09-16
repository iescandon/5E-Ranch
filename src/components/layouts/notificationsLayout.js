import { useContext } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { hideMenu, hidePopover } from "@/contexts/notifications/reducer";

export default function NotificationsLayout({
  show,
  notificationType,
  children,
}) {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);

  return (
    <section className={show ? "visible" : "invisible"}>
      {children}
      <div
        onClick={() => {
          if (notificationType === "menu") {
            notificationsDispatch(hideMenu());
          } else {
            notificationsDispatch(hidePopover());
          }
        }}
        className={`absolute h-screen w-screen inset-0 bg-black bg-opacity-70 ${
          notificationType === "menu" && "bg-opacity-80 backdrop-blur-sm"
        } z-10`}
      ></div>
    </section>
  );
}
