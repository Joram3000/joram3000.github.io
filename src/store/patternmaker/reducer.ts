import {
  PatternMakerActionTypes,
  PatternMakerState,
  SoundStyle,
} from "./types";
import { Reducer } from "redux";

const initialState: PatternMakerState = {
  currentPattern: {
    name: "Press",
    color: "green",
    sound: SoundStyle.LOUD,
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
      name: "Heavy",
      color: "red",
      sound: SoundStyle.LOUD,
      pattern: [
        [false, false, false, false, true, false, false, false],
        [true, false, false, true, true, false, false, true],
      ],
    },
    {
      name: "Chonkes",
      color: "orange",
      sound: SoundStyle.ELECTRONIC,
      pattern: [
        [false, false, true, false, false, false, true, false],
        [true, false, true, false, true, false, true, false],
      ],
    },
    {
      name: "Joe",
      color: "yellow",
      sound: SoundStyle.PERCUSSION,
      pattern: [
        [false, false, true, false, false, false, true, false],
        [true, false, false, true, false, true, false, false],
      ],
    },
    {
      name: "Funky",
      color: "blue",
      sound: SoundStyle.NEOSOUL,
      pattern: [
        [false, false, false, true, false, true, false, false],
        [true, true, false, false, true, false, true, false],
      ],
    },
  ],
};

const reducer: Reducer<PatternMakerState> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PatternMakerActionTypes.CURRENTPATTERNUPDATER: {
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

    case PatternMakerActionTypes.PATTERNUPDATESELECTOR: {
      return {
        ...state,
        currentPattern: payload,
      };
    }

    case PatternMakerActionTypes.SAVEPATTERN: {
      const savedPatterns = [...state.savedPatterns, payload];
      const currentPattern = payload;
      return {
        ...state,
        savedPatterns,
        currentPattern,
      };
    }

    case PatternMakerActionTypes.SELECTDRUMSOUND: {
      return {
        ...state,
        currentPattern: {
          ...state.currentPattern,
          sound: payload,
        },
      };
    }

    case PatternMakerActionTypes.SETTEMPO: {
      return {
        ...state,
        soundSettings: {
          ...state.soundSettings,
          tempo: payload,
        },
      };
    }

    case PatternMakerActionTypes.SETVOLUME: {
      return {
        ...state,
        soundSettings: {
          ...state.soundSettings,
          volume: payload,
        },
      };
    }

    case PatternMakerActionTypes.SETFILTERS: {
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
