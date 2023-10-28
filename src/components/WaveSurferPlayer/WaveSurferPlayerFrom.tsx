import { Button, Checkbox, Group, Slider, Stack, Text } from "@mantine/core";
import { useState, useEffect, useRef, useCallback, RefObject } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline";
import HoverPLugin from "wavesurfer.js/dist/plugins/hover";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import { IconZoomIn, IconZoomOut } from "@tabler/icons-react";
import { randomColor } from "../../helpers/helpers";

// WaveSurfer hook
const useWavesurfer = (
  containerRef: RefObject<HTMLDivElement>,
  options: WaveSurferOptions
) => {
  // @ts-ignore
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });
    ws.registerPlugin(
      HoverPLugin.create({
        lineColor: "#ff0000",
        lineWidth: 1,
        labelBackground: "#555",
        labelColor: "#fff",
        labelSize: "11px",
      })
    );

    ws.registerPlugin(TimelinePlugin.create());
    const wsRegions = ws.registerPlugin(RegionsPlugin.create());

    // Create some regions at specific time ranges
    ws.on("decode", () => {
      // Regions
      wsRegions.addRegion({
        start: 1,
        end: 3,
        loop: true,
        content: "Kadaver",
        color: randomColor(),
        drag: false,
        resize: true,
      });
      wsRegions.addRegion({
        start: 9,
        end: 10,
        loop: true,
        content: "Cramped region",
        color: randomColor(),
        minLength: 1,
        maxLength: 10,
      });
    });

    wsRegions.enableDragSelection({
      color: "rgba(255, 0, 0, 0.1)",
    });

    wsRegions.on("region-updated", (region: any) => {
      console.log("Updated region", region);
    });

    const loop = true; // was eerst LET
    let activeRegion: any = null;
    wsRegions.on("region-in", (region: any) => {
      activeRegion = region;
    });

    wsRegions.on("region-out", (region: any) => {
      if (activeRegion === region) {
        if (loop) {
          region.play();
        } else {
          activeRegion = null;
        }
      }
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

// Create a React component that will render wavesurfer.
// Props are wavesurfer options.
export const WaveSurferPlayert = (props: WaveSurferOptions) => {
  const containerRef: RefObject<HTMLDivElement> =
    useRef() as RefObject<HTMLDivElement>;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [minPxPerSec, setMinPxPerSec] = useState(200);
  const wavesurfer = useWavesurfer(containerRef, props);

  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  useEffect(() => {
    if (!wavesurfer) return;
    setCurrentTime(0);
    setIsPlaying(false);
    setMinPxPerSec(200);
    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
      // wavesurfer.setPlaybackRate(0.8, false),
    ];
    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  const handleZoom = useCallback(
    (newMinPxPerSec: number) => {
      setMinPxPerSec(newMinPxPerSec);
      wavesurfer.zoom(newMinPxPerSec);
    },
    [wavesurfer]
  );

  return (
    <Stack style={{ border: "1px dotted white" }}>
      <div
        ref={containerRef}
        className="waveFormCanvas"
        style={{ border: "1px dotted white" }}
      />

      <Stack style={{ border: "1px dotted white" }} justify="space-between">
        <Group bg="red">
          <Button onClick={onPlayClick}>{isPlaying ? "Pause" : "Play"}</Button>
          <Text>Seconds played: {currentTime.toFixed(2)}</Text>
        </Group>

        <Group bg="orange">
          <IconZoomOut onClick={() => console.log("-")} />
          <Slider
            w="30%"
            min={1}
            max={1000}
            color="pink"
            value={minPxPerSec}
            onChange={handleZoom}
            size="lg"
            showLabelOnHover={false}
          />
          <IconZoomIn onClick={() => console.log("+")} />

          <Group bg="blue">
            <Checkbox label="Loop" />
          </Group>
        </Group>
      </Stack>
    </Stack>
  );
};
