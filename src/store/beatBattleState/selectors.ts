import { RootState } from "../store";

export const getAllContestans = (state: RootState) =>
  state.beatState.contestants;

export const getAllContests = (state: RootState) => state.beatState.contests;
