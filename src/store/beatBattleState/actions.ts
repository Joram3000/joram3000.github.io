import { beatBattelaar, beatBattleActionTypes } from "./types";

export const puntErbij = (Payload: beatBattelaar) => ({
  type: beatBattleActionTypes.PUNTERBIJ,
  Payload: Payload,
});

export const puntEraf = (Payload: beatBattelaar) => ({
  type: beatBattleActionTypes.PUNTERAF,
  Payload: Payload,
});
