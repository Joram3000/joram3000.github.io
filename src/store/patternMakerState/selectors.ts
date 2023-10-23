import { RootState } from "../store";

export const SelectedPattern = (state: RootState) =>
  state.patternMakerState.currentPattern;
export const SoundSettings = (state: RootState) =>
  state.patternMakerState.soundSettings;
export const SavedPatterns = (state: RootState) =>
  state.patternMakerState.savedPatterns;
