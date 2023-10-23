import { RootState } from "../store";

export const getAllContestans = (state: RootState) =>
  state.beatBattleState.contestants;

export const getAllContests = (state: RootState) =>
  state.beatBattleState.contests;
