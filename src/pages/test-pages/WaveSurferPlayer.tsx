import { useState, useEffect, useCallback } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import { Group, Button, Text, Stack } from "@mantine/core";
import React from "react";

// WaveSurfer hook
const useWavesurfer = (containerRef: any, options: WaveSurferOptions) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>();

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });
    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

const WaveSurferPlayer = (props: WaveSurferOptions) => {
  const containerRef: any = React.useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurfer = useWavesurfer(containerRef, props);

  const onPlayClick = useCallback(() => {
    wavesurfer!.isPlaying() ? wavesurfer!.pause() : wavesurfer!.play();
  }, [wavesurfer]);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
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

  return (
    <Stack m="md" bg="black">
      <div ref={containerRef} className="waveFormShower" />
      <Group align="center">
        <Button onClick={onPlayClick}>{isPlaying ? "Pause" : "Play"}</Button>
        <Text>Seconds played: {currentTime.toFixed(2)}</Text>
      </Group>
    </Stack>
  );
};

export default WaveSurferPlayer;
