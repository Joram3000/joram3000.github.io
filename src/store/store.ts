import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import seqState from "./seqState/reducer";

const rootReducer = combineReducers({ seqState });

const store = configureStore({ reducer: rootReducer });

export default store;
