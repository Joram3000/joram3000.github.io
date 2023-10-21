import { Group, Burger, Text } from "@mantine/core";
import { ThemeSwitch } from "../buttons/ThemeSwitch";
import { LanguageSwitch } from "../buttons/LanguageSwitch";
import { useTranslation } from "react-i18next";

interface HeaderSimpleProps {
  opened: boolean;
  onClickelientje: () => void;
}

const HeaderSimple: React.FC<HeaderSimpleProps> = ({
  opened,
  onClickelientje,
}) => {
  const { t } = useTranslation();

  return (
    <header>
      <Group justify="space-between" align="center" p="md" h={60}>
        <Text visibleFrom="sm" fw={700}>
          {t("header")}
        </Text>

        <Burger
          opened={opened}
          onClick={onClickelientje}
          hiddenFrom="sm"
          size="sm"
        />

        <Group>
          <LanguageSwitch />
          <ThemeSwitch />
        </Group>
      </Group>
    </header>
  );
};

export default HeaderSimple;
