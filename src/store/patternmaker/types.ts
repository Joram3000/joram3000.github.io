export interface PatternMakerState {
  currentPattern: SequencerPattern;
  soundSettings: {
    volume: number;
    tempo: number;
    delayAmount: number;
    delayFeedback: number;
    filtersAmount: [number, number];
  };
  savedPatterns: SequencerPattern[];
}

export interface SequencerPattern {
  name: string;
  color: string;
  sound: SoundStyle;
  pattern: [boolean[], boolean[]];
}

export enum SoundStyle {
  LOUD = "Loud",
  ELECTRONIC = "Electronic",
  PERCUSSION = "Percussion",
  NEOSOUL = "Neo-Soul",
}

export enum PatternMakerActionTypes {
  CURRENTPATTERNUPDATER = "CURRENTPATTERNUPDATER",
  PATTERNUPDATESELECTOR = "PATTERNUPDATESELECTOR",
  SAVEPATTERN = "SAVEPATTERN",
  SELECTDRUMSOUND = "SELECTDRUMSOUND",
  SETTEMPO = "SETTEMPO",
  SETVOLUME = "SETVOLUME",
  SETFILTERS = "SETFILTERS",
}
