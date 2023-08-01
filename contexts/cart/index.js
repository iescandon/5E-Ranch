import { useEffect, useReducer, createContext } from "react"
import { reducer, initialState, saveStoredCart } from "./reducer"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const cartFromLocalStorage =
  (typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("cart"))) ||
  null;

  useEffect(() => {
    if (cartFromLocalStorage && cartFromLocalStorage.quantity !== 0) {
      dispatch(saveStoredCart(cartFromLocalStorage))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state))
  }, [state])


  return (
    <CartContext.Provider value={[ state, dispatch ]}>
      { children }
    </CartContext.Provider>
  )
}

