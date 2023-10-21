import { Text, Title } from "@mantine/core";
import { lorem } from "../../helpers/TextFiller";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Title p="md">HomePage</Title>
      <Text p="md">{t("hello")}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>

      <Title p="md" order={2}>
        {t("helloWorld")}
      </Title>
      <Text p="md">{t("hello")}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Title p="md" order={2}>
        Nog meer text Wow!
      </Title>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
      <Text p="md">{lorem.generateParagraphs(1)}</Text>
    </>
  );
}
