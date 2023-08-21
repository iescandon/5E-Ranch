let item;
let filteredItems;

export const initialState = {
  items: [],
  totalQuantity: 0,
  selectedItem: {},
}

export const reducer = (state, action) => {
    switch (action.type) {
      case "SAVE_STORED_CART":
        return {
          ...state,
          ...action.payload
        };
      case "SET_SELECTED_ITEM":
        return {
          ...state,
          selectedItem: action.payload,
        };
      case "ADD_ITEM": 
        return {
          ...state,
          items:[
            ...state.items,
            action.payload
          ],
          totalQuantity: state.totalQuantity + action.payload.quantity
        };
      case "INCREMENT_ITEM_QUANTITY":
        filteredItems = state.items?.filter((item) => item.id !== action.payload.id);
        item = state.items?.find((item) => item.id === action.payload.id);
        return {
          ...state,
          items:[
            ...filteredItems,
            {
              ...item,
              quantity: item.quantity + 1
            }
          ],
          totalQuantity: state.totalQuantity + 1
        };
      case "DECREMENT_ITEM_QUANTITY":
        filteredItems = state.items?.filter((item) => item.id !== action.payload.id);
        item = state.items?.find((item) => item.id === action.payload.id);
        return {
          ...state,
          items:[
            ...filteredItems,
            {
              ...item,
              quantity: item.quantity - 1
            }
          ],
          totalQuantity: state.totalQuantity - 1
        };
      case "REMOVE_ITEM":
        filteredItems = state.items?.filter((item) => item.id !== action.payload.id);
        item = state.items?.find((item) => item.id === action.payload.id);
        return {
          ...state,
          items:[
            ...filteredItems
          ],
          totalQuantity: state.totalQuantity - item.quantity
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

export const setSelectedItem = (payload) => ({
  type: "SET_SELECTED_ITEM",
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
