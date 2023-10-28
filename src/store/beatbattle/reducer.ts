import { Reducer } from "redux";
import { role, BeatBattleState, sample, contest } from "./types";
import { lorem } from "../../helpers/helpers";

const beatMaker1 = {
  name: "Max",
  role: role.regular,
};
const beatMaker2 = {
  name: "Thayna",
  role: role.regular,
};

const reaction1 = {
  dateAdded: "01-02-03",
  contents: lorem.generateWords(7),
  beatMaker: beatMaker1,
};

const reaction2 = {
  dateAdded: "01-02-03",
  contents: lorem.generateSentences(2),
  beatMaker: beatMaker2,
};

const reaction3 = {
  dateAdded: "01-02-03",
  contents: lorem.generateWords(7),
  beatMaker: beatMaker2,
};

const reactions = [reaction1, reaction2, reaction3];

const sample1 = {
  dateAdded: "01-02-03",
  name: "Horn Sample",
  url: "https://example.com/samples/funky-drum-loop.mp3",
  numberOfUpvotes: 10,
  reactions: reactions,
};

const sample2 = {
  dateAdded: "01-02-03",
  name: "Other Sample",
  url: "https://example.com/samples/funky-drum-loop.mp3",
  numberOfUpvotes: 10,
  reactions: reactions,
};

function makeContest(sample: sample): contest {
  return {
    dateAdded: "01-02-03",
    sample: sample,
    beats: [
      {
        dateAdded: "01-02-03",
        name: "Lampertamper",
        beatMaker: {
          name: "Menno",
          role: role.admin,
        },
        url: "https://example.com/submissions/john-doe-beat-battle-1.mp3",
        numberOfUpvotes: 5,
        reactions: [
          {
            dateAdded: "01-02-03",
            contents: "This is a 🧨 beat!",
            beatMaker: {
              name: "mr Lova Lova",
              role: role.regular,
            },
          },
        ],
      },
      {
        dateAdded: "01-02-03",
        name: "FireBeat",
        beatMaker: {
          name: "Menno",
          role: role.admin,
        },
        url: "https://example.com/submissions/dj-scratch-beat-battle-1.mp3",
        numberOfUpvotes: 10,
        reactions: reactions,
      },
      {
        dateAdded: "01-02-03",
        name: "Te Gekke Beat",
        beatMaker: {
          name: "Bandito",
          role: role.regular,
        },
        url: "https://example.com/submissions/jane-doe-beat-battle-1.mp3",
        numberOfUpvotes: 3,
        reactions: reactions,
      },
    ],
    numberOfUpvotes: 5,
    reactions: [
      {
        dateAdded: "01-02-03",
        contents: "🔥🔥🔥🔥!",
        beatMaker: {
          name: "Max",
          role: role.regular,
        },
      },
    ],
  };
}

const mockBeatBattleState: BeatBattleState = {
  beatMakers: [
    beatMaker1,
    beatMaker2,
    {
      name: "Max",
      role: role.regular,
    },
    {
      name: "Thayna",
      role: role.regular,
    },
    {
      name: "Madlib",
      role: role.regular,
    },
  ],
  contests: [makeContest(sample1), makeContest(sample2)],
};

const reducer: Reducer<BeatBattleState> = (
  state = mockBeatBattleState
  // action
) => {
  // const { type, payload } = action;
  return state;
};

export default reducer;
