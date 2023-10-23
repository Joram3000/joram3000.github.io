import { seqPattern, seqStateActionTypes } from "./types";

export const PatternUpdater = (Payload: boolean[][]) => ({
  type: seqStateActionTypes.PATTERNUPDATER,
  payload: Payload,
});

export const PatternUpdatewithSelect = (Payload: seqPattern) => ({
  type: seqStateActionTypes.PATTERNUPDATESELECTOR,
  payload: Payload,
});

export const SelectDrumSound = (Payload: string) => ({
  type: seqStateActionTypes.SELECTDRUMSOUND,
  payload: Payload,
});

export const SetTempo = (Payload: number) => ({
  type: seqStateActionTypes.SETTEMPO,
  payload: Payload,
});

export const SetVolume = (Payload: number) => ({
  type: seqStateActionTypes.SETVOLUME,
  payload: Payload,
});

export const SetFilters = (Payload: [number, number]) => ({
  type: seqStateActionTypes.SETFILTERS,
  payload: Payload,
});
