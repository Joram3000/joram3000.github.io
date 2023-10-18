import { initiaReduxState } from "./types";

export const SelectedPattern = (state: initiaReduxState) =>
  state.seqState.seqPattern;

export const StateVolume = (state: initiaReduxState) =>
  state.seqState.soundSettings;

export const SavedPatterns = (state: initiaReduxState) =>
  state.seqState.savedPatterns;
