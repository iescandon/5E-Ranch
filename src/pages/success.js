import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart";
import { clearCart } from "@/contexts/cart/reducer";
import Navbar from "@/components/navbar";
import { formatAmountForDisplay, formatTime } from "@/utils/stripeHelpers";
import { getSession } from "@/utils/getStripe";

export default function Success({ session }) {
  const [state, dispatch] = useContext(CartContext);
  const [coords, setCoords] = useState();
  const [orderInfo, setOrderInfo] = useState();

  useEffect(() => {
    dispatch(clearCart());
    if (session && session.id) {
      setOrderInfo(session);
      if (session.coords) {
        const coordsArray = session.coords.features[0].center;
        setCoords(`${coordsArray[0]},${coordsArray[1]}`);
      }
    }
  }, []);

  return (
    <>
      <Navbar isBlack={true} />
      <div className="flex flex-col p-10">
        {orderInfo && orderInfo?.id && (
          <>
            <h4>Order Successful</h4>
            <h2>Thank you {orderInfo.customer_details.name.split(" ")[0]}!</h2>
            <p className="pt-3">
              We have received your order. You will get an email confirmation at{" "}
              <span className="font-bold">
                {orderInfo.customer_details.email}
              </span>
            </p>
            <div className="flex flex-col">
              {coords && (
                <img
                  src={`https://api.mapbox.com/styles/v1/iescandon/clkn0f2yo009301ql1px22n78/static/pin-s+000(${coords})/${coords},16/1100x500?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                  className="w-full h-full object-cover pt-4 md:max-h-[300px]"
                  alt=""
                ></img>
              )}
              <div className="w-full pt-4 flex">
                <div>
                  <p className="font-bold">Shipping Address</p>
                  <p>{orderInfo.customer_details.address.line1}</p>
                  <p>
                    {orderInfo.customer_details.address.city},{" "}
                    {orderInfo.customer_details.address.state}
                  </p>
                  <p>{orderInfo.customer_details.address.postal_code}</p>
                </div>
                <div className="pl-12 md:pl-20">
                  {/* <p>Order number: {orderInfo.id}</p> */}
                  <p>
                    <span className="font-bold">Order date:</span>{" "}
                    {formatTime(orderInfo.created)}
                  </p>
                  <p>
                    <span className="font-bold">Order total:</span>
                    {formatAmountForDisplay(
                      orderInfo.amount_total,
                      orderInfo.currency
                    )}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  let session = {};
  let coords = {};

  if (query.session_id) {
    session = await getSession(query.session_id);
    // FIXME: Change to shipping details when there is info
    const address = Buffer.from(
      session.customer_details.address.line1,
      "utf-8"
    ).toString();
    if (address) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
      const res = await fetch(url, {
        method: "GET",
      });
      coords = await res.json();
    }
  }

  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session: { ...session, coords } },
  };
};
