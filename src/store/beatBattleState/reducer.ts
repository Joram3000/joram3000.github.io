import { Reducer } from "redux";
import { beatBattleActionTypes, beatBattleState } from "./types";

const initialState: beatBattleState = {
  deelnemerLijst: [
    {
      name: "donkes",
      beat: "dinges",
      punten: 20,
    },
    {
      name: "kadaver",
      beat: "koe",
      punten: 20,
    },
    {
      name: "pimpes",
      beat: "ksdge",
      punten: 10,
    },
  ],
};
const reducer: Reducer<beatBattleState> = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case beatBattleActionTypes.PUNTERBIJ: {
      console.log(payload);
      return {
        ...state,
      };
    }
    case beatBattleActionTypes.PUNTERAF: {
      console.log(payload);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
