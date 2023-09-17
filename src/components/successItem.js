import { formatAmountForDisplay } from "@/utils/stripeHelpers";

export default function SuccessItem({ item }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="relative">
          <img
            src={item.img}
            className="h-20 w-20 md:h-24 md:w-24 object-cover"
            alt={item.name}
          />
          <div className="absolute -top-1.5 -right-1.5 rounded-full bg-black text-white h-[20px] w-[20px] text-[14px] font-semibold flex justify-center items-center">
            {item.quantity}
          </div>
        </div>
        <p className="pl-10">{item.name}</p>
      </div>
      <p>{formatAmountForDisplay(item.amount, item.currency)}</p>
    </div>
  );
}
