import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  RefObject,
} from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline";
import HoverPlugin from "wavesurfer.js/dist/plugins/hover";
import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Group,
  Slider,
  Stack,
  Text,
  useMantineTheme,
  rem,
} from "@mantine/core";
import {
  IconZoomIn,
  IconZoomOut,
  IconRepeat,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconSquareRoundedChevronRight,
  IconCircle,
} from "@tabler/icons-react";
import PitchSlider from "./pitch-slider";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";
import Region from "wavesurfer.js";
import { useDisclosure } from "@mantine/hooks";

const useWavesurfer = (
  containerRef: RefObject<HTMLDivElement>,
  options: WaveSurferOptions
): WaveSurfer | null => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });
    ws.registerPlugin(
      HoverPlugin.create({
        lineColor: "#ff0000",
        lineWidth: 2,
        labelBackground: "#555",
        labelColor: "#fff",
        labelSize: "16px",
      })
    );
    ws.registerPlugin(
      TimelinePlugin.create({
        height: 40,
        insertPosition: "beforebegin",
      })
    );

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

const WaveSurferPlayer: React.FC<WaveSurferOptions> = (props) => {
  const theme = useMantineTheme();
  const containerRef: RefObject<HTMLDivElement> =
    useRef() as RefObject<HTMLDivElement>;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);
  const [savedRegions, setSavedRegions] = useState<Region[]>([]);
  const [cuePoint, setCuePoint] = useState<Region>();
  const [zoom, setZoom] = useState(160);
  const [follow, { toggle: toggleFollow }] = useDisclosure(false);
  const [loop, { toggle: toggleLoop }] = useDisclosure(false);
  const wavesurfer = useWavesurfer(containerRef, props);
  const wsRegions = wavesurfer?.registerPlugin(RegionsPlugin.create());

  useEffect(() => {
    wavesurfer?.on("ready", () => {
      wsRegions.enableDragSelection({
        color: "rgba(255, 0, 0, 0.2)",
      });
      setCuePoint(
        wsRegions.addRegion({
          id: "start",
          start: 0.05,
          content: "Marker",
          color: "red",
        })
      );

      wsRegions.on("region-in", (region: Region) => setActiveRegion(region));

      wsRegions.on("region-out", (region: Region) => {
        console.log("kom ik hier wel?", loop);
        loop ? region.play() : setActiveRegion(null);
      });

      wsRegions.on("region-created", () => {
        console.log("creatieerd", wsRegions);
        setSavedRegions(wsRegions.regions);
      });

      wsRegions.on("region-clicked", (region: Region, e: MouseEvent) => {
        e.stopPropagation();
        setActiveRegion(region);
        region.play();
      });
    });
  }, [wsRegions]);

  const playRegion = (region: Region) => {
    setActiveRegion(region);
    region.play();
  };

  useEffect(() => {
    if (!wavesurfer) return;
    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  const onPlayClick = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }
  }, [wavesurfer]);

  const handleZoom = useCallback(
    (newZoom: number) => {
      if (wavesurfer) wavesurfer.zoom(newZoom);
    },
    [wavesurfer]
  );

  useEffect(() => {
    if (zoom > 20) handleZoom(zoom);
  }, [zoom]);

  const changePitch = (e: number) => {
    if (e > 0.07) wavesurfer!.setPlaybackRate(e, false);
  };

  return (
    <Container>
      <Group justify="space-between">
        <Text>{activeRegion ? activeRegion.id : "no active"}</Text>
        <Stack align="flex-start">
          <Text>{follow ? "follow ON" : "follow OFF"}</Text>
          <Text>{loop ? "Loop ON" : "Loop OFF"}</Text>
        </Stack>
      </Group>

      <Flex miw="100%">
        <div
          className="waveform-canvas"
          ref={containerRef}
          style={{
            width: `calc(95% - ${rem(16)})`,
            display: "flex",
          }}
        />
        <PitchSlider changePitch={changePitch} />
      </Flex>

      <Group bg="red" p="md" justify="space-between">
        <Group>
          <ActionIcon
            onMouseDown={() => playRegion(cuePoint!)}
            onMouseUp={() => wavesurfer?.stop()}
            bg="gray"
          >
            <IconCircle />
          </ActionIcon>
          <ActionIcon onMouseDown={onPlayClick} bg="gray">
            {!isPlaying ? <IconPlayerPlayFilled /> : <IconPlayerPauseFilled />}
          </ActionIcon>
        </Group>
        <Text>Seconds played: {currentTime.toFixed(3)}</Text>

        <Group>
          <ActionIcon onMouseDown={toggleFollow} bg={follow ? "" : "gray"}>
            <IconSquareRoundedChevronRight />
          </ActionIcon>

          <ActionIcon onMouseDown={toggleLoop} bg={loop ? "" : "gray"}>
            <IconRepeat />
          </ActionIcon>
        </Group>
      </Group>

      <Group className="zoom-fader" bg="orange">
        <IconZoomOut
          onClick={() => {
            if (zoom > 10) setZoom(zoom - 20);
          }}
        />
        <Slider
          w="30%"
          min={8}
          max={1000}
          color="pink"
          value={zoom}
          onChange={setZoom}
          size="lg"
          showLabelOnHover={false}
        />
        <IconZoomIn onClick={() => setZoom(zoom + 20)} />
      </Group>
      <Group justify="flex-end" p="md">
        <Text>Loop Points:</Text>
        {savedRegions?.map((region: Region, i) => (
          <Button
            color={theme.colors.red[9 - i]}
            key={region.id}
            onClick={() => playRegion(region)}
          >
            {i}
          </Button>
        ))}
      </Group>
    </Container>
  );
};

export default WaveSurferPlayer;
