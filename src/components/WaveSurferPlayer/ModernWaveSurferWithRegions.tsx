import React, { useState, useCallback, useMemo, useEffect } from "react"
import WavesurferPlayer from "@wavesurfer/react"
import type WaveSurfer from "wavesurfer.js"
import RegionsPlugin, { Region } from "wavesurfer.js/dist/plugins/regions.js"
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Slider,
  Stack,
  Text,
  useMantineTheme,
  Alert,
  Badge,
  TextInput,
  Menu,
  Card,
} from "@mantine/core"
import {
  IconZoomIn,
  IconZoomOut,
  IconRepeat,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconVolume3,
  IconVolume,
  IconAlertCircle,
  IconSquareRoundedPlus,
  IconTrash,
  IconEdit,
  IconPlayerPlay,
  IconDotsVertical,
  IconSquareRoundedChevronRight,
} from "@tabler/icons-react"

interface RegionData {
  id: string
  start: number
  end: number
  color?: string
  content?: string
  label?: string
}

interface ModernWaveSurferWithRegionsProps {
  audioUrl: string
  height?: number
  waveColor?: string
  progressColor?: string
  cursorColor?: string
  showControls?: boolean
  showVolumeControl?: boolean
  showZoomControls?: boolean
  showLoopControl?: boolean
  showRegionControls?: boolean
  onReady?: (wavesurfer: WaveSurfer) => void
  onPlay?: () => void
  onPause?: () => void
  onFinish?: () => void
  onSeek?: (currentTime: number) => void
  onError?: (error: string) => void
  onRegionCreated?: (region: Region) => void
  onRegionUpdated?: (region: Region) => void
  onRegionDeleted?: (region: Region) => void
}

export const ModernWaveSurferWithRegions: React.FC<
  ModernWaveSurferWithRegionsProps
