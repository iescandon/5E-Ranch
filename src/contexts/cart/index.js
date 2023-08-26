import { useEffect, useReducer, createContext } from "react";
import { reducer, initialState, saveStoredCart } from "./reducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const cartFromStorage =
    (typeof window !== "undefined" &&
      JSON.parse(sessionStorage.getItem("cart"))) ||
    null;

  useEffect(() => {
    if (cartFromStorage && cartFromStorage.quantity !== 0) {
      if (window.location.href == `${window.location.origin}/success`) {
        sessionStorage.removeItem("cart");
      } else {
        dispatch(saveStoredCart(cartFromStorage));
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};
