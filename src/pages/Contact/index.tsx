import { Title, Text } from "@mantine/core";
import { lorem } from "../../helpers/TextFiller";

export default function ContactPage() {
  return (
    <>
      <Title p="md">ContactPage</Title>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Title p="md" order={2}>
        Nog meer text Wow!
      </Title>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Title p="md" order={2}>
        Nog meer text Wow!
      </Title>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
    </>
  );
}
