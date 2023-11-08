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

const Uitleg = () => {
  const theme = useMantineTheme();
  const [value, onChange] = useState(0);
  return (
    <Container>
      <Title py="md">De Patroonmaker</Title>
      <Text py="md">Deze app is geoptimaliseerd voor een desktopbrowser.</Text>
      <Text py="md">
        Met deze app kan je je eigen ritme patroon creeren. Als je op Play drukt
        kan je horen hoe het ritme klinkt. Terwijl je aan het rondklikken bent
        blijft de 'muzikale tijd' doorgaan. Oftewel: de muziek wordt niet
        onderbroken als je een nieuw ritme maakt, andere geluiden kiest of aan
        de sliders zit.
      </Text>

      <Text py="md">
        State-management wordt gedaan met Redux voor het actuele ritme, de
        preset beats, de geluidskeuze en de sliders.
      </Text>

      <Group justify="center">
        <Stack>
          <Text>Hoe het werkt?</Text>
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

      <Text py="md">
        De achtergrond is een waveform-visualizer die geschreven is in de
        creative coding library P5. De muziek zelf komt tot stand met Tone.JS,
        een library die geschreven is over de Web Audio API heen. Die zorgt dat
        de muzikale tijd doorgaat. De geluiden zijn opgeslagen binnen een aantal
        samplers, die je kan selecteren met de knop linksboven.
      </Text>

      <Text py="md">
        Rechtsboven kan je de preset beats selecteren en je eigen ritme opslaan.
      </Text>

      <Text py="md">
        State-management wordt gedaan met Redux. Hier wordt oa huidige patroon
        opgeslagen. Ook zijn hier de 4 presetbeats opgeslagen en de play-state
        als het geselecteerde geluidsstijl
      </Text>

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
