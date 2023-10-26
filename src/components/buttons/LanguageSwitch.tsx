import { ActionIcon, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import l from "../../locale";

export function LanguageSwitch() {
  const {
    i18n: { language },
  } = useTranslation();

  const languages = ["nl", "en", "ar"];

  const getButtonText = () => {
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    return languages[nextIndex];
  };

  const handleClick = async () => {
    const nextLanguage = getButtonText();
    await l.changeLanguage(nextLanguage);
  };

  return (
    <ActionIcon onClick={() => handleClick()} variant="default" size="lg">
      <Text fw="700">{getButtonText().toUpperCase()}</Text>
    </ActionIcon>
  );
}
