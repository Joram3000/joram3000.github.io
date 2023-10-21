import { ActionIcon, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import l from "../../locale";

export function LanguageSwitch() {
  const {
    i18n: { language },
  } = useTranslation();

  const handleClick = async () => {
    await l.changeLanguage(language === "nl" ? "en" : "nl");
  };

  return (
    <>
      <ActionIcon
        onClick={() => handleClick()}
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
      >
        <Text fw="700">{language === "nl" ? "NL" : "EN"}</Text>
      </ActionIcon>
    </>
  );
}
