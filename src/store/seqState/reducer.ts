const initialState = {
  soundSettings: {
    volume: -12,
    tempo: 135,
    delayAmount: 0,
    delayFeedback: 0.7,
    filtersAmount: [0, 8000],
  },
  seqPattern: {
    name: "RitmeNaam",
    color: "green",
    sound: "Loud",
    pattern: [
      [true, false, false, false, true, false, true, false],
      [true, false, true, false, false, false, false, false],
    ],
  },
  savedPatterns: [
    {
      name: "Sjohones",
      color: "red",
      sound: "Loud",
      pattern: [
        [false, false, false, false, true, false, false, false],
        [true, false, false, true, true, false, false, true],
      ],
    },
    {
      name: "Donkie",
      color: "orange",
      sound: "Electronic",
      pattern: [
        [false, false, true, false, false, false, true, false],
        [true, false, true, false, true, false, true, false],
      ],
    },
    {
      name: "TURKLE",
      color: "yellow",
      sound: "Percussion",
      pattern: [
        [false, false, true, false, false, false, true, false],
        [true, false, false, true, false, true, false, false],
      ],
    },
    {
      name: "EMPTY",
      color: "purple",
      sound: "Neo-Soul",
      pattern: [
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
      ],
    },
  ],
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case "PATTERNUPDATER": {
      return {
        ...state,
        seqPattern: {
          ...state.seqPattern,
          pattern: action.payload,
        },
      };
    }
    case "PATTERNUPDATESELECTOR": {
      return {
        ...state,
        seqPattern: action.payload,
      };
    }

    case "SELECTDRUMSOUND": {
      return {
        ...state,
        seqPattern: {
          ...state.seqPattern,
          sound: action.payload,
        },
      };
    }
    case "SETTEMPO": {
      return {
        ...state,
        soundSettings: {
          ...state.soundSettings,
          tempo: action.payload,
        },
      };
    }
    case "SETVOLUME": {
      return {
        ...state,
        soundSettings: {
          ...state.soundSettings,
          volume: action.payload,
        },
      };
    }
    case "SETFILTERS": {
      return {
        ...state,
        soundSettings: {
          ...state.soundSettings,
          filtersAmount: action.payload,
        },
      };
    }

    default:
      return state;
  }
}
