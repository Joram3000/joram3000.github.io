export interface BeatBattleState {
  beatMakers: beatMaker[];
  contests: contest[];
}

export enum role {
  admin = "admin",
  regular = "regular",
}

export interface beatMaker {
  name: string;
  role: role;
}

export interface contest extends upvotable, canBeReactedTo, hasDateAdded {
  sample: sample;
  beats: beat[];
  closingDate?: Date;
}

export interface sample
  extends upvotable,
    canBeReactedTo,
    hasUrl,
    hasDateAdded {
  name: string;
}

export interface beat extends upvotable, canBeReactedTo, hasUrl, hasDateAdded {
  name: string;
  beatMaker: beatMaker;
}

export interface reaction extends hasDateAdded {
  contents: string;
  contestant: beatMaker;
}

//TRAITS
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
