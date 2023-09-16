import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Toast({ toast }) {
  return (
    <div className={toast.isOpen ? "visible" : "invisible"}>
      <p
        className={`flex flex-row items-center fixed z-50 rounded top-5 right-5 p-4 lg:py-6 bg-white bg-opacity-95 shadow-lg border-l-4 w-[200px] lg:w-[300px] text-black text-center ${
          toast.isError ? "border-red-600" : "border-green-600"
        }`}
      >
        {toast.isError ? (
          <FontAwesomeIcon className="text-red-600" icon={faCircleXmark} />
        ) : (
          <FontAwesomeIcon className="text-green-600" icon={faCircleCheck} />
        )}
        <span className="ml-4">{toast.msg}</span>
      </p>
    </div>
  );
}
