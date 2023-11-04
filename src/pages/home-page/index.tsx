import { Container, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { TableSort } from "./Sortedtable";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <Container p={0}>
      <Title p="md">HomePage</Title>
      <Text p="md">{t("hello")}</Text>
      <Text p="md">
        Op deze site staan verschillende projecten en stukken tech die ik
        gebruik en beheers. Deze website is bedoelt om inzicht te geven in wat
        ik allemaal kan. Het is echter altijd in progress dus ook al werkt er
        een boel, er wordt ook altijd aan gesleuteld.
      </Text>

      <Title p="md" order={2}>
        Tech die gebruikt is:
      </Title>
      <TableSort />
      <Text p="md">
        Het is echter altijd in progress dus ook al werkt er een boel, er wordt
        ook altijd aan gesleuteld.
      </Text>
    </Container>
  );
}
