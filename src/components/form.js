import { useState, useContext } from "react";
import { NotificationsContext } from "@/contexts/notifications";
import { showToast } from "@/contexts/notifications/reducer";
import axios from "axios";

export default function Form({ content }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationsState, notificationsDispatch] =
    useContext(NotificationsContext);

  const handleServerResponse = (isError, msg, form) => {
    setIsSubmitting(false);
    notificationsDispatch(showToast({ isError, msg }));
    if (!isError) {
      form.reset();
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setIsSubmitting(true);
    axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_FORMSPREE_URL,
      data: new FormData(form),
    })
      .then((r) => {
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
          {content.contactButtonText ? content.contactButtonText : "Submit"}
        </button>
      </div>
    </form>
  );
}
