import {
  Anchor,
  AspectRatio,
  Container,
  Group,
  Slider,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Uitleg = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [value, onChange] = useState(0);
  return (
    <Container>
      <Title pt="md">{t("patternMaker.title")}</Title>
      <Text py="md">{t("patternMaker.description")}</Text>
      <Text py="md">{t("patternMaker.usage")}</Text>

      <Text py="md">{t("patternMaker.stateManagement")}</Text>

      <Group justify="center">
        <Stack pb="xl">
          <Text>{t("patternMaker.howItWorksTitle")}</Text>
          <Slider
            min={0}
            max={25}
            value={value}
            onChange={onChange}
            onChangeEnd={() => onChange(0)}
          />
        </Stack>
      </Group>

      <div>
        <AspectRatio ratio={960 / 270} mx="auto" mt="md" mb="xl">
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: `rotateY(${value}deg) rotateY(${value / 2}deg)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: theme.colors.grape[9],
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text>Waveform Background</Text>
            </div>
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: theme.colors.grape[8],
                transform: `translate(${value}px, ${value}px)`,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text>Sequencer</Text>
            </div>
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: theme.colors.grape[7],
                transform: `translate(${value * 2}px, ${value * 2}px)`,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text>Buttons</Text>
            </div>
          </div>
        </AspectRatio>
      </div>

      <Text py="md">{t("patternMaker.howItWorksContent.0")}</Text>
      <Text py="md">{t("patternMaker.howItWorksContent.1")}</Text>
      <Text py="md">{t("patternMaker.howItWorksContent.2")}</Text>

      <Anchor
        href={
          "https://github.com/Joram3000/joram3000.github.io/tree/main/src/pages/patternmaker-page"
        }
        target="_blank"
      >
        <Text py="md">Hier is een link naar de github</Text>
      </Anchor>
    </Container>
  );
};

export default Uitleg;
