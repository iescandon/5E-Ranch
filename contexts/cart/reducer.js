let item;
let filteredItems;

export const initialState = {
  items: [],
  totalQuantity: 0,
}

export const reducer = (state, action) => {
    switch (action.type) {
      case "SAVE_STORED_CART":
        return {
          ...action.payload
        };
      case "ADD_ITEM": 
        return {
          items:[
            ...state.items,
            action.payload
          ],
          totalQuantity: state.totalQuantity++
        };
      case "INCREMENT_ITEM_QUANTITY":
        filteredItems = state.items?.filter((item) => item.id !== action.payload.id);
        item = state.items?.find((item) => item.id === action.payload.id);
        return {
          items:[
            ...filteredItems,
            {
              ...item,
              quantity: item.quantity++
            }
          ],
          totalQuantity: state.totalQuantity++
        };
      case "DECREMENT_ITEM_QUANTITY":
        filteredItems = state.items?.filter((item) => item.id !== action.payload.id);
        item = state.items?.find((item) => item.id === action.payload.id);
        return {
          items:[
            ...filteredItems,
            {
              ...item,
              quantity: item.quantity--
            }
          ],
          totalQuantity: state.totalQuantity--
        };
      case "REMOVE_ITEM":
        filteredItems = state.items?.filter((item) => item.id !== action.payload.id);
        return {
          items:[
            ...filteredItems
          ],
          totalQuantity: state.totalQuantity--
        };
      case "CLEAR_CART":
        return {
          ...initialState
        }
      default:
        return state
    }
  }

export const saveStoredCart = (payload) => ({
  type: "SAVE_STORED_CART",
  payload
});

export const addToCart = (payload) => ({
  type: "ADD_ITEM",
  payload
});

export const incrementItem = (payload) => ({
  type: "INCREMENT_ITEM_QUANTITY",
  payload
});

export const decrementItem = (payload) => ({
  type: "DECREMENT_ITEM_QUANTITY",
  payload
});

export const removeFromCart = (payload) => ({
  type: "REMOVE_ITEM",
  payload
});

export const clearCart = () => ({
  type: "CLEAR_CART"
});
