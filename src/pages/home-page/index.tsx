import { Container, Text, Title } from "@mantine/core";
// import { useTranslation } from "react-i18next";
import { TableSort } from "./Sortedtable";

export default function HomePage() {
  // const { t } = useTranslation();

  return (
    <Container p={0}>
      <Title p="md">Joram Kroon Portfolio Playground</Title>
      <Text p="md">
        Gegroet en welkom in deze digitale zandbak. Op deze site kan je zien wat
        ik heb ontwikkeld in de afgelopen 20 maanden aan code ervaring. Op deze
        site staan verschillende projecten en stukken tech die ik gebruik en
        beheers. Deze website is bedoelt om inzicht te geven in wat ik allemaal
        kan. Het is echter altijd in progress dus ook al werkt er een boel, er
        wordt ook altijd aan gesleuteld.
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
        Kwa code wordt ik het meest blij van hoog responsieve interfaces die
        intuitief aanvoelen. Ook heb ik veel interesse in animatie en hoe je dat
        in kan zetten om de app-ervaring onbewust te verstevigen. Daarnaast heb
        ik - gezien mijn vorige carriere als componist - ook veel interesse in
        sound design voor interfaces. Kortom: alles wat te maken heeft met de
        ervaring en wisselwerking tussen een stuk technologie en de persoon die
        het gebruikt.
      </Text>
    </Container>
  );
}
