import { Text, Title } from "@mantine/core";
import { lorem } from "../../helpers/TextFiller";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  const woordjeTest = t("backToOverview");

  console.log(woordjeTest);

  return (
    <>
      <Title p="md">HomePage</Title>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Title p="md" order={2}>
        {t("backToOverview")}
      </Title>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Title p="md" order={2}>
        Nog meer text Wow!
      </Title>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
    </>
  );
}
