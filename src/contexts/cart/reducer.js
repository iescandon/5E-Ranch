let item;
let filteredItems;
let currentItems;

export const initialState = {
  items: [],
  totalQuantity: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE_STORED_CART":
      return {
        ...state,
        ...action.payload,
      };
    case "ADD_ITEM":
      item = state.items?.find((item) => item.id === action.payload.id);
      if (item) {
        const currentItems = state.items?.map((x) => {
          if (x.id === action.payload.id) {
            return {
              ...x,
              quantity: x.quantity + action.payload.quantity,
            };
          }
          return x;
        });
        return {
          ...state,
          items: currentItems,
          totalQuantity: state.totalQuantity + action.payload.quantity,
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        totalQuantity: state.totalQuantity + action.payload.quantity,
      };
    case "INCREMENT_ITEM_QUANTITY":
      currentItems = state.items?.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return {
        ...state,
        items: currentItems,
        totalQuantity: state.totalQuantity + 1,
      };
    case "DECREMENT_ITEM_QUANTITY":
      currentItems = state.items?.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      return {
        ...state,
        items: currentItems,
        totalQuantity: state.totalQuantity - 1,
      };
    case "REMOVE_ITEM":
      filteredItems = state.items?.filter(
        (item) => item.id !== action.payload.id
      );
      item = state.items?.find((item) => item.id === action.payload.id);
      return {
        ...state,
        items: [...filteredItems],
        totalQuantity: state.totalQuantity - item.quantity,
      };
    case "CLEAR_CART":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const saveStoredCart = (payload) => ({
  type: "SAVE_STORED_CART",
  payload,
});

export const addToCart = (payload) => ({
  type: "ADD_ITEM",
  payload,
});

export const incrementItem = (payload) => ({
  type: "INCREMENT_ITEM_QUANTITY",
  payload,
});

export const decrementItem = (payload) => ({
  type: "DECREMENT_ITEM_QUANTITY",
  payload,
});

export const removeFromCart = (payload) => ({
  type: "REMOVE_ITEM",
  payload,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});
