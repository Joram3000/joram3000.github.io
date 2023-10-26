import { Group, Burger, Text } from "@mantine/core";
import { ThemeSwitch } from "../buttons/ThemeSwitch";
import { LanguageSwitch } from "../buttons/LanguageSwitch";
import { useTranslation } from "react-i18next";

interface HeaderSimpleProps {
  isOpen: boolean;
  onClick: () => void;
}

const HeaderSimple: React.FC<HeaderSimpleProps> = ({ isOpen, onClick }) => {
  const { t } = useTranslation();

  return (
    <header>
      <Group justify="space-between" align="center" p="md" h={60}>
        <Text c="violet" visibleFrom="sm" fw={700}>
          {t("header")}
        </Text>

        <Burger opened={isOpen} onClick={onClick} hiddenFrom="sm" size="sm" />

        <Text c="violet" hiddenFrom="sm" fw={700}>
          {t("header")}
        </Text>
        <Group>
          <LanguageSwitch />
          <ThemeSwitch />
        </Group>
      </Group>
    </header>
  );
};

export default HeaderSimple;
