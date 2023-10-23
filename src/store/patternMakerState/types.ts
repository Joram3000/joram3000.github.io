export interface patternMakerState {
  currentPattern: sequencerPattern;
  soundSettings: {
    volume: number;
    tempo: number;
    delayAmount: number;
    delayFeedback: number;
    filtersAmount: [number, number];
  };
  savedPatterns: sequencerPattern[];
}

export interface sequencerPattern {
  name: string;
  color: string;
  sound?: string;
  pattern: boolean[][];
}

export enum patternMakerActionTypes {
  PATTERNUPDATER = "PATTERNUPDATER",
  PATTERNUPDATER2 = "PATTERNUPDATER2",
  PATTERNUPDATESELECTOR = "PATTERNUPDATESELECTOR",
  SELECTDRUMSOUND = "SELECTDRUMSOUND",
  SETTEMPO = "SETTEMPO",
  SETVOLUME = "SETVOLUME",
  SETFILTERS = "SETFILTERS",
}
