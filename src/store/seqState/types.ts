export interface initiaReduxState {
  seqState: {
    soundSettings: {
      volume: number;
      tempo: number;
      delayAmount: number;
      delayFeedback: number;
      filtersAmount: [number, number];
    };
    seqPattern: seqPattern;
    savedPatterns: seqPattern[];
  };
}

export interface seqPattern {
  name: string;
  color: string;
  sound?: string;
  pattern: boolean[][];
}
