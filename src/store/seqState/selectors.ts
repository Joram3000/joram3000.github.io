import { initialReduxState } from "./types";

export const SelectedPattern = (state: initialReduxState) =>
  state.seqState.seqPattern;
export const StateVolume = (state: initialReduxState) =>
  state.seqState.soundSettings;
export const SavedPatterns = (state: initialReduxState) =>
  state.seqState.savedPatterns;

export const seqStaterr = (state: initialReduxState) => state;
