import { patternMakerActionTypes, patternMakerState } from "./types";
import { Reducer } from "redux";

const initialState: patternMakerState = {
  currentPattern: {
    name: "BeatMaker",
    color: "green",
    sound: "Loud",
    pattern: [
      [true, false, false, false, true, false, true, false],
      [true, false, true, false, false, false, false, false],
    ],
  },
  soundSettings: {
    volume: -12,
    tempo: 135,
    delayAmount: 0,
    delayFeedback: 0.7,
    filtersAmount: [0, 8000],
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

const reducer: Reducer<patternMakerState> = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(action);
  switch (type) {
    case patternMakerActionTypes.PATTERNUPDATER: {
      return {
        ...state,
        currentPattern: {
          ...state.currentPattern,
          pattern: payload,
        },
      };
    }
    case patternMakerActionTypes.PATTERNUPDATER2: {
      console.log(payload);
      return {
        ...state,
      };
    }
    case patternMakerActionTypes.PATTERNUPDATESELECTOR: {
      return {
        ...state,
        currentPattern: payload,
      };
    }
    case patternMakerActionTypes.SELECTDRUMSOUND: {
      return {
        ...state,
        currentPattern: {
          ...state.currentPattern,
          sound: payload,
        },
      };
    }
    case patternMakerActionTypes.SETTEMPO: {
      return {
        ...state,
        soundSettings: {
          ...state.soundSettings,
          tempo: payload,
        },
      };
    }
    case patternMakerActionTypes.SETVOLUME: {
      return {
        ...state,
        soundSettings: {
          ...state.soundSettings,
          volume: payload,
        },
      };
    }
    case patternMakerActionTypes.SETFILTERS: {
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
