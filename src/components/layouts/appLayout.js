import Head from "next/head";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { hidePopover, hideToast } from "@/contexts/notifications/reducer";
import Popover from "../popover";
import Menu from "../menu";

export default function AppLayout({ children }) {
  const [state, dispatch] = useContext(NotificationsContext);
  const [isPopoverOpen, setIsPopoverOpen] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState();
  const [isToastOpen, setIsToastOpen] = useState();

  useEffect(() => {
    setIsPopoverOpen(state.isPopoverOpen);
    if (state.isPopoverOpen) {
      setTimeout(() => {
        setIsPopoverOpen(!state.isPopoverOpen);
        dispatch(hidePopover());
      }, 3500);
    }
  }, [state.isPopoverOpen]);

  useEffect(() => {
    setIsMenuOpen(state.isMenuOpen);
  }, [state.isMenuOpen]);

  useEffect(() => {
    setIsToastOpen(state.isToastOpen);
    if (state.isToastOpen) {
      setTimeout(() => {
        setIsToastOpen(!state.isToastOpen);
        dispatch(hideToast());
      }, 3500);
    }
  }, [state.isToastOpen]);

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
