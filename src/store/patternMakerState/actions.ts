import { patternMakerActionTypes, sequencerPattern, soundStyle } from "./types";

export const PatternUpdater = (Payload: {
  rowIndex: number;
  rowNumber: number;
  trigger: boolean;
}) => ({
  type: patternMakerActionTypes.PATTERNUPDATER,
  payload: Payload,
});

export const PatternUpdatewithSelect = (Payload: sequencerPattern) => ({
  type: patternMakerActionTypes.PATTERNUPDATESELECTOR,
  payload: Payload,
});

export const SelectDrumSound = (Payload: soundStyle) => ({
  type: patternMakerActionTypes.SELECTDRUMSOUND,
  payload: Payload,
});

export const SetTempo = (Payload: number) => ({
  type: patternMakerActionTypes.SETTEMPO,
  payload: Payload,
});

export const SetVolume = (Payload: number) => ({
  type: patternMakerActionTypes.SETVOLUME,
  payload: Payload,
});

export const SetFilters = (Payload: [number, number]) => ({
  type: patternMakerActionTypes.SETFILTERS,
  payload: Payload,
});
