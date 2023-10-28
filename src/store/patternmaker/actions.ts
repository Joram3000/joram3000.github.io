import { PatternMakerActionTypes, SequencerPattern, SoundStyle } from "./types";

export const CurrentPatternUpdater = (Payload: {
  rowIndex: number;
  rowNumber: number;
  trigger: boolean;
}) => ({
  type: PatternMakerActionTypes.CURRENTPATTERNUPDATER,
  payload: Payload,
});

export const PatternUpdatewithSelect = (Payload: SequencerPattern) => ({
  type: PatternMakerActionTypes.PATTERNUPDATESELECTOR,
  payload: Payload,
});

export const SavePattern = (Payload: SequencerPattern) => ({
  type: PatternMakerActionTypes.SAVEPATTERN,
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
