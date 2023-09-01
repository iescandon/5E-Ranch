import Head from "next/head";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { PopoverContext } from "@/contexts/popover";
import { hidePopover } from "@/contexts/popover/reducer";
import Popover from "./popover";

export const Layout = ({ children }) => {
  const [state, dispatch] = useContext(PopoverContext);
  const [isPopoverOpen, setIsPopoverOpen] = useState();

  useEffect(() => {
    setIsPopoverOpen(state.isPopoverOpen);
    // if (state.isPopoverOpen) {
    //   setTimeout(() => {
    //     setIsPopoverOpen(!state.isPopoverOpen);
    //     dispatch(hidePopover());
    //   }, 3500);
    // }
  }, [state]);

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
      </section>
    </>
  );
};

export default Layout;
