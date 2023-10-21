import { Title, Text, Image } from "@mantine/core";
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

      <Image
        radius="xl"
        p="md"
        h={200}
        src="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
      />
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
    </>
  );
}
