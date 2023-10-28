import { Reducer } from "redux";

const initialState = {
  menuOpen: true,
  asideOpen: false,
  drawerOpen: false,
};

const reducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "MENUTOGGLE": {
      return {
        ...state,
        menuOpen: payload,
      };
    }
    case "DRAWERTOGGLE": {
      return {
        ...state,
        drawerOpen: payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
