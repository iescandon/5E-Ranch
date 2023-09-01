import { useContext } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { hidePopover } from "@/contexts/notifications/reducer";
import { useRouter } from "next/navigation";

export default function ViewCartBtn() {
  const [state, dispatch] = useContext(NotificationsContext);

  const router = useRouter();

  return (
    <button
      className="w-full bg-white border p-4 uppercase"
      onClick={() => {
        dispatch(hidePopover());
        setTimeout(() => {
          router.push("/cart");
        }, 500);
      }}
    >
      view cart
    </button>
  );
}
