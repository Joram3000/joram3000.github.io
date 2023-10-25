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
  sound: soundStyle;
  pattern: [boolean[], boolean[]];
}

export enum soundStyle {
  LOUD = "Loud",
  ELECTRONIC = "Electronic",
  PERCUSSION = "Percussion",
  NEOSOUL = "Neo-Soul",
}

export enum patternMakerActionTypes {
  PATTERNUPDATER = "PATTERNUPDATER",
  PATTERNUPDATESELECTOR = "PATTERNUPDATESELECTOR",
  SELECTDRUMSOUND = "SELECTDRUMSOUND",
  SETTEMPO = "SETTEMPO",
  SETVOLUME = "SETVOLUME",
  SETFILTERS = "SETFILTERS",
}
