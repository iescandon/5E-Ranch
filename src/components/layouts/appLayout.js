import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { hidePopover, hideToast } from "@/contexts/notifications/reducer";
import Popover from "../notifications/popover";
import Menu from "../notifications/menu";
import Toast from "../notifications/toast";

export default function AppLayout({ children }) {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);
  const [popoverState, setPopoverState] = useState();
  const [menuState, setMenuState] = useState();
  const [toastState, setToastState] = useState();

  useEffect(() => {
    setPopoverState(notificationsState.popover);
    if (notificationsState.popover.isOpen) {
      setTimeout(() => {
        notificationsDispatch(hidePopover());
      }, 3500);
    }
  }, [notificationsState.popover]);

  useEffect(() => {
    setMenuState(notificationsState.menu);
  }, [notificationsState.menu]);

  useEffect(() => {
    setToastState(notificationsState.toast);
    if (notificationsState.toast.isOpen) {
      setTimeout(() => {
        notificationsDispatch(hideToast());
      }, 3500);
    }
  }, [notificationsState.toast]);

  return (
    <>
      <Head>
        <title>5E Ranch | Fines 100% Wagyu in Texas</title>
        <meta
          name="description"
          content="At 5E Ranch we are stewards for the greatest and healthiest red meat on the market today. In addition to the sale of beef, we also specialize in the sale of yearlings, heifers and steers."
        />
        <meta
          name="keywords"
          content="texas, beef, wagyu, steer, heiger, yearlings, 5e, ranch, mcallen, tx, texas"
        />
      </Head>
      <section className="relative">
        {popoverState && <Popover popover={popoverState} />}
        {menuState && <Menu menu={menuState} />}
        {toastState && <Toast toast={toastState} />}
        <div>{children}</div>
      </section>
    </>
  );
}
