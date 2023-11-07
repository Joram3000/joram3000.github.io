import { useState } from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";
import {
  AspectRatio,
  ColorPicker,
  Container,
  Fieldset,
  Group,
  Stack,
  TagsInput,
  Text,
  Title,
} from "@mantine/core";

import { isSafari } from "react-device-detect";
import safariVideo from "../../../assets/video/animation09.mp4";
import chromeVideo from "../../../assets/video/animation09-vp9-chrome.webm";
import feather from "../../../assets/images/feather.png";
import DrawerComponent from "../../../components/drawer/DrawerComponent";
import Uitleg from "./Uitleg";

function VideoPlayer() {
  const [color, setColor] = useState<string>("#0000ff");
  const [greetingIndex, setGreetingIndex] = useState(0);

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
      <DrawerComponent uitleg={Uitleg()} />
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

      <Fieldset legend="Customize de videocontent" mt="xl">
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
    </Container>
  );
}

export default VideoPlayer;
