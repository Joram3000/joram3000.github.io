import { Reducer } from "redux";

const initialState = {
  menuOpen: true,
  asideOpen: false,
  drawerOpen: false,
  isDrawer: false,
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
    case "ISDRAWER": {
      return {
        ...state,
        isDrawer: payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
