import { Reducer } from "redux";

const initialState = {
  menuOpen: true,
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
    default:
      return state;
  }
};

export default reducer;
