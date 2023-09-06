import Head from "next/head";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { hidePopover, hideToast } from "@/contexts/notifications/reducer";
import Popover from "../popover";
import Menu from "../menu";

export default function AppLayout({ children }) {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);
  const [isPopoverOpen, setIsPopoverOpen] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState();
  const [isToastOpen, setIsToastOpen] = useState();

  useEffect(() => {
    setIsPopoverOpen(notificationsState.isPopoverOpen);
    if (notificationsState.isPopoverOpen) {
      setTimeout(() => {
        setIsPopoverOpen(!notificationsState.isPopoverOpen);
        notificationsDispatch(hidePopover());
      }, 3500);
    }
  }, [notificationsState.isPopoverOpen]);

  useEffect(() => {
    setIsMenuOpen(notificationsState.isMenuOpen);
  }, [notificationsState.isMenuOpen]);

  useEffect(() => {
    setIsToastOpen(notificationsState.isToastOpen);
    if (notificationsState.isToastOpen) {
      setTimeout(() => {
        setIsToastOpen(!notificationsState.isToastOpen);
        notificationsDispatch(hideToast());
      }, 3500);
    }
  }, [notificationsState.isToastOpen]);

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
        <div>{children}</div>
        <Popover isPopoverOpen={isPopoverOpen} />
        <Menu isMenuOpen={isMenuOpen} />
        {/* TODO: add toast here */}
      </section>
    </>
  );
}
