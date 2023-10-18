export interface initiaReduxState {
  seqState: {
    soundSettings: {
      volume: number;
      tempo: number;
      delayAmount: number;
      delayFeedback: number;
      filterAmount: number;
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
