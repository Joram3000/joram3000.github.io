import { useState } from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";
import {
  AspectRatio,
  ColorPicker,
  Container,
  Fieldset,
  Group,
  Slider,
  Stack,
  TagsInput,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

import { isSafari } from "react-device-detect";
import safariVideo from "../../../assets/video/animation09.mp4";
import chromeVideo from "../../../assets/video/animation09-vp9-chrome.webm";
import feather from "../../../assets/images/feather.png";

function VideoPlayer() {
  const theme = useMantineTheme();
  const [color, setColor] = useState<string>("#0000ff");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [value, onChange] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [arrayValues, setArrayValues] = useState<string[]>([
    "Goedesnavels",
    "Hallo goedemiddag",
  ]);

  const handleProgress = (progress: { playedSeconds: number }) => {
    if (progress.playedSeconds < 1) {
      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
      }, 3300);
      setGreetingIndex((prevIndex) => (prevIndex + 1) % arrayValues.length);
    }
  };

  return (
    <Container p="md">
      <Title pb="md">Dynamic Video voor instore narrowcasting</Title>

      <AspectRatio ratio={960 / 270} maw={"100%"} mx="auto" mt="xl">
        <div
          className="canvas-layer"
          style={{
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              backgroundColor: color,
              zIndex: -2,
              width: "100%",
              height: "100%",
            }}
          />
          <img
            style={{
              position: "absolute",
              zIndex: -1,
              opacity: 0.3,
              transform: "rotate(0.5turn)",
            }}
            src={feather}
            width="100%"
            height="100%"
          />
          <ReactPlayer
            playing
            loop
            muted
            url={isSafari ? safariVideo : chromeVideo}
            width={1920 / 2}
            height={1084 / 4}
            onProgress={handleProgress}
          />

          {showOverlay && (
            <div className="overlay-layer">
              <h2 className="overlay-text">{arrayValues[greetingIndex]}</h2>
            </div>
          )}
        </div>
      </AspectRatio>

      <Fieldset legend="Customize the video content" mt="xl">
        <Group align="flex-start" justify="space-around" p="md" w="100%">
          <Stack align="flex-start" justify="flex-end">
            <Text>Kies een achtergrondkleur:</Text>
            <ColorPicker
              w={320}
              m={0}
              p={0}
              onChange={setColor}
              withPicker={false}
              value={color}
              format="hex"
              swatches={[
                "#FF8787",
                "#20c997",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14",
              ]}
            />
          </Stack>

          <Stack align="flex-start" justify="flex-end">
            <Text>Type hier je begroetingen:</Text>
            <TagsInput
              pt="5px"
              w={320}
              value={arrayValues}
              onChange={setArrayValues}
              placeholder="Type begroeting"
              data={["Goedemiddag", "Goedenavond", "Hartelijke snavels"]}
            />
          </Stack>
        </Group>
      </Fieldset>

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
        <Text pb="md">
          Dit is een project voor Valk To Go om in-store dynamische en
          customized videocontent af te spelen. Je kan zelf de achtergrondkleur
          en de begroetingen instellen. De begroetingen worden aan de start van
          de video getoont. De gehele animatie-laag heb ik gecreeerd in Da Vinci
          Resolve.
        </Text>
      </Container>
    </Container>
  );
}

export default VideoPlayer;
