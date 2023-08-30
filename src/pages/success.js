import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart";
import { clearCart } from "@/contexts/cart/reducer";
import Navbar from "@/components/navbar";
import { formatAmountForDisplay, formatTime } from "@/utils/stripeHelpers";
import {
  getSession,
  getInvoice,
  getCharge,
  getProduct,
} from "@/utils/getStripe";
import SuccessItem from "@/components/successItem";

export default function Success({ session }) {
  const [state, dispatch] = useContext(CartContext);
  const [coords, setCoords] = useState();
  const [orderInfo, setOrderInfo] = useState();

  useEffect(() => {
    dispatch(clearCart());
    if (session && session.id) {
      setOrderInfo(session);
      console.log(session);
      if (session.coords) {
        const coordsArray = session.coords.features[0].center;
        setCoords(`${coordsArray[0]},${coordsArray[1]}`);
      }
    }
  }, []);

  return (
    <>
      <Navbar isBlack={true} />
      <div className="flex px-10">
        <div className="flex flex-col lg:flex-row w-full">
          {orderInfo && orderInfo?.id && (
            <>
              <div className="w-full lg:w-[60%] pb-4 lg:pb-0 lg:pr-8">
                <h4>Order Successful</h4>
                <h2>
                  Thank you {orderInfo.customer_details.name.split(" ")[0]}!
                </h2>
                <p className="pt-4">
                  We have received your order. You will get an email
                  confirmation at{" "}
                  <span className="font-bold">
                    {orderInfo.customer_details.email}
                  </span>
                </p>
                <div className="flex flex-col">
                  {coords && (
                    <img
                      src={`https://api.mapbox.com/styles/v1/iescandon/clkn0f2yo009301ql1px22n78/static/pin-s+000(${coords})/${coords},16/1100x500?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                      className="w-full h-full object-cover pt-4 md:max-h-[300px] lg:max-h-[350px]"
                      // className="w-full h-full object-cover pt-4"
                      alt=""
                    ></img>
                  )}
                  <div className="flex flex-col md:flex-row pt-4">
                    <div className="flex space-x-12 md:space-x-20">
                      <div>
                        <p className="font-bold">Shipping address</p>
                        <p>{orderInfo.shipping_details.address.line1}</p>
                        <p>
                          {orderInfo.shipping_details.address.line2 &&
                            orderInfo.shipping_details.address.line2}
                        </p>
                        <p>
                          {orderInfo.shipping_details.address.city},{" "}
                          {orderInfo.shipping_details.address.state}
                        </p>
                        <p>{orderInfo.shipping_details.address.postal_code}</p>
                      </div>
                      <div>
                        <p className="font-bold">Billing address</p>
                        <p>{orderInfo.charge.billing_details.address.line1}</p>
                        <p>
                          {orderInfo.charge.billing_details.address.line2 &&
                            orderInfo.charge.billing_details.address.line2}
                        </p>
                        <p>
                          {orderInfo.charge.billing_details.address.city},{" "}
                          {orderInfo.charge.billing_details.address.state}
                        </p>
                        <p>
                          {orderInfo.charge.billing_details.address.postal_code}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 md:pt-0 md:pl-20">
                      {/* <p>Order number: {orderInfo.id}</p> */}
                      <p>
                        <span className="font-bold">Order date:</span>{" "}
                        {formatTime(orderInfo.created)}
                      </p>
                      {/* <p>
                        <span className="font-bold">Order total:</span>
                        {formatAmountForDisplay(
                          orderInfo.amount_total,
                          orderInfo.currency
                        )}
                      </p> */}
                      <p>
                        <span className="font-bold">Payment method:</span>{" "}
                        <span className="capitalize pr-1">
                          {orderInfo.charge.payment_method_details.card.brand}
                        </span>
                        <span>
                          ****{" "}
                          {orderInfo.charge.payment_method_details.card.last4}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col lg:w-[40%] border-t lg:border-t-0 lg:pl-8 lg:border-l py-5 space-y-6">
                <h2>Order details</h2>
                {orderInfo.line_items.data.map((item) => {
                  const itemData = {
                    img: item.price.product.images[0],
                    quantity: item.quantity,
                    name: item.price.product.name,
                    amount: item.amount_total,
                    currency: item.currency,
                  };
                  return <SuccessItem item={itemData} key={item.id} />;
                })}
                <div className="flex justify-between border-t py-4">
                  <h4>Total:</h4>
                  <h3 className="font-semibold">
                    {formatAmountForDisplay(
                      orderInfo.amount_total,
                      orderInfo.currency
                    )}
                  </h3>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let coords = {};
  let session = await getSession(query.session_id);
  let invoice = session.invoice && (await getInvoice(session.invoice));
  let charge = invoice.charge && (await getCharge(invoice.charge));
  if (session.shipping_details) {
    const address = Buffer.from(
      `${session.shipping_details.address.line1} ${session.shipping_details.address.postal_code}`,
      "utf-8"
    ).toString();
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
    const res = await fetch(url, {
      method: "GET",
    });
    coords = await res.json();
  }

  const { line_items } = session;

  const dataPromises = line_items.data.map(async (item) => {
    const product = await getProduct(item.price.product);
    if (product) {
      return {
        ...item,
        price: {
          ...item.price,
          product,
        },
      };
    }
  });

  const data = await Promise.all(dataPromises);

  session = {
    ...session,
    line_items: {
      data,
    },
    coords,
    charge,
  };

  return {
    props: { session },
  };
};
