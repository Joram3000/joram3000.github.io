import { RootState } from "../store";

export const selectedPatternSelector = (state: RootState) =>
  state.patternMakerState.currentPattern;
export const soundSettingsSelector = (state: RootState) =>
  state.patternMakerState.soundSettings;
export const savedPatternsSelector = (state: RootState) =>
  state.patternMakerState.savedPatterns;
