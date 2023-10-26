import { Container, Group, Stack, Table, Text, Title } from "@mantine/core";
import { lorem } from "../../helpers/TextFiller";
import { useTranslation } from "react-i18next";
import { IconUfo } from "@tabler/icons-react";
import ReactPlayer from "react-player";
import { Carousel } from "@mantine/carousel";
export default function HomePage() {
  const { t } = useTranslation();

  const usedTech = [
    { name: "React", logo: "09", url: "www.url.nl", typeOf: "package" },
    { name: "Typescript", logo: "09", url: "www.url.nl", typeOf: "package" },
    { name: "Mantine", logo: "09", url: "www.url.nl", typeOf: "package" },
    { name: "Redux", logo: "09", url: "www.url.nl", typeOf: "package" },
    { name: "React Query", logo: "09", url: "www.url.nl", typeOf: "package" },
    {
      name: "React Parallax",
      logo: "09",
      url: "www.url.nl",
      typeOf: "package",
    },
    { name: "React Spring", logo: "09", url: "www.url.nl", typeOf: "package" },
    { name: "P5", logo: "09", url: "www.url.nl", typeOf: "package" },
    { name: "Tone.JS", logo: "09", url: "www.url.nl", typeOf: "package" },
    { name: "Wavesurfer.JS", logo: "09", url: "www.url.nl", typeOf: "package" },
    { name: "date-fns", logo: "09", url: "www.url.nl", typeOf: "package" },
  ];

  const rows = usedTech.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>
        <Group>
          <IconUfo />
          <Text>{element.name}</Text>
        </Group>
      </Table.Td>

      <Table.Td onClick={() => console.log(element.url)}>
        <Text> {element.url}</Text>
      </Table.Td>
      <Table.Td>
        <Text>{element.typeOf}</Text>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Container p={0}>
      <Title p="md">HomePage</Title>
      <Text p="md">{t("hello")}</Text>

      <Text p="md">
        Joram Ipsum Joram Ipsum Joram Ipsum Voluptate magna laborum labore esse.
        Joram Ipsum Consectetur veniam culpa voluptate amet et pariatur nisi et
        mollit dolor. Ut velit veniam dolor laboris dolore voluptate voluptate
        nostrud. Eiusmod in sit elit voluptate nostrud id aliquip reprehenderit
        minim ea id nulla id sit ullamco. Duis anim elit amet eu aute ex veniam
        minim reprehenderit cillum deserunt nulla enim aliqua. Incididunt
        pariatur deserunt nostrud ipsum. Excepteur irure non qui excepteur ipsum
        cupidatat pariatur ullamco sunt sint.
      </Text>

      <Container>
        <Carousel withIndicators loop>
          <Carousel.Slide>
            <Stack justify="center" align="center">
              <ReactPlayer
                control
                url="https://www.youtube.com/embed/LhcSagiy81A?si=w9RHo-FQg-p5rtT-"
                loop
              />
            </Stack>
          </Carousel.Slide>

          <Carousel.Slide>
            <Stack justify="center" align="center">
              <ReactPlayer
                control
                url="https://www.youtube.com/watch?v=x9ctNPtXF_A"
                loop
              />
            </Stack>
          </Carousel.Slide>
        </Carousel>
      </Container>
      <Title p="md" order={2}>
        {t("helloWorld")}
      </Title>
      <Text p="md">{t("hello")}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Title p="md" order={2}>
        Tech die gebruikt is:
      </Title>
      <Container>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Naam</Table.Th>
              <Table.Th>URL</Table.Th>
              <Table.Th>TypeOf</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Container>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
    </Container>
  );
}
