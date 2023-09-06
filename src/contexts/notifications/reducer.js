export const initialState = {
  isPopoverOpen: false,
  isMenuOpen: false,
  currentPage: "",
  isToastOpen: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_POPOVER":
      return {
        ...state,
        isPopoverOpen: true,
      };
    case "HIDE_POPOVER":
      return {
        ...state,
        isPopoverOpen: false,
      };
    case "SHOW_MENU":
      return {
        ...state,
        isMenuOpen: true,
      };
    case "HIDE_MENU":
      return {
        ...state,
        isMenuOpen: false,
      };
    case "SHOW_TOAST":
      return {
        ...state,
        isToastOpen: true,
      };
    case "HIDE_TOAST":
      return {
        ...state,
        isToastOpen: false,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export const showPopover = () => ({
  type: "SHOW_POPOVER",
});

export const hidePopover = () => ({
  type: "HIDE_POPOVER",
});

export const showMenu = () => ({
  type: "SHOW_MENU",
});

export const hideMenu = () => ({
  type: "HIDE_MENU",
});
export const showToast = () => ({
  type: "SHOW_TOAST",
});

export const hideToast = () => ({
  type: "HIDE_TOAST",
});

export const setCurrentPage = (payload) => ({
  type: "SET_CURRENT_PAGE",
  payload,
});
