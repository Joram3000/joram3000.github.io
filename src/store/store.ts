import { configureStore } from "@reduxjs/toolkit";
import beatReducer from "./beatbattle/reducer";
import patternMakerState from "./patternmaker/reducer";
import uiState from "./ui/reducer";

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
