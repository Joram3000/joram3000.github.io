export const PatternUpdater = (Payload: boolean[][]) => ({
  type: "PATTERNUPDATER",
  payload: Payload,
});

export const SelectDrumSound = (Payload: string) => ({
  type: "SELECTDRUMSOUND",
  payload: Payload,
});

export const SetTempo = (Payload: number) => ({
  type: "SETTEMPO",
  payload: Payload,
});

export const SetVolume = (Payload: number) => ({
  type: "SETVOLUME",
  payload: Payload,
});
