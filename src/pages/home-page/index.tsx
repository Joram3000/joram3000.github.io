import { Image, Container, Text, Title, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { TableSort } from "./Sortedtable";
import pino from "../../assets/images/meme/pino.webp";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <Container>
      <Title pt="md">{t("home.title")}</Title>
      <Text py="md">{t("home.welcome")}</Text>
      <Text py="md">{t("home.interests")}</Text>
      <TableSort />
      <Text py="md">{t("home.coding")}</Text>

      <Group justify="space-around">
        <Image
          pos="relative"
          src={pino}
          w="400px"
          style={{ transform: "translate(-0px,45px)" }}
        />
      </Group>
    </Container>
  );
}
