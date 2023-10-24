import { RootState } from "../store";
// @ts-ignore
export const getAllContestans = (state: RootState) =>
  // @ts-ignore
  state.beatState.contestants;

// @ts-ignore
export const getAllContests = (state: RootState) => state.beatState.contests;
