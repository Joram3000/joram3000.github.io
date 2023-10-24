export interface beatBattleState {
  contestants: contestant[];
  contests: contest[];
}

export enum role {
  admin = "admin",
  regular = "regular",
}

export interface contestant {
  name: string;
  role: role;
}

export interface contest extends upvotable, canBeReactedTo {
  sample: sample;
  subMissionList: submission[];
  closingDate?: Date;
}

export interface sample
  extends upvotable,
    canBeReactedTo,
    hasDateAdded,
    hasUrl {
  name: string;
}

export interface submission
  extends upvotable,
    canBeReactedTo,
    hasUrl,
    hasDateAdded {
  name: string;
  contestant: contestant;
}

export interface reaction extends hasDateAdded {
  contents: string;
  contestant: contestant;
}

export interface upvotable {
  numberOfUpvotes: number;
}

export interface canBeReactedTo {
  reactions: reaction[];
}

export interface hasDateAdded {
  dateAdded: string;
}

export interface hasUrl {
  url: string;
}
