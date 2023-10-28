import { Reducer } from "redux";
import { role, BeatBattleState } from "./types";

const mockBeatBattleState: BeatBattleState = {
  beatMakers: [
    {
      name: "John Doe",
      role: role.regular,
    },
    {
      name: "Jane Doe",
      role: role.regular,
    },
    {
      name: "kardonkel",
      role: role.regular,
    },
    {
      name: "menno",
      role: role.regular,
    },
  ],
  contests: [
    {
      dateAdded: "01-02-03",
      sample: {
        dateAdded: "01-02-03",
        name: "Funky Drum Loop",
        url: "https://example.com/samples/funky-drum-loop.mp3",
        numberOfUpvotes: 10,
        reactions: [
          {
            dateAdded: "01-02-03",
            contents: "This is a great sample!",
            contestant: {
              name: "John Doe",
              role: role.regular,
            },
          },
        ],
      },
      beats: [
        {
          dateAdded: "01-02-03",
          name: "Te Gekke Beat",
          beatMaker: {
            name: "John Doe",
            role: role.regular,
          },
          url: "https://example.com/submissions/john-doe-beat-battle-1.mp3",
          numberOfUpvotes: 5,
          reactions: [
            {
              dateAdded: "01-02-03",
              contents: "This is a great beat!",
              contestant: {
                name: "Jane Doe",
                role: role.regular,
              },
            },
          ],
        },
        {
          dateAdded: "01-02-03",
          name: "Te Gekke Beat",
          beatMaker: {
            name: "DJ Scratch",
            role: role.regular,
          },
          url: "https://example.com/submissions/dj-scratch-beat-battle-1.mp3",
          numberOfUpvotes: 10,
          reactions: [
            {
              dateAdded: "01-02-03",
              contents: "This gdabeat is sick!",
              contestant: {
                name: "MC Hammer",
                role: role.regular,
              },
            },
          ],
        },

        {
          dateAdded: "01-02-03",
          name: "Te Gekke Beat",
          beatMaker: {
            name: "Jane Dofasdfge",
            role: role.regular,
          },
          url: "https://example.com/submissions/jane-doe-beat-battle-1.mp3",
          numberOfUpvotes: 3,
          reactions: [
            {
              dateAdded: "01-02-03",
              contents: "This badsfeat is fire!",
              contestant: {
                name: "John Doe",
                role: role.regular,
              },
            },
          ],
        },
      ],
      numberOfUpvotes: 5,
      reactions: [
        {
          dateAdded: "01-02-03",
          contents: "This is asdfa great beat!",
          contestant: {
            name: "Jane asdfDoe",
            role: role.regular,
          },
        },
      ],
    },
  ],
};

const reducer: Reducer<BeatBattleState> = (
  state = mockBeatBattleState
  // action
) => {
  // const { type, payload } = action;
  return state;
};

export default reducer;
