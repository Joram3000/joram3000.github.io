import { RootState } from "../store";

export const getUIStateSelector = (state: RootState) => state.uiState;
