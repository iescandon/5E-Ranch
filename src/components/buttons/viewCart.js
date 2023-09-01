import { useContext } from "react";
import { PopoverContext } from "@/contexts/popover";
import { hidePopover } from "@/contexts/popover/reducer";
import { useRouter } from "next/navigation";

export default function ViewCartBtn() {
  const [state, dispatch] = useContext(PopoverContext);

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
