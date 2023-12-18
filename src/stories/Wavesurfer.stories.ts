import type { Meta, StoryObj } from "@storybook/react";

import BlankWaveSurfer from "../components/WaveSurferPlayer/BlankWaveSurfer";
// import treingv from "../../assets/music/treingv.mp3";

const meta = {
  title: "HomemadeComponent/BlankWavesurfer",
  component: BlankWaveSurfer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof BlankWaveSurfer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Standard: Story = {};
