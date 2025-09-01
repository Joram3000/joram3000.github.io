import React from "react"
import { ActionIcon, Box, Group, Text } from "@mantine/core"
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react"
import { useModernWaveSurfer } from "./hooks/useModernWaveSurfer"

interface SimpleWaveSurferProps {
  audioUrl: string
  waveColor?: string
  progressColor?: string
  height?: number
}

export const SimpleWaveSurfer: React.FC<SimpleWaveSurferProps> = ({
  audioUrl,
  waveColor = "#1976d2",
  progressColor = "#1971c2",
  height = 80,
}) => {
  const { containerRef, wavesurfer, isReady, isPlaying, currentTime } =
    useModernWaveSurfer({
      url: audioUrl,
      waveColor,
      progressColor,
      height,
      onReady: (ws) => {
        console.log("WaveSurfer ready:", ws)
      },
      onPlay: () => {
        console.log("Playing")
      },
      onPause: () => {
        console.log("Paused")
      },
      onError: (error) => {
        console.error("Error:", error)
      },
    })

  const handlePlayPause = () => {
    if (wavesurfer && isReady) {
      wavesurfer.playPause()
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Box>
      <div ref={containerRef} style={{ marginBottom: "1rem" }} />
      <Group justify="space-between" align="center">
        <ActionIcon
          onClick={handlePlayPause}
          disabled={!isReady}
          variant="filled"
          size="lg"
        >
          {isPlaying ? (
            <IconPlayerPauseFilled size={20} />
          ) : (
            <IconPlayerPlayFilled size={20} />
          )}
        </ActionIcon>
        <Text size="sm" c="dimmed">
          {formatTime(currentTime)}
        </Text>
      </Group>
    </Box>
  )
}

export default SimpleWaveSurfer
