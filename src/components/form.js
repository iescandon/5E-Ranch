import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Form({ content }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastState, setToastState] = useState({
    isError: null,
    msg: null,
  });

  const handleServerResponse = (isError, msg, form) => {
    setIsSubmitting(false);
    setToastState({ isError, msg });
    if (!isError) {
      form.reset();
    }
    setTimeout(() => {
      setToastState({
        isError: null,
        msg: null,
      });
    }, 3000);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setIsSubmitting(true);
    axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_FORMSPREE_URL,
      data: new FormData(form),
    })
      .then((r) => {
        console.log(r);
        handleServerResponse(false, "Submission successful!", form);
      })
      .catch((r) => {
        handleServerResponse(true, r.response.data.error);
      });
  };

  return (
    <form
      className="h-full w-full flex flex-col justify-center"
      onSubmit={handleOnSubmit}
    >
      <h4>{content.contactSubtitle ? content.contactSubtitle : undefined}</h4>
      <h2 className="pb-4">{content.contactTitle}</h2>
      <p className="pb-6">{content.contactText.content[0].content[0].value}</p>
      <div className="flex flex-col">
        <input
          className="p-2 border border-slate-300 rounded"
          id="name"
          type="name"
          name="name"
          placeholder="your name"
          required
        />
        <input
          className="mt-2 md:mt-4 p-2 border border-slate-300 rounded"
          id="email"
          type="email"
          name="email"
          placeholder="your e-mail"
          required
        />
        <textarea
          className="mt-2 md:mt-4 p-2 border border-slate-300 rounded resize-none"
          id="message"
          name="message"
          placeholder="your message"
        ></textarea>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-black text-white p-3 mt-2 md:mt-4 uppercase"
          disabled={isSubmitting}
        >
          {content.contactButtonText ? content.contactButtonText : "Send it"}
        </button>
      </div>
      {toastState.msg && (
        <p
          className={`flex flex-row items-center fixed z-50 rounded top-5 right-5 p-4 lg:py-6 bg-white bg-opacity-95 shadow-lg border-l-4 w-[200px] lg:w-[300px] text-black text-center ${
            toastState.isError ? "border-red-600" : "border-green-600"
          }`}
        >
          {toastState.isError ? (
            <FontAwesomeIcon className="text-red-600" icon={faCircleXmark} />
          ) : (
            <FontAwesomeIcon className="text-green-600" icon={faCircleCheck} />
          )}
          <span className="ml-4">{toastState.msg}</span>
        </p>
      )}
    </form>
  );
}
