import { initialReduxState, seqStateActionTypes } from "./types";
import { Reducer } from "redux";

const initialState: initialReduxState = {
  soundSettings: {
    volume: -12,
    tempo: 135,
    delayAmount: 0,
    delayFeedback: 0.7,
    filtersAmount: [0, 8000],
  },

  seqPattern: {
    name: "BeatMaker",
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
      name: "JOE",
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

const reducer: Reducer<initialReduxState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case seqStateActionTypes.PATTERNUPDATER: {
      return {
        ...state,
        seqPattern: {
          ...state.seqPattern,
          pattern: payload,
        },
      };
    }
    case seqStateActionTypes.PATTERNUPDATESELECTOR: {
      return {
        ...state,
        seqPattern: payload,
      };
    }

    case seqStateActionTypes.SELECTDRUMSOUND: {
      return {
        ...state,
        seqPattern: {
          ...state.seqPattern,
          sound: payload,
        },
      };
    }
    case seqStateActionTypes.SETTEMPO: {
      return {
        ...state,
        soundSettings: {
          ...state.soundSettings,
          tempo: payload,
        },
      };
    }
    case seqStateActionTypes.SETVOLUME: {
      return {
        ...state,
        soundSettings: {
          ...state.soundSettings,
          volume: payload,
        },
      };
    }
    case seqStateActionTypes.SETFILTERS: {
      return {
        ...state,
        soundSettings: {
          ...state.soundSettings,
          filtersAmount: payload,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
