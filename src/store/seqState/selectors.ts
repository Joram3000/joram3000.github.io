import { initiaReduxState } from "./types";

// export const selectSeqPattern = (state) => state.seqState.seqPattern;
export const stateSeqPattern = (state: initiaReduxState) =>
  state.seqState.seqPattern;

export const stateVolume = (state: initiaReduxState) =>
  state.seqState.soundSettings;
