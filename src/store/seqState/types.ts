export interface InitialState {
  seqPattern: seqPattern;
  seqPatternBool: seqPatternBool;
  Settings: {
    seqSoundSelected: string;
    seqSettingsvol: number;
  };
  // Transportstate: string;
}

export interface seqPattern {
  name: string;
  color: string;
  pattern: number[][];
}

export interface seqPatternBool {
  name: string;
  color: string;
  pattern: boolean[][];
}
