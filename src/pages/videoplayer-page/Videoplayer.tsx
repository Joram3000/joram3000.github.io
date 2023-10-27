import { useState } from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";
import {
  AspectRatio,
  Button,
  ColorPicker,
  Container,
  Drawer,
  ScrollArea,
  Stack,
  TagsInput,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { lorem } from "../../helpers/helpers";
import { useSelector } from "react-redux";
import { getUIStateSelector } from "../../store/ui/selectors";

function VideoPlayer() {
  const [color, setColor] = useState<string>("#0000ff");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [arrayValues, setArrayValues] = useState<string[]>(["Goedesnavels"]);

  const [opened, { open, close }] = useDisclosure(false);

  const uiState = useSelector(getUIStateSelector);
  console.log(uiState.drawerOpen);
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
      <Title pb="md">Dynamic Video</Title>

      <AspectRatio ratio={960 / 270} maw={"100%"} mx="auto">
        <div
          className="background-layer"
          style={{
            borderRadius: 16,
            backgroundColor: color,
            overflow: "hidden",
          }}
        >
          <ReactPlayer
            playing
            controls
            url="animation09.mp4"
            width={1920 / 2}
            height={1080 / 4}
            loop
            onProgress={handleProgress}
          />
          {showOverlay && (
            <div className="overlay-layer">
              <h2 className="overlay-text">{arrayValues[greetingIndex]}</h2>
            </div>
          )}
        </div>
      </AspectRatio>
      <Stack align="center" m="md">
        <Text>Kies een achtergrondkleur:</Text>
        <ColorPicker
          onChange={setColor}
          withPicker={false}
          value={color}
          format="hex"
          swatches={[
            "#25262b",
            "#868e96",
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

        <Text>Type hier je begroetingen:</Text>
        <TagsInput
          w={320}
          value={arrayValues}
          onChange={setArrayValues}
          placeholder="Type begroeting"
          data={["Goedemiddag", "Goedenavond", "Hartelijke snavels"]}
        />
      </Stack>

      <Drawer position="right" opened={opened} onClose={close} size="sm">
        <Title order={3} pb="md">
          Extra informatie
        </Title>
        <ScrollArea offsetScrollbars type="never">
          <Text pb="md">{lorem.generateParagraphs(1)}</Text>
          <Text pb="md">{lorem.generateParagraphs(6)}</Text>
        </ScrollArea>
      </Drawer>

      <Button onClick={open}>Open Drawer</Button>
    </Container>
  );
}

export default VideoPlayer;
