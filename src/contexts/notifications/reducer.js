export const initialState = {
  currentPage: "",
  popover: {
    isOpen: false,
  },
  menu: {
    isOpen: false,
  },
  toast: {
    isOpen: false,
    isError: null,
    msg: null,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_POPOVER":
      return {
        ...state,
        popover: {
          ...state.popover,
          isOpen: true,
        },
      };
    case "HIDE_POPOVER":
      return {
        ...state,
        popover: {
          ...state.popover,
          isOpen: false,
        },
      };
    case "SHOW_MENU":
      return {
        ...state,
        menu: {
          ...state.menu,
          isOpen: true,
        },
      };
    case "HIDE_MENU":
      return {
        ...state,
        menu: {
          ...state.menu,
          isOpen: false,
        },
      };
    case "SHOW_TOAST":
      return {
        ...state,
        toast: {
          isOpen: true,
          ...action.payload,
        },
      };
    case "HIDE_TOAST":
      return {
        ...state,
        toast: {
          ...initialState.toast,
        },
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

export const showToast = (payload) => ({
  type: "SHOW_TOAST",
  payload,
});

export const hideToast = () => ({
  type: "HIDE_TOAST",
});

export const setCurrentPage = (payload) => ({
  type: "SET_CURRENT_PAGE",
  payload,
});
