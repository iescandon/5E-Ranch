import { useReducer, createContext } from "react";
import { reducer, initialState } from "./reducer";

export const PopoverContext = createContext();

export const PopoverProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PopoverContext.Provider value={[state, dispatch]}>
      {children}
    </PopoverContext.Provider>
  );
};
