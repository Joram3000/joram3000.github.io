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
    seqSettingsdel: 0,
    seqSettingsfilter: 20000,
    seqSettingsDelfeedback: 0.7,
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

    case "PATTERNUPDATESELECTOR": {
      return {
        ...state,
        seqPattern: action.payload,
      };
    }

    // SAVE COMPONENT ACTIONS
    case "Patterncolorsetter": {
      return {
        ...state,
        seqPattern: {
          ...state.seqPattern,
          color: action.payload,
        },
      };
    }
    case "Patternnamesetter": {
      return {
        ...state,
        seqPattern: {
          ...state.seqPattern,
          name: action.payload,
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
