import { Reducer } from "redux";
import { role, beatBattleState } from "./types";

const mockBeatBattleState: beatBattleState = {
  contestants: [
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
      sample: {
        name: "Funky Drum Loop",
        url: "https://example.com/samples/funky-drum-loop.mp3",
        numberOfUpvotes: 10,
        reactions: [
          {
            contents: "This is a great sample!",
            contestant: {
              name: "John Doe",
              role: role.regular,
            },
            dateAdded: "new Date()",
          },
        ],
        dateAdded: "new Date()",
      },
      subMissionList: [
        {
          name: "Te Gekke Beat",
          contestant: {
            name: "John Doe",
            role: role.regular,
          },
          url: "https://example.com/submissions/john-doe-beat-battle-1.mp3",
          numberOfUpvotes: 5,
          reactions: [
            {
              contents: "This is a great beat!",
              contestant: {
                name: "Jane Doe",
                role: role.regular,
              },
              dateAdded: "new Date()",
            },
          ],
          dateAdded: "new Date()",
        },
        {
          name: "Te Gekke Beat",
          contestant: {
            name: "DJ Scratch",
            role: role.regular,
          },
          url: "https://example.com/submissions/dj-scratch-beat-battle-1.mp3",
          numberOfUpvotes: 10,
          reactions: [
            {
              contents: "This gdabeat is sick!",
              contestant: {
                name: "MC Hammer",
                role: role.regular,
              },
              dateAdded: "new Date()",
            },
          ],
          dateAdded: "new Date()",
        },
        {
          name: "Te Gekke Beat",
          contestant: {
            name: "Jane Dofasdfge",
            role: role.regular,
          },
          url: "https://example.com/submissions/jane-doe-beat-battle-1.mp3",
          numberOfUpvotes: 3,
          reactions: [
            {
              contents: "This badsfeat is fire!",
              contestant: {
                name: "John Doe",
                role: role.regular,
              },
              dateAdded: "new Date()",
            },
          ],
          dateAdded: "new Date()",
        },
      ],
      closingDate: new Date("2023-10-31"),
      numberOfUpvotes: 5,
      reactions: [
        {
          contents: "This is asdfa great beat!",
          contestant: {
            name: "Jane asdfDoe",
            role: role.regular,
          },
          dateAdded: "new Date()",
        },
      ],
    },
  ],
};

const reducer: Reducer<beatBattleState> = (
  state = mockBeatBattleState,
  action
) => {
  const { type, payload } = action;
  console.log(type, payload);
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
