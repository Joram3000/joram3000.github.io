import { Container, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { lorem } from "../../helpers/helpers";
// import ReactPlayer from "react-player";
import { TableSort } from "./Sortedtable";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <Container p={0}>
      <Title p="md">HomePage</Title>
      <Text p="md">{t("hello")}</Text>

      <Stack justify="center" align="center">
        {/* <ReactPlayer url="https://www.youtube.com/embed/LhcSagiy81A?si=w9RHo-FQg-p5rtT-" /> */}
      </Stack>

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

      <Title p="md" order={2}>
        {t("helloWorld")}
      </Title>
      <Text p="md">{t("hello")}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Title p="md" order={2}>
        Tech die gebruikt is:
      </Title>
      <TableSort />
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
    </Container>
  );
}
