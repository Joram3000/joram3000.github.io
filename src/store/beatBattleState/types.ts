export interface beatBattleState {
  deelnemerLijst: beatBattelaar[];
}

export interface beatBattelaar {
  name: string;
  beat: string;
  punten: number;
}

export enum beatBattleActionTypes {
  PUNTERBIJ = "PUNTERBIJ",
  PUNTERAF = "PUNTERAF",
}
