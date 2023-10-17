const initialState = {
  seqPattern: {
    name: "INIT DEPINIT",
    color: "orange",
    pattern: [
      [0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  seqPatternBool: {
    name: "Boolit deBoolit",
    color: "blue",
    pattern: [
      [false, false, false, false, true, false, false, false],
      [true, false, false, false, false, false, false, false],
    ],
  },
  Settings: {
    seqSoundSelected: "Loud",
    seqSettingsvol: -32,
  },

  // Transportstate: "",
};

export default function reducer(state = initialState, action) {
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

    // case "TRANSPORTUPDATER": {
    //   return {
    //     ...state,
    //     Transportstate: action.payload,
    //   };
    // }

    default:
      return state;
  }
}
