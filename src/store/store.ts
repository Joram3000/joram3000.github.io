import { configureStore } from "@reduxjs/toolkit";
import beatReducer from "./beatBattleState/reducer";
import patternMakerState from "./patternMakerState/reducer";

export const store = configureStore({
  reducer: {
    beatState: beatReducer,
    patternMakerState: patternMakerState,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
