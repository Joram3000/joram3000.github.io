import { Title, Text, Image, Container, Group } from "@mantine/core";
import Curriculum from "./curriculum";
import { IconBrandInstagram, IconMail, IconPhone } from "@tabler/icons-react";

export default function ContactPage() {
  return (
    <Container>
      <Title>Contact</Title>
      <Group>
        <IconPhone />
        <Text>0618512084</Text>
      </Group>
      <Group>
        <IconBrandInstagram />
        <Text>Instagram @pracemusic</Text>
      </Group>
      <Group>
        <IconMail />
        <Text>joramkroon@live.nl</Text>
      </Group>

      <Curriculum />

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
    </Container>
  );
}
