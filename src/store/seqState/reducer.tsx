const initialState = {
  seqPattern: {
    name: "INIT DEPINIT",
    color: "orange",
    pattern: [
      [0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
    ],
  },

  Settings: {
    seqSoundSelected: "Loud",
    seqSettingsvol: -32,
  },

  Transportstate: "",
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

    case "Transportupdater": {
      return {
        ...state,
        Transportstate: action.payload,
      };
    }

    default:
      return state;
  }
}
