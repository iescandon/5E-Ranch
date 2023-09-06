import { useContext } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { hidePopover, setCurrentPage } from "@/contexts/notifications/reducer";
import { useRouter } from "next/navigation";

export default function ViewCartBtn() {
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);

  const router = useRouter();

  return (
    <button
      className="w-full bg-white border p-4 uppercase"
      onClick={() => {
        notificationsDispatch(hidePopover());
        notificationsDispatch(setCurrentPage("cart"));
        setTimeout(() => {
          router.push("/cart");
        }, 500);
      }}
    >
      view cart
    </button>
  );
}
