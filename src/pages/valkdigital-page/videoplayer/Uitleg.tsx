import {
  AspectRatio,
  Container,
  Group,
  Slider,
  Stack,
  useMantineTheme,
  Text,
  Anchor,
} from "@mantine/core";
import { useState } from "react";

const Uitleg = () => {
  const theme = useMantineTheme();
  const [value, onChange] = useState(0);

  return (
    <>
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
              <Text>backgroundColor</Text>
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
              <Text>gradientLayer</Text>
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
              <Text>animationLayer</Text>
            </div>
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: theme.colors.grape[6],
                transform: `translate(${value * 3}px, ${value * 3}px)`,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text>textOverlay</Text>
            </div>
          </div>
        </AspectRatio>
      </Container>
      <Container>
        <Text py="md">
          Dit is een project voor Valk To Go om in-store dynamische / customized
          videocontent af te spelen. Je kan zelf de achtergrondkleur en de
          begroetingen instellen. De begroetingen worden aan de start van de
          video getoont. De gehele animatie-laag heb ik zelfstandig ontworpen in
          Da Vinci Resolve.
        </Text>
        <Text py="md">
          Persoonlijk ben ik erg tevreden over dit project. Er komen
          verschillende disciplines bij elkaar samen: video-content,
          interactieve interfaces en software development. En dit is de kant die
          ik zelf het liefst verder op ga: multidisciplinaire digitale elementen
          ontwikkelen.
        </Text>

        <Anchor
          href={
            "https://github.com/Joram3000/joram3000.github.io/tree/main/src/pages/valkdigital-page/videoplayer"
          }
          target="_blank"
        >
          <Text py="md">Hier is een link naar de github</Text>
        </Anchor>
      </Container>
    </>
  );
};

export default Uitleg;
