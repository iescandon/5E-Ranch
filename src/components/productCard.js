import Link from "next/link";
import { useContext } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { setCurrentPage } from "@/contexts/notifications/reducer";
import { formatAmountForDisplay } from "@/utils/stripeHelpers";
import AddToCartBtn from "./buttons/addToCart";

export default function ProductCard({ data, slug }) {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);

  return (
    <div className="w-1/2 h-[50vw] md:w-full md:max-w-[350px] md:max-h-[350px] p-2 space-y-4">
      <Link
        href={`/products/${slug}/${data.id}`}
        onClick={() => {
          notificationsDispatch(setCurrentPage(slug));
        }}
      >
        <img src={data.images[0]} className="object-cover h-full w-full" />
      </Link>
      <div>
        <div className="flex justify-between items-center pb-1">
          <h2 className="text-lg md:text-2xl">{data.name}</h2>
          <p className="text-xs md:text-sm">
            {formatAmountForDisplay(
              data.price.unit_amount,
              data.price.currency
            )}
          </p>
        </div>
        <div className="">{data.description}</div>
      </div>
      <AddToCartBtn data={data} slug={slug} quantity={1} />
    </div>
  );
}
