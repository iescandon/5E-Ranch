import { useContext } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { setCurrentPage } from "@/contexts/notifications/reducer";
import Link from "next/link";

export default function Card({ category, img, buttonText }) {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);

  return (
    <div
      className="w-[300px] h-[350px] rounded-lg shadow-lg m-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="flex flex-col h-full justify-end p-8">
        <h4 className="text-xl font-bold pt-2 text-white pb-2 drop-shadow-md capitalize">
          {category}
        </h4>
        <Link
          href={`/products/${category.toLowerCase()}`}
          className="w-full border-white border-2 text-white p-3 drop-shadow-md bg-black bg-opacity-30 uppercase text-center"
          onClick={() => {
            notificationsDispatch(setCurrentPage(category.toLowerCase()));
          }}
        >
          {buttonText ? buttonText : "Shop now"}
        </Link>
      </div>
    </div>
  );
}
