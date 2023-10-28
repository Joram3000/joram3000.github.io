import { LoremIpsum } from "lorem-ipsum";

export const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export const truncateHttps = (string: string) => {
  const regex = /^https?:\/\/?/i;
  return string.replace(regex, "");
};

export const randomColor = (opacity: number = 0.5) => {
  const random = (min: number, max: number) =>
    Math.random() * (max - min) + min;
  return `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(
    0,
    255
  )}, ${opacity})`;
};
