import { useEffect, useReducer, createContext } from "react";
import { reducer, initialState, setCurrentPage } from "./reducer";
import { menuBtns } from "@/types";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const path =
    (typeof window !== "undefined" && window.location.pathname) || null;

  useEffect(() => {
    menuBtns.forEach((btn) => {
      const path = window.location.pathname;
      if (path.includes(btn.url)) {
        dispatch(setCurrentPage(btn.label));
      }
    });
  }, [path]);

  return (
    <NotificationsContext.Provider value={[state, dispatch]}>
      {children}
    </NotificationsContext.Provider>
  );
};
