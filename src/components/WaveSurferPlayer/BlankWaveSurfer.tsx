import React, {
  useState,
  useEffect,
  useRef,
  RefObject,
  useMemo,
  memo,
  useCallback,
} from "react"
import { WaveSurferOptions } from "wavesurfer.js"
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Slider,
  Stack,
  Text,
  useMantineTheme,
  Alert,
  rem,
} from "@mantine/core"
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
  IconAlertCircle,
} from "@tabler/icons-react"
import { useDisclosure, useMove } from "@mantine/hooks"
import { useWavesurfer } from "./WaveSurferHook-Simple"
import RegionsPlugin, { Region } from "wavesurfer.js/dist/plugins/regions.js"
import { useWaveSurferState } from "./hooks/useWaveSurferState"
import { useRegionManagement } from "./hooks/useRegionManagement"
import { usePlayerControls } from "./hooks/usePlayerControls"

// Types
interface WaveSurferState {
  isPlaying: boolean
  currentTime: number
  zoom: number
  loop: boolean
  audioRate: number
  volume: number
}

interface BlankWaveSurferProps extends WaveSurferOptions {
  onRegionPlay?: (region: Region) => void
  onStateChange?: (state: WaveSurferState) => void
}

// Internal AudioRateSlider component
interface AudioRateSliderProps {
  changeAudioRate: (y: number) => void
  changeAudioRateEnd: (y: number) => void
  setAudioRateValue: (y: number) => void
  audioRateValue: number
}

const AudioRateSlider: React.FC<AudioRateSliderProps> = ({
  changeAudioRate,
  changeAudioRateEnd,
  setAudioRateValue,
  audioRateValue,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [localAudioRateValue, setLocalAudioRateValue] = useState(audioRateValue)
  const throttleRef = useRef<number | null>(null)
  const visualThrottleRef = useRef<number | null>(null)
  const lastValueRef = useRef(audioRateValue)

  // Sync local value with prop changes
  useEffect(() => {
    if (!isDragging) {
      setLocalAudioRateValue(audioRateValue)
    }
  }, [audioRateValue, isDragging])

  // Throttled audioRate change for smooth audio performance
  const throttledChangeAudioRate = useCallback(
    (value: number) => {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current)
      }

      throttleRef.current = setTimeout(() => {
        changeAudioRate(value)
      }, 16) // ~60fps throttling
    },
    [changeAudioRate],
  )

  // Throttled visual update for smooth UI performance
  const throttledSetAudioRateValue = useCallback(
    (value: number) => {
      if (visualThrottleRef.current) {
        clearTimeout(visualThrottleRef.current)
      }

      visualThrottleRef.current = setTimeout(() => {
        setAudioRateValue(value)
      }, 50) // Less frequent visual updates
    },
    [setAudioRateValue],
  )

  // Optimized setter with local state for immediate visual feedback
  const setter = useCallback(
    (y: number) => {
      const actualAudioRateValue = y * 1.9 + 0.1 // Map 0-1 to 0.1-2.0

      // Immediate local visual update (no re-render of parent)
      setLocalAudioRateValue(actualAudioRateValue)

      // Throttled audio update
      if (Math.abs(actualAudioRateValue - lastValueRef.current) > 0.01) {
        throttledChangeAudioRate(actualAudioRateValue)
        throttledSetAudioRateValue(actualAudioRateValue)
        lastValueRef.current = actualAudioRateValue
      }
    },
    [throttledChangeAudioRate, throttledSetAudioRateValue],
  )

  const { ref } = useMove(
    ({ y }) => {
      // Altijd reageren op move events voor betere responsiviteit
      setter(y)
    },
    {
      onScrubStart: () => setIsDragging(true),
      onScrubEnd: () => setIsDragging(false),
    },
  )

  // Handle drag start/end for better performance
  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    changeAudioRateEnd(audioRateValue)

    // Clear any pending throttled calls
    if (throttleRef.current) {
      clearTimeout(throttleRef.current)
      throttleRef.current = null
    }
  }, [audioRateValue, changeAudioRateEnd])

  const handleTouchStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    changeAudioRateEnd(audioRateValue)

    // Clear any pending throttled calls
    if (throttleRef.current) {
      clearTimeout(throttleRef.current)
      throttleRef.current = null
    }
  }, [audioRateValue, changeAudioRateEnd])

  // Clean up throttle on unmount
  useEffect(() => {
    return () => {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current)
      }
      if (visualThrottleRef.current) {
        clearTimeout(visualThrottleRef.current)
      }
    }
  }, [])

  // Convert audioRate value (0.1-2.0) to slider position (0-1)
  // Use localAudioRateValue during dragging for smoother visuals
  const displayValue = isDragging ? localAudioRateValue : audioRateValue
  const sliderPosition = (displayValue - 0.1) / 1.9

  return (
    <Stack bg="gray" p="sm" style={{ borderRadius: "6px" }}>
      <Group justify="center" p="" onDoubleClick={() => setter(0.47)}>
        <div
          ref={ref}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            width: rem(16),
            height: rem(120),
            backgroundColor: "orange",
            position: "relative",
            borderRadius: "3px",
            overflow: "hidden",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {/* Thumb */}
          <div
            style={{
              position: "absolute",
              top: `calc(${sliderPosition * 99}%)`,
              left: 0,
              width: rem(16),
              height: rem(4), // Maak thumb dikker voor betere zichtbaarheid
              backgroundColor: "white",
              borderRadius: "2px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              transition: isDragging ? "none" : "top 0.1s ease-out",
            }}
          />
        </div>
      </Group>
    </Stack>
  )
}

