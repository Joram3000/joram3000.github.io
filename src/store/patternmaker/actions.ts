import {  PatternMakerActionTypes, SequencerPattern, SoundStyle } from "./types";

export const PatternUpdater = (Payload: {
  rowIndex: number;
  rowNumber: number;
  trigger: boolean;
}) => ({
  type: PatternMakerActionTypes.PATTERNUPDATER,
  payload: Payload,
});

export const PatternUpdatewithSelect = (Payload: SequencerPattern) => ({
  type: PatternMakerActionTypes.PATTERNUPDATESELECTOR,
  payload: Payload,
});

export const SelectDrumSound = (Payload: SoundStyle) => ({
  type: PatternMakerActionTypes.SELECTDRUMSOUND,
  payload: Payload,
});

export const SetTempo = (Payload: number) => ({
  type: PatternMakerActionTypes.SETTEMPO,
  payload: Payload,
});

export const SetVolume = (Payload: number) => ({
  type: PatternMakerActionTypes.SETVOLUME,
  payload: Payload,
});

export const SetFilters = (Payload: [number, number]) => ({
  type: PatternMakerActionTypes.SETFILTERS,
  payload: Payload,
});
