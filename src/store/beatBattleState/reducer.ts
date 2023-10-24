import { Reducer } from "redux";
import { role, beatBattleState } from "./types";

const mockBeatBattleState: beatBattleState = {
  contestants: [
    {
      name: "John Doe",
      role: role.regular,
    },
    {
      name: "Jane Doe",
      role: role.regular,
    },
    {
      name: "kardonkel",
      role: role.regular,
    },
    {
      name: "menno",
      role: role.regular,
    },
  ],
  contests: [],
};

const reducer: Reducer<beatBattleState> = (
  state = mockBeatBattleState,
  action
) => {
  const { type, payload } = action;
  // console.log(type, payload);
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
