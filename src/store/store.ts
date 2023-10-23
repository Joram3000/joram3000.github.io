import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import seqState from "./patternMakerState/reducer";
import beatBattleState from "./beatBattleState/reducer";

export const rootReducer = combineReducers({
  patternMakerState: seqState,
  beatBattleState: beatBattleState,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default store;
