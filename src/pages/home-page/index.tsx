import { Container, Text, Title } from "@mantine/core";
// import { useTranslation } from "react-i18next";
import { TableSort } from "./Sortedtable";

export default function HomePage() {
  // const { t } = useTranslation();

  return (
    <Container p={0}>
      <Title p="md">Joram Kroon Portfolio website</Title>
      <Text p="md">
        Op deze site staan verschillende projecten en stukken tech die ik
        gebruik en beheers. Deze website is bedoelt om inzicht te geven in wat
        ik allemaal kan. Het is echter altijd in progress dus ook al werkt er
        een boel, er wordt ook altijd aan gesleuteld.
      </Text>
      <Text p="md">
        Als developer hou ik van dynamische dingen maken. En van intuitieve
        interfaces die uitnodigen om overal op te drukken.
      </Text>

      <Title p="md" order={2}>
        Gebruikte software:
      </Title>
      <TableSort />
      <Text p="md">
        Deze website is bedoelt om inzicht te geven in wat ik allemaal kan
        maken. Er wordt altijd wel aan gesleuteld ook.
      </Text>
    </Container>
  );
}
