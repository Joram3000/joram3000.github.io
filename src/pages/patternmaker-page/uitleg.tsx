import {
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
    <>
      <Title>PatternCreator</Title>
      <Text>
        Dit is een patternMaker, met educatieve richting In het midden zie je de
        blokjes, daarmee kan je een patroon maken Met de toetsen linksboven kan
        je het geluid bepalen. Met de toetsen rechtsboven kan je het ritme
        bepalen. Op de achterkant zie je een P5 sketch die de waveform laat
        zien.
      </Text>

      <Text>Met de sliders kan je het Volume en een filter toepassen.</Text>

      <Text>
        State-management wordt gedaan met Redux. Hier wordt oa huidige patroon
        opgeslagen. Ook zijn hier de 4 presetbeats opgeslagen en de play-state
        als het geselecteerde geluid
      </Text>

      <Container mb="xl">
        <Group w="100%" justify="center" mt="xl">
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

        <div style={{ marginBottom: "45px" }}>
          <AspectRatio ratio={960 / 270} maw={"70%"} mx="auto" mt="md" mb="xl">
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
        <Text>
          Dit is een patternMaker, met educatieve richting In het midden zie je
          de blokjes, daarmee kan je een patroon maken Met de toetsen linksboven
          kan je het geluid bepalen. Met de toetsen rechtsboven kan je het ritme
          bepalen. Op de achterkant zie je een P5 sketch die de waveform laat
          zien.
        </Text>

        <Text>Met de sliders kan je het Volume en een filter toepassen.</Text>

        <Text>
          State-management wordt gedaan met Redux. Hier wordt oa huidige patroon
          opgeslagen. Ook zijn hier de 4 presetbeats opgeslagen en de play-state
          als het geselecteerde geluid
        </Text>
      </Container>
    </>
  );
};

export default Uitleg;
