import { Title, Text } from "@mantine/core";
import { lorem } from "../../helpers/TextFiller";

export default function Aboutpage() {
  return (
    <>
      <Title p="md">About</Title>
      <Text p="md">{lorem.generateSentences(2)}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
    </>
  );
}
