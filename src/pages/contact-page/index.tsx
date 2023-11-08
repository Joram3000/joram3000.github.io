import {
  Title,
  Text,
  Image,
  Container,
  Group,
  Stack,
  Anchor,
} from "@mantine/core";
import Curriculum from "./curriculum";
import {
  IconAppWindow,
  IconBrandInstagram,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import joram from "../../assets/images/joramcutout.webp";

export default function ContactPage() {
  return (
    <Container>
      <Title pt="md">Contact</Title>
      <Stack pt="md">
        <Group align="center">
          <IconPhone />
          <Text>0618512084</Text>
        </Group>
        <Group align="center">
          <IconMail />
          <Text>joramkroon@live.nl</Text>
        </Group>
        <Anchor href={"https://www.instagram.com/pracemusic"} target="_blank">
          <Group align="center">
            <IconBrandInstagram />
            <Text>Instagram</Text>{" "}
          </Group>
        </Anchor>
        <Anchor href={"https://joramkroon.com"} target="_blank">
          <Group align="center">
            <IconAppWindow />
            <Text>JoramKroon.com (old Artist Webite)</Text>
          </Group>
        </Anchor>
        <Anchor href={"https://github.com/joram3000/"} target="_blank">
          <Group align="center">
            <IconAppWindow />
            <Text>Github.com/Joram30000</Text>
          </Group>
        </Anchor>
      </Stack>

      <Title py="md">Curriculum Vitae</Title>
      <Curriculum />
      <Text p="md">
        Voor de corona periode was ik cultureel ondernemer. Voornamelijk
        werkzaam als educator, DJ, uitvoerend muzikant en componist. Nu heb ik
        dezelfde obsessie met software ontwikkeling als dat ik vroeger had met
        muziek maken.
      </Text>
      <Title p="md" order={2}>
        Nog meer text Wow!
      </Title>
      <Image
        radius="xl"
        p="md"
        h={200}
        src="https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
      />
      <Text p="md">
        Id labore cillum sunt. Magna pariatur pariatur anim aliqua fugiat elit
        veniam velit aliqua. Reprehenderit officia ex pariatur Lorem aliquip
        aliquip culpa consequat magna ex minim ea aliquip ullamco officia.
        Dolore voluptate officia commodo elit sint ut in. Non dolore Lorem ea
        non. Excepteur cupidatat veniam anim irure adipisicing aliquip aliqua
        cillum fugiat.
      </Text>
      <Text p="md">
        Pariatur anim nulla ea incididunt sunt proident proident. Deserunt
        proident ad eiusmod minim officia pariatur magna labore mollit do
        pariatur quis id reprehenderit in. Dolore adipisicing proident pariatur
        exercitation commodo ullamco eiusmod duis. Aliqua incididunt consequat
        eu aliquip. Dolor adipisicing laboris et eiusmod tempor do sit aliquip
        cupidatat laboris tempor proident nulla sit. Ea fugiat fugiat ipsum est
        in veniam exercitation Lorem duis est non nostrud occaecat qui. Eu quis
        nulla irure pariatur.
      </Text>
      <Image pos="absolute" src={joram} h={300} w="auto" left="50%" />
    </Container>
  );
}
