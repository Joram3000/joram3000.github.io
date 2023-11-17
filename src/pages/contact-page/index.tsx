import {
  Title,
  Text,
  Image,
  Container,
  Group,
  Stack,
  Anchor,
} from "@mantine/core";
import Curriculum from "./Curriculum";
import {
  IconAppWindow,
  IconBrandInstagram,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import joram from "../../assets/images/joram/joramcutout.webp";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <IconPhone />,
      text: "06 185 120 84",
    },
    {
      icon: <IconMail />,
      text: "joramkroon@live.nl",
    },
    {
      icon: <IconBrandInstagram />,
      text: "Instagram/Pracemusic",
      url: "https://www.instagram.com/pracemusic",
    },
    {
      icon: <IconAppWindow />,
      text: "Github.com/Joram3000",
      url: "https://github.com/joram3000",
    },
  ];

  return (
    <Container>
      <Title pt="md">Contact</Title>

      <Stack py="md">
        {contactInfo.map((contactItem) => (
          <Group key={contactItem.text}>
            {contactItem.icon}
            {contactItem.url ? (
              <Anchor href={contactItem.url} target="_blank">
                {contactItem.text}
              </Anchor>
            ) : (
              <Text>{contactItem.text}</Text>
            )}
          </Group>
        ))}
      </Stack>

      <Title py="md">Curriculum Vitae</Title>

      <Curriculum />

      <Image
        pos="relative"
        src={joram}
        h={300}
        w="auto"
        left="50%"
        style={{ transform: "translate(-50%,50%)" }}
      />
    </Container>
  );
}
