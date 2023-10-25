import { configureStore } from "@reduxjs/toolkit";

import beatReducer from "./beatBattleState/reducer";
import patternMakerState from "./patternMakerState/reducer";
import uiState from "./uiState/reducer";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    patternMakerState: patternMakerState,
    beatState: beatReducer,
    uiState: uiState,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
