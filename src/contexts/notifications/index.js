import { useReducer, createContext } from "react";
import { reducer, initialState } from "./reducer";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NotificationsContext.Provider value={[state, dispatch]}>
      {children}
    </NotificationsContext.Provider>
  );
};