const BlankWaveSurfer: React.FC<BlankWaveSurferProps> = memo((props) => {
  const { onRegionPlay, onStateChange, ...wavesurferOptions } = props
  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  // Custom hooks for state management
  const {
    playerState,
    updatePlayerState,
    activeRegion,
    setActiveRegion,
    savedRegions,
    setSavedRegions,
    cuePoint,
    setCuePoint,
  } = useWaveSurferState(onStateChange)

  // Pass initial audioRate value to WaveSurfer
  const wavesurfer = useWavesurfer(containerRef, {
    ...wavesurferOptions,
    audioRate: playerState.audioRate, // Use current audioRate value as initial audioRate
  })

  const [wsRegions, setWsRegions] = useState<RegionsPlugin | null>(null)
  const theme = useMantineTheme()
  const [follow, { toggle: toggleFollow }] = useDisclosure(true)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [isAudioReady, setIsAudioReady] = useState(false)

  // Custom hooks for functionality
  const { onClickRegionPlay, onCueClick } = useRegionManagement(
    wavesurfer,
    wsRegions,
    cuePoint,
    playerState,
    setActiveRegion,
    setSavedRegions,
    setCuePoint,
    onRegionPlay,
  )

  const {
    onPlayClick,
    onZoomIn,
    onZoomOut,
    onVolumeChange,
    onZoomChange,
    onAudioRateChange,
    onAudioRateChangeEnd,
    toggleLoop,
  } = usePlayerControls(wavesurfer, playerState, updatePlayerState, follow)

  // Handle first user interaction for AudioContext
  const handleFirstInteraction = async () => {
    try {
      setAudioError(null)
      // Just clear any error, let WaveSurfer handle AudioContext automatically
    } catch (error) {
      setAudioError("Failed to initialize audio: " + (error as Error).message)
    }
  }

  // Test function to create regions
  const createTestRegions = () => {
    if (!wsRegions || !wavesurfer) return

    try {
      // Clear existing test regions first
      const existingRegions = wsRegions.getRegions()
      existingRegions.forEach((region) => {
        if (region.id && region.id.startsWith("test-")) {
          region.remove()
        }
      })

      // Create a few test regions
      const testRegions = [
        { start: 10, end: 15, color: "rgba(255, 255, 0, 0.3)" },
        { start: 20, end: 25, color: "rgba(0, 255, 0, 0.3)" },
        { start: 30, end: 35, color: "rgba(0, 0, 255, 0.3)" },
      ]

      testRegions.forEach((regionData, index) => {
        wsRegions.addRegion({
          id: `test-${index}`,
          start: regionData.start,
          end: regionData.end,
          color: regionData.color,
        })
      })

      // Update saved regions
      setSavedRegions([...wsRegions.getRegions()])
      console.log("Created test regions")
    } catch (error) {
      console.error("Error creating test regions:", error)
    }
  }

  // Handle audio loading
  useEffect(() => {
    if (!wavesurfer) return

    const handleLoad = () => {
      // Clear any previous errors on successful load
      setAudioError(null)
    }

    const unsubscribers = [wavesurfer.on("load", handleLoad)]

    return () => {
      unsubscribers.forEach((unsub) => unsub())
    }
  }, [wavesurfer])

  useEffect(() => {
    if (!wavesurfer) return
    setIsAudioReady(false)
    setWsRegions(wavesurfer.registerPlugin(RegionsPlugin.create()))
  }, [wavesurfer])

  // Apply zoom instantly when audio is ready - smooth and fluid like a princess deserves! 👑
  useEffect(() => {
    if (wavesurfer && isAudioReady) {
      try {
        wavesurfer.zoom(playerState.zoom)
      } catch (error) {
        console.error("Error applying zoom:", error)
      }
    }
  }, [playerState.zoom, wavesurfer, isAudioReady])

  // WAVESURFER INIT - memoized event handlers
  useEffect(() => {
    if (!wavesurfer || !wsRegions) return

    const handlePlay = () => updatePlayerState({ isPlaying: true })
    const handlePause = () => updatePlayerState({ isPlaying: false })
    const handleTimeUpdate = (currentTime: number) =>
      updatePlayerState({ currentTime })
    const handleZoom = (zoom: number) => updatePlayerState({ zoom })
    const handleReady = () => {
      setIsAudioReady(true)
      // Apply initial zoom when audio is ready
      if (playerState.zoom !== 11) {
        wavesurfer.zoom(playerState.zoom)
      }
    }

    const unsubscribers = [
      wavesurfer.on("play", handlePlay),
      wavesurfer.on("pause", handlePause),
      wavesurfer.on("timeupdate", handleTimeUpdate),
      wavesurfer.on("zoom", handleZoom),
      wavesurfer.on("ready", handleReady),
    ]

    return () => {
      unsubscribers.forEach((unsub) => unsub())
    }
  }, [updatePlayerState, wavesurfer, wsRegions, playerState.zoom])

  // Memoized components for better performance
  const regionButtons = useMemo(() => {
    console.log("Saved regions:", savedRegions.length, savedRegions) // Debug log

    if (savedRegions.length <= 1) return null

    return savedRegions
      .slice(1) // Skip cue point
      .map((region: Region, i) => (
        <Button
          key={region.id || `region-${i}`}
          color={theme.colors.yellow[Math.min(9 - (i + 1), 8)]}
          onClick={() => onClickRegionPlay(region)}
          size="sm"
          variant="filled"
          aria-label={`Play region ${i + 1}`}
        >
          {i + 1}
        </Button>
      ))
  }, [savedRegions, theme.colors.yellow, onClickRegionPlay])

  return (
    <Box>
      {/* Audio Error Alert */}
      {audioError && (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          color="yellow"
          mb="sm"
          variant="light"
          title="Audio System Notice"
          onClick={handleFirstInteraction}
          style={{ cursor: "pointer" }}
        >
          {audioError}
        </Alert>
      )}

      <Text fw={700}>Playing Region: {activeRegion?.id ?? "-"}</Text>
      <Group justify="space-around" grow>
        <Text>{playerState.currentTime.toFixed(2)}</Text>
        <Text>Vol:{playerState.volume.toFixed(2)}</Text>
        <Text visibleFrom="sm" c={follow ? "yellow" : ""}>
          Follow
        </Text>
        <Text visibleFrom="sm" c={playerState.loop ? "yellow" : ""}>
          Loop
        </Text>
        <Text>Zoom:{playerState.zoom.toFixed()}</Text>
        <Text>AudioRate:{((playerState.audioRate - 1) * 100).toFixed(0)}%</Text>
      </Group>

      <Flex className="waveform-audioratefader">
        <div
          className="waveform-canvas"
          ref={containerRef}
          style={{
            width: "calc(100% - 40px)",
            height: "144px",
            overflow: "hidden",
          }}
        />
        <AudioRateSlider
          changeAudioRate={onAudioRateChange}
          changeAudioRateEnd={onAudioRateChangeEnd}
          setAudioRateValue={(value) => updatePlayerState({ audioRate: value })}
          audioRateValue={playerState.audioRate}
        />
      </Flex>

      <Group
        className="play-pause"
        py="xs"
        justify="space-between"
        align="flex-start"
      >
        <Group>
          <ActionIcon
            onClick={onPlayClick}
            bg="gray"
            aria-label={playerState.isPlaying ? "Pause audio" : "Play audio"}
          >
            {!playerState.isPlaying ? (
              <IconPlayerPlayFilled />
            ) : (
              <IconPlayerPauseFilled />
            )}
          </ActionIcon>
          <ActionIcon
            onMouseDown={() => onCueClick(true)}
            onMouseUp={() => onCueClick(false)}
            bg="gray"
            aria-label="Cue point"
          >
            <IconCircle />
          </ActionIcon>
        </Group>

        <Stack>
          <Text size="sm" c="dimmed">
            Hot Cues
          </Text>
          <Group>
            {regionButtons}
            {savedRegions.length <= 1 && (
              <Text size="xs" c="dimmed">
                Create regions by dragging on the waveform
              </Text>
            )}
            {/* Test button to create regions - only show if no regions exist */}
            {savedRegions.length <= 1 && (
              <Button
                size="xs"
                variant="outline"
                onClick={createTestRegions}
                disabled={!wsRegions || !wavesurfer}
              >
                Create Test Regions
              </Button>
            )}
          </Group>
          {/* Debug info */}
          <Text size="xs" c="dimmed">
            Regions: {savedRegions.length - 1} | Ready:{" "}
            {isAudioReady ? "Yes" : "No"}
          </Text>
        </Stack>

        <Group>
          <ActionIcon
            onClick={toggleFollow}
            bg="gray"
            c={follow ? "yellow" : ""}
            aria-label={follow ? "Disable follow" : "Enable follow"}
          >
            <IconSquareRoundedChevronRight />
          </ActionIcon>
          <ActionIcon
            onClick={toggleLoop}
            bg="gray"
            c={playerState.loop ? "yellow" : ""}
            aria-label={playerState.loop ? "Disable loop" : "Enable loop"}
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
            value={playerState.volume}
            onChange={onVolumeChange}
            size="lg"
            showLabelOnHover={false}
            aria-label="Volume"
          />
          <IconVolume />
        </Group>

        <Group justify="flex-end">
          <IconZoomOut onClick={onZoomOut} style={{ cursor: "pointer" }} />
          <Slider
            p="0"
            w="30%"
            min={10}
            max={300}
            color="orange"
            value={playerState.zoom}
            onChange={onZoomChange}
            size="lg"
            showLabelOnHover={false}
            aria-label="Zoom"
          />
          <IconZoomIn onClick={onZoomIn} style={{ cursor: "pointer" }} />
        </Group>
      </Group>
    </Box>
  )
})

export default BlankWaveSurfer
