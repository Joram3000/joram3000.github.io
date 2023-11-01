import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  RefObject,
} from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import { ActionIcon, Box, Flex, Group, Slider, Text } from "@mantine/core";
import {
  IconZoomIn,
  IconZoomOut,
  IconRepeat,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconSquareRoundedChevronRight,
  IconCircle,
  IconVolume3,
  IconVolume,
} from "@tabler/icons-react";
import PitchSlider from "./pitch-slider";
import { useDisclosure } from "@mantine/hooks";
import { useWavesurfer } from "./WaveSurferHook";
import RegionsFile from "./Regions";
import { Region } from "wavesurfer.js/dist/plugins/regions.js";

const BlankWaveSurfer: React.FC<WaveSurferOptions> = (props) => {
  const containerRef: RefObject<HTMLDivElement> =
    useRef() as RefObject<HTMLDivElement>;

  const wavesurfer = useWavesurfer(containerRef, props);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [zoom, setZoom] = useState(10);
  const [follow, { toggle: toggleFollow }] = useDisclosure(true);
  const [loop, setLoop] = useState<boolean>();
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);

  //PAUSEPLAY
  const onPlayClick = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }
  }, [wavesurfer]);

  useEffect(() => {
    wavesurfer?.setOptions({ autoScroll: follow });
  }, [follow]);

  useEffect(() => {
    if (!wavesurfer) return;
    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
      wavesurfer.on("zoom", (e) => setZoom(e)),
      // wavesurfer.on("scroll", () => console.log("SCROLLING")),
      // wavesurfer.on("click", () => console.log("CLICK")),
      // wavesurfer.on("dblclick", () => console.log("DOUBLE CLICK")),
      // wavesurfer.on("drag", () => console.log("DRAGGING")),
    ];
    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <Box p="md">
      <Text fw={700}>Playing Region: {activeRegion?.id ?? "-"}</Text>
      <Group justify="space-around" grow>
        <Text>{currentTime.toFixed(2)}</Text>
        <Text>Vol:{wavesurfer?.getVolume()}</Text>
        <Text visibleFrom="sm" c={follow ? "yellow" : ""}>
          Follow
        </Text>
        <Text visibleFrom="sm" c={loop ? "yellow" : ""}>
          Loop
        </Text>

        <Text>Zoom:{zoom.toFixed()}</Text>

        <Text>Pitch:{wavesurfer?.getPlaybackRate().toFixed(2)}</Text>
      </Group>

      <Flex className="waveform-pitchfader" maw="144px%">
        <div
          className="waveform-canvas"
          ref={containerRef}
          style={{
            width: "calc(100% - 40px)",
            height: "144px",
            overflow: "hidden",
          }}
        />
        <PitchSlider
          changePitch={(e: number) => {
            if (e > 0.07) wavesurfer!.setPlaybackRate(e, false);
          }}
        />
      </Flex>

      <Group
        className="play-pause"
        py="xs"
        justify="space-between"
        align="flex-start"
      >
        <Group>
          <ActionIcon onMouseDown={onPlayClick} bg="gray">
            {!isPlaying ? <IconPlayerPlayFilled /> : <IconPlayerPauseFilled />}
          </ActionIcon>
          <ActionIcon onMouseDown={() => console.log("kadaver")} bg="gray">
            <IconCircle />
          </ActionIcon>
        </Group>

        <RegionsFile
          wavesurfer={wavesurfer!}
          loop={loop}
          setActiveRegion={setActiveRegion}
        />

        <Group>
          <ActionIcon
            onMouseDown={toggleFollow}
            bg="gray"
            c={follow ? "yellow" : ""}
          >
            <IconSquareRoundedChevronRight />
          </ActionIcon>
          <ActionIcon
            onMouseDown={() => setLoop(!loop)}
            bg="gray"
            c={loop ? "yellow" : ""}
          >
            <IconRepeat />
          </ActionIcon>
        </Group>
      </Group>

      <Group grow>
        <Group justify="flex-start">
          <IconVolume3 />
          <Slider
            p="0"
            w="30%"
            min={0}
            max={1}
            step={0.02}
            color="orange"
            defaultValue={1}
            onChange={(e) => wavesurfer?.setVolume(e)}
            size="lg"
            showLabelOnHover={false}
          />
          <IconVolume />
        </Group>

        <Group justify="flex-end">
          <IconZoomOut
            onClick={() => zoom > 10 && wavesurfer?.zoom(zoom - 5)}
          />
          <Slider
            p="0"
            w="30%"
            min={10}
            max={300}
            color="orange"
            value={zoom}
            onChange={(e) => wavesurfer?.zoom(e)}
            size="lg"
            showLabelOnHover={false}
          />
          <IconZoomIn onClick={() => wavesurfer?.zoom(zoom + 5)} />
        </Group>
      </Group>
    </Box>
  );
};

export default BlankWaveSurfer;
