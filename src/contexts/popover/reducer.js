export const initialState = {
  isPopoverOpen: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_POPOVER":
      return {
        isPopoverOpen: true,
      };
    case "HIDE_POPOVER":
      return {
        isPopoverOpen: false,
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