> = ({
  audioUrl,
  height = 144,
  waveColor = "#1976d2",
  progressColor = "#1976d2",
  cursorColor = "#1976d2",
  onReady,
  onPlay,
  onPause,
  onFinish,
  onSeek,
  onError,
  onRegionCreated,
  onRegionUpdated,
  onRegionDeleted,
}) => {
  // Follow state (like BlankWaveSurfer)
  const [follow, setFollow] = useState(true)
  const theme = useMantineTheme()
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)
  // Auto-follow: gebruik WaveSurfer's eigen autoScroll/autoCenter opties zoals in BlankWaveSurfer
  useEffect(() => {
    if (wavesurfer) {
      try {
        wavesurfer.setOptions({ autoScroll: follow, autoCenter: follow })
      } catch {
        // ignore
      }
    }
  }, [wavesurfer, follow])
  // ...existing code...
  const [regionsPlugin, setRegionsPlugin] = useState<RegionsPlugin | null>(null)
  // Cue point state for cue region logic
  const [cuePoint, setCuePoint] = useState<Region | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [loop, setLoop] = useState(false)
  const [pitch, setPitch] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [regions, setRegions] = useState<RegionData[]>([])
  const [editingRegion, setEditingRegion] = useState<string | null>(null)
  const [newRegionLabel, setNewRegionLabel] = useState("")
  const [isCreatingRegion, setIsCreatingRegion] = useState(false)
  const [activeRegion, setActiveRegion] = useState<Region | null>(null)

  const regionColors = useMemo(
    () => [
      "rgba(255, 107, 107, 0.3)", // Red with opacity
      "rgba(78, 205, 196, 0.3)", // Teal with opacity
      "rgba(69, 183, 209, 0.3)", // Blue with opacity
      "rgba(150, 206, 180, 0.3)", // Green with opacity
      "rgba(254, 202, 87, 0.3)", // Yellow with opacity
      "rgba(255, 159, 243, 0.3)", // Pink with opacity
      "rgba(84, 160, 255, 0.3)", // Light blue with opacity
      "rgba(95, 39, 205, 0.3)", // Purple with opacity
      "rgba(0, 210, 211, 0.3)", // Cyan with opacity
      "rgba(255, 159, 67, 0.3)", // Orange with opacity
    ],
    [],
  )

  const getRandomColor = useCallback(() => {
    return regionColors[Math.floor(Math.random() * regionColors.length)]
  }, [regionColors])

  const getRegionContent = useCallback((region: Region): string => {
    if (typeof region.content === "string") {
      return region.content
    } else if (region.content && region.content.textContent) {
      return region.content.textContent
    }
    return ""
  }, [])

  const onWavesurferReady = useCallback(
    (ws: WaveSurfer) => {
      setWavesurfer(ws)
      setDuration(ws.getDuration())
      setError(null)

      // Initialize regions plugin
      const regions = ws.registerPlugin(RegionsPlugin.create())
      setRegionsPlugin(regions)

      // --- CUE POINT LOGIC ---
      // Add a default cue region at 4.96s if not present (like useRegionManagement)
      const existingCue = regions.getRegions().find((r) => r.id === "CUE")
      if (!existingCue) {
        const cueRegion = regions.addRegion({
          id: "CUE",
          start: 4.96,
          color: "orange",
        })
        setCuePoint && setCuePoint(cueRegion)
        console.log("Created cue region:", cueRegion)
      } else {
        setCuePoint && setCuePoint(existingCue)
      }

      // Set up region event listeners
      regions.on("region-created", (region: Region) => {
        const content = getRegionContent(region)
        const regionData: RegionData = {
          id: region.id,
          start: region.start,
          end: region.end,
          color: region.color,
          content: content,
          label: content || `Region ${regions.getRegions().length}`,
        }
        setRegions((prev) => [...prev, regionData])
        onRegionCreated?.(region)
        if (region.id === "CUE" && setCuePoint) setCuePoint(region)
      })

      regions.on("region-updated", (region: Region) => {
        const content = getRegionContent(region)
        setRegions((prev) =>
          prev.map((r) =>
            r.id === region.id
              ? { ...r, start: region.start, end: region.end, content: content }
              : r,
          ),
        )
        onRegionUpdated?.(region)
        if (region.id === "CUE" && setCuePoint) setCuePoint(region)
      })

      regions.on("region-removed", (region: Region) => {
        setRegions((prev) => prev.filter((r) => r.id !== region.id))
        onRegionDeleted?.(region)
        if (region.id === "CUE" && setCuePoint) setCuePoint(null)
      })

      regions.on("region-clicked", (region: Region) => {
        setActiveRegion(region)
        ws.setTime(region.start)
        ws.play()
      })

      // Add double-click event handler for regions to delete them (except cue)
      regions.on("region-double-clicked", (region: Region) => {
        if (region.id !== "CUE") region.remove()
      })

      // Add double-click event handler for waveform to create regions
      ws.on("dblclick", (relativeX: number) => {
        const duration = ws.getDuration()
        const clickTime = relativeX * duration
        const regionStart = Math.max(0, clickTime - 1) // Start 1 second before click
        const regionEnd = Math.min(duration, clickTime + 1) // End 1 second after click

        regions.addRegion({
          start: regionStart,
          end: regionEnd,
          color: getRandomColor(),
          content: `Region ${regions.getRegions().length + 1}`,
          resize: true,
          drag: true,
        })
      })

      // Set initial pitch if not default
      if (pitch !== 1) {
        ws.setPlaybackRate(pitch, false)
      }

      onReady?.(ws)
    },
    [
      onReady,
      onRegionCreated,
      onRegionUpdated,
      onRegionDeleted,
      getRegionContent,
      getRandomColor,
      pitch,
    ],
  )

  const onWavesurferPlay = useCallback(() => {
    setIsPlaying(true)
    onPlay?.()
  }, [onPlay])

  const onWavesurferPause = useCallback(() => {
    setIsPlaying(false)
    onPause?.()
  }, [onPause])

  const onWavesurferFinish = useCallback(() => {
    setIsPlaying(false)
    if (loop && wavesurfer) {
      // If loop is enabled and we have an active region, loop the region
      if (activeRegion) {
        wavesurfer.setTime(activeRegion.start)
        wavesurfer.play()
      } else {
        // If no active region, loop the entire track
        wavesurfer.play()
      }
    }
    onFinish?.()
  }, [loop, wavesurfer, activeRegion, onFinish])

  const onWavesurferTimeupdate = useCallback(
    (_ws: WaveSurfer, currentTime: number) => {
      setCurrentTime(currentTime)
      onSeek?.(currentTime)
    },
    [onSeek],
  )

  const onWavesurferError = useCallback(
    (_ws: WaveSurfer, error: Error) => {
      const errorMessage = error?.message || "Failed to load audio"
      setError(errorMessage)
      onError?.(errorMessage)
    },
    [onError],
  )

  const handlePlayPause = useCallback(() => {
    if (wavesurfer) {
      // If we're starting to play and no region is active, clear activeRegion
      if (!isPlaying) {
        const currentTime = wavesurfer.getCurrentTime()
        // Check if we're clicking outside of any region
        const clickedRegion = regionsPlugin
          ?.getRegions()
          .find(
            (region) =>
              currentTime >= region.start && currentTime <= region.end,
          )
        if (!clickedRegion) {
          setActiveRegion(null)
        }
      }
      wavesurfer.playPause()
    }
  }, [wavesurfer, isPlaying, regionsPlugin])

  const handleVolumeChange = useCallback(
    (newVolume: number) => {
      setVolume(newVolume)
      if (wavesurfer) {
        wavesurfer.setVolume(newVolume)
      }
    },
    [wavesurfer],
  )

  const handleZoomChange = useCallback(
    (newZoom: number) => {
      setZoom(newZoom)
      if (wavesurfer) {
        wavesurfer.zoom(newZoom)
      }
    },
    [wavesurfer],
  )

  const handleLoopToggle = useCallback(() => {
    setLoop(!loop)
  }, [loop])

  const handlePitchChange = useCallback(
    (newPitch: number) => {
      setPitch(newPitch)
      if (wavesurfer) {
        wavesurfer.setPlaybackRate(newPitch, false)
        // Force UI update after drastic rate change for smooth cursor
        setCurrentTime(wavesurfer.getCurrentTime())
        // If looping a region, keep cursor inside region after pitch change
        if (loop && activeRegion && isPlaying) {
          const t = wavesurfer.getCurrentTime()
          if (t < activeRegion.start || t >= activeRegion.end) {
            wavesurfer.setTime(activeRegion.start)
            wavesurfer.play()
          }
        }
      }
    },
    [wavesurfer, loop, activeRegion, isPlaying],
  )

  // Hotcue/region play: direct, snappy, en met robuuste loop-lock
  // Gebruik een module-scope variable voor de lock (geen window property nodig)
  // Module-scope lock for hotcue/loop race condition
  // Nu met counter zodat meerdere timeupdates worden geblokkeerd na een jump
  // Region jump lock (module scope, but useRef for React safety)
  const regionJumpLockCount = React.useRef(0)
  const setRegionJumpLock = (count: number) => {
    regionJumpLockCount.current = count
  }
  const decRegionJumpLock = () => {
    if (regionJumpLockCount.current > 0) regionJumpLockCount.current--
  }
  const getRegionJumpLock = () => {
    return regionJumpLockCount.current > 0
  }

  // Gebruik useCallback zodat handlePlayRegion stabiel blijft voor useMemo
  const handlePlayRegion = useCallback(
    (regionId: string) => {
      if (!regionsPlugin || !wavesurfer) return

      const region = regionsPlugin.getRegions().find((r) => r.id === regionId)
      if (region) {
        // Blokkeer 2 timeupdates na een jump (kan evt. naar 3 als nodig)
        setRegionJumpLock(2)
        wavesurfer.setTime(region.start)
        wavesurfer.play()
        setActiveRegion(region)
      }
    },
    [regionsPlugin, wavesurfer],
  )

  // Enhanced time tracking with region loop
  // Loop/region loop: altijd region loopen, maar onderdruk race condition met lock
  useEffect(() => {
    if (!wavesurfer) return
    const handleTimeUpdate = (currentTime: number) => {
      setCurrentTime(currentTime)
      onSeek?.(currentTime)
      if (getRegionJumpLock()) {
        decRegionJumpLock()
        return
      }
      if (loop && activeRegion && isPlaying) {
        if (
          currentTime < activeRegion.start ||
          currentTime >= activeRegion.end
        ) {
          wavesurfer.setTime(activeRegion.start)
          wavesurfer.play()
        }
      } else if (loop && !activeRegion && isPlaying) {
        if (currentTime >= duration) {
          wavesurfer.setTime(0)
          wavesurfer.play()
        }
      }
    }
    wavesurfer.on("timeupdate", handleTimeUpdate)
    return () => {
      wavesurfer.un("timeupdate", handleTimeUpdate)
    }
  }, [wavesurfer, loop, activeRegion, isPlaying, onSeek, duration])

  // Region buttons (orange style from original)
  const regionButtons = useMemo(() => {
    if (regions.length === 0) return null

    return regions.map((regionData, i) => {
      const region = regionsPlugin
        ?.getRegions()
        .find((r) => r.id === regionData.id)
      if (!region) return null

      return (
        <Button
          key={region.id}
          color="orange"
          onClick={() => handlePlayRegion(region.id)}
          size="sm"
          variant="filled"
          style={{
            backgroundColor: theme.colors.orange?.[6 + (i % 3)] || `orange`,
            marginRight: 4,
          }}
        >
          {i + 1}
        </Button>
      )
    })
  }, [regions, regionsPlugin, theme.colors.orange, handlePlayRegion])

  const handleCreateRegion = useCallback(() => {
    if (!regionsPlugin || !wavesurfer) return

    const start = currentTime
    const end = Math.min(start + 5, duration) // 5 second region or until end of track // dit zouden we ook op BPM kunnen doen

    regionsPlugin.addRegion({
      start,
      end,
      color: getRandomColor(),
      content: newRegionLabel || `Region ${regions.length + 1}`,
      resize: true,
      drag: true,
    })

    setNewRegionLabel("")
    setIsCreatingRegion(false)
  }, [
    regionsPlugin,
    wavesurfer,
    currentTime,
    duration,
    newRegionLabel,
    regions.length,
    getRandomColor,
  ])

  const handleDeleteRegion = useCallback(
    (regionId: string) => {
      if (!regionsPlugin) return

      const region = regionsPlugin.getRegions().find((r) => r.id === regionId)
      if (region) {
        region.remove()
      }
    },
    [regionsPlugin],
  )

  const handleEditRegion = useCallback(
    (regionId: string, newLabel: string) => {
      if (!regionsPlugin) return

      const region = regionsPlugin.getRegions().find((r) => r.id === regionId)
      if (region) {
        region.setContent(newLabel)
        setEditingRegion(null)
      }
    },
    [regionsPlugin],
  )

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  // --- CUE BUTTON LOGIC (Pioneer CDJ/BlankWaveSurfer style) ---
  // Track cue button state
  const [cueButtonHeld, setCueButtonHeld] = useState(false)
  // Used to restore play state after cue release
  const cueWasPlaying = React.useRef(false)

  // Handler for cue button down (mouse/touch)
  const handleCueDown = useCallback(() => {
    if (!wavesurfer || !cuePoint) return
    cueWasPlaying.current = isPlaying
    // Always jump to cue and play from there
    wavesurfer.setTime(cuePoint.start)
    wavesurfer.play()
    setActiveRegion(cuePoint)
    setCueButtonHeld(true)
  }, [wavesurfer, cuePoint, isPlaying])

  // Handler for cue button up (mouse/touch)
  const handleCueUp = useCallback(() => {
    if (!wavesurfer || !cuePoint) return
    wavesurfer.pause()
    wavesurfer.setTime(cuePoint.start)
    setActiveRegion(cuePoint)
    setCueButtonHeld(false)
  }, [wavesurfer, cuePoint])

  // Keyboard support for cue (spacebar or C)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === "KeyC" || e.code === "Space") && !cueButtonHeld) {
        handleCueDown()
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      if ((e.code === "KeyC" || e.code === "Space") && cueButtonHeld) {
        handleCueUp()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [cueButtonHeld, handleCueDown, handleCueUp])

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Audio Error"
        color="red"
        variant="light"
      >
        {error}
      </Alert>
    )
  }

  return (
    <Stack gap="md">
      {/* Info bar boven de player */}
      <Group justify="space-between" align="center">
        <Text fw={700}>Playing Region: {activeRegion?.id ?? "-"}</Text>
        <Group justify="space-around" gap="xs">
          <Text size="sm">{formatTime(currentTime)}</Text>
          <Text size="sm">Vol: {volume.toFixed(2)}</Text>
          <Text size="sm" c={follow ? "yellow" : undefined}>
            Follow
          </Text>
          <Text size="sm" c={loop ? "yellow" : undefined}>
            Loop
          </Text>
          <Text size="sm">Zoom: {zoom.toFixed()}</Text>
          <Text size="sm">Pitch: {((pitch - 1) * 100).toFixed(0)}%</Text>
        </Group>
      </Group>

      <Box style={{ width: "100%", overflowX: "hidden", overflowY: "visible" }}>
        <WavesurferPlayer
          height={height}
          waveColor={waveColor}
          progressColor={progressColor}
          cursorColor={cursorColor}
          url={audioUrl}
          onReady={onWavesurferReady}
          onPlay={onWavesurferPlay}
          onPause={onWavesurferPause}
          onFinish={onWavesurferFinish}
          onTimeupdate={onWavesurferTimeupdate}
          onError={onWavesurferError}
          normalize={true}
          backend="WebAudio"
          hideScrollbar={true}
        />
      </Box>

      <Group justify="space-between" align="center">
        <Group gap="sm">
          <ActionIcon
            onClick={handlePlayPause}
            disabled={!wavesurfer}
            variant="filled"
            size="lg"
            color={theme.primaryColor}
          >
            {isPlaying ? (
              <IconPlayerPauseFilled size={20} />
            ) : (
              <IconPlayerPlayFilled size={20} />
            )}
          </ActionIcon>

          {/* --- CUE BUTTON --- */}
          <Button
            color="orange"
            size="lg"
            variant={cueButtonHeld ? "filled" : "outline"}
            style={{ fontWeight: 700, minWidth: 60 }}
            disabled={!wavesurfer || !cuePoint}
            onMouseDown={handleCueDown}
            onMouseUp={handleCueUp}
            onMouseLeave={() => cueButtonHeld && handleCueUp()}
            onTouchStart={handleCueDown}
            onTouchEnd={handleCueUp}
            tabIndex={0}
            aria-pressed={cueButtonHeld}
            title="Cue (hold to play from cue, release to return)"
          >
            Cue
          </Button>

          <ActionIcon
            onClick={() => setFollow((f) => !f)}
            variant={follow ? "filled" : "subtle"}
            size="lg"
            color={follow ? "yellow" : theme.primaryColor}
            title={follow ? "Disable follow" : "Enable follow"}
            aria-label={follow ? "Disable follow" : "Enable follow"}
          >
            <IconSquareRoundedChevronRight size={20} />
          </ActionIcon>

          <ActionIcon
            onClick={handleLoopToggle}
            disabled={!wavesurfer}
            variant={loop ? "filled" : "outline"}
            size="lg"
            color={theme.primaryColor}
          >
            <IconRepeat size={20} />
          </ActionIcon>
          <Text size="sm" c="dimmed">
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
        </Group>

        <Group gap="md">
          <Group gap="xs" style={{ minWidth: 120 }}>
            <ActionIcon variant="subtle" size="sm">
              {volume > 0.5 ? (
                <IconVolume3 size={16} />
              ) : (
                <IconVolume size={16} />
              )}
            </ActionIcon>
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={1}
              step={0.1}
              style={{ flex: 1 }}
              size="sm"
            />
          </Group>

          <Group gap="xs" style={{ minWidth: 120 }}>
            <ActionIcon
              onClick={() => handleZoomChange(Math.max(1, zoom - 10))}
              disabled={!wavesurfer || zoom <= 1}
              variant="subtle"
              size="sm"
            >
              <IconZoomOut size={16} />
            </ActionIcon>
            <Slider
              value={zoom}
              onChange={handleZoomChange}
              min={1}
              max={200}
              step={10}
              style={{ flex: 1 }}
              size="sm"
            />
            <ActionIcon
              onClick={() => handleZoomChange(Math.min(200, zoom + 10))}
              disabled={!wavesurfer || zoom >= 200}
              variant="subtle"
              size="sm"
            >
              <IconZoomIn size={16} />
            </ActionIcon>
          </Group>

          {/* Pitch Control */}

          <Group gap="xs" style={{ minWidth: 150 }}>
            <Text size="xs" c="dimmed">
              Pitch
            </Text>
            <Slider
              value={pitch}
              onChange={handlePitchChange}
              min={0.1}
              max={2.0}
              step={0.01}
              style={{ flex: 1 }}
              size="sm"
            />
            <ActionIcon
              onClick={() => handlePitchChange(1.0)}
              variant="subtle"
              size="sm"
              title="Reset pitch to 1.0x"
            >
              <Text size="xs" c="dimmed">
                {pitch.toFixed(1)}x
              </Text>
            </ActionIcon>
          </Group>
        </Group>
      </Group>

      <Group gap="xs">{regionButtons}</Group>
      <Card withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Text fw={500}>Regions/Segments</Text>
            <Group gap="xs">
              {!isCreatingRegion ? (
                <Button
                  size="sm"
                  leftSection={<IconSquareRoundedPlus size={16} />}
                  onClick={() => setIsCreatingRegion(true)}
                  disabled={!wavesurfer}
                >
                  Add Region
                </Button>
              ) : (
                <Group gap="xs">
                  <TextInput
                    placeholder="Region name"
                    value={newRegionLabel}
                    onChange={(e) => setNewRegionLabel(e.target.value)}
                    size="sm"
                  />
                  <Button size="sm" onClick={handleCreateRegion}>
                    Create
                  </Button>
                  <Button
                    size="sm"
                    variant="subtle"
                    onClick={() => {
                      setIsCreatingRegion(false)
                      setNewRegionLabel("")
                    }}
                  >
                    Cancel
                  </Button>
                </Group>
              )}
            </Group>
          </Group>

          {/* Orange Region Buttons */}

          {regions.length === 0 ? (
            <Text size="sm" c="dimmed" ta="center" py="md">
              No regions created yet. Add regions to create segments in your
              audio.
            </Text>
          ) : (
            <Stack gap="xs">
              {regions.map((region) => (
                <Card key={region.id} withBorder p="xs">
                  <Group justify="space-between" align="center">
                    <Group gap="sm">
                      <Badge color={region.color} variant="light" size="sm">
                        {formatTime(region.start)} - {formatTime(region.end)}
                      </Badge>
                      {editingRegion === region.id ? (
                        <TextInput
                          size="xs"
                          defaultValue={region.label}
                          onBlur={(e) =>
                            handleEditRegion(region.id, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleEditRegion(region.id, e.currentTarget.value)
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <Text size="sm" fw={500}>
                          {region.label}
                        </Text>
                      )}
                    </Group>
                    <Group gap="xs">
                      <ActionIcon
                        size="sm"
                        variant="subtle"
                        onClick={() => handlePlayRegion(region.id)}
                      >
                        <IconPlayerPlay size={14} />
                      </ActionIcon>
                      <Menu>
                        <Menu.Target>
                          <ActionIcon size="sm" variant="subtle">
                            <IconDotsVertical size={14} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={<IconEdit size={14} />}
                            onClick={() => setEditingRegion(region.id)}
                          >
                            Edit
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconTrash size={14} />}
                            color="red"
                            onClick={() => handleDeleteRegion(region.id)}
                          >
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Group>
                </Card>
              ))}
            </Stack>
          )}
        </Stack>
      </Card>
    </Stack>
  )
}

export default ModernWaveSurferWithRegions
