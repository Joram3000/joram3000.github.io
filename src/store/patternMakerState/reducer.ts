import {
  patternMakerActionTypes,
  patternMakerState,
  soundStyle,
} from "./types";
import { Reducer } from "redux";

const initialState: patternMakerState = {
  currentPattern: {
    name: "BeatMaker",
    color: "green",
    sound: soundStyle.NEOSOUL,
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
      sound: soundStyle.ELECTRONIC,
      pattern: [
        [false, false, false, false, true, false, false, false],
        [true, false, false, true, true, false, false, true],
      ],
    },
    {
      name: "Donkie",
      color: "orange",
      sound: soundStyle.ELECTRONIC,
      pattern: [
        [false, false, true, false, false, false, true, false],
        [true, false, true, false, true, false, true, false],
      ],
    },
    {
      name: "JOE",
      color: "yellow",
      sound: soundStyle.PERCUSSION,
      pattern: [
        [false, false, true, false, false, false, true, false],
        [true, false, false, true, false, true, false, false],
      ],
    },
    {
      name: "EMPTY",
      color: "purple",
      sound: soundStyle.NEOSOUL,
      pattern: [
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
      ],
    },
  ],
};

const reducer: Reducer<patternMakerState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case patternMakerActionTypes.PATTERNUPDATER: {
      const { rowNumber, rowIndex, trigger } = payload;
      const newPattern = state.currentPattern.pattern.map((row, i) => {
        if (i === rowNumber) {
          return row.map((cell, j) => {
            if (j === rowIndex) {
              return !trigger;
            }
            return cell;
          });
        }
        return row;
      });
      return {
        ...state,
        currentPattern: {
          ...state.currentPattern,
          pattern: newPattern,
        },
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
