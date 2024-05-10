import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  RefObject,
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
} from "@tabler/icons-react"
import PitchSlider from "./PitchSlider"
import { useDisclosure } from "@mantine/hooks"
import { useWavesurfer } from "./WaveSurferHook"
import RegionsPlugin, { Region } from "wavesurfer.js/dist/plugins/regions.js"

const BlankWaveSurfer: React.FC<WaveSurferOptions> = (props) => {
  const containerRef: RefObject<HTMLDivElement> =
    useRef() as RefObject<HTMLDivElement>
  const wavesurfer = useWavesurfer(containerRef, props)
  const [wsRegions, setWsRegions] = useState<RegionsPlugin | null>(null)
  const [savedRegions, setSavedRegions] = useState<Region[] | null>([])
  const theme = useMantineTheme()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [zoom, setZoom] = useState(11) // is dit niet updated?
  const [follow, { toggle: toggleFollow }] = useDisclosure(true)
  const [loop, setLoop] = useState<boolean>(false)
  const [activeRegion, setActiveRegion] = useState<Region | null>(null)
  const [cuePoint, setCuePoint] = useState<Region | null>(null)

  useEffect(() => {
    if (!wavesurfer) return
    setWsRegions(wavesurfer.registerPlugin(RegionsPlugin.create()))
  }, [wavesurfer])

  // WAVESURFER INIT
  useEffect(() => {
    if (!wavesurfer || !wsRegions) return
    // setCurrentTime(0)

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
      wavesurfer.on("zoom", (e) => {
        setZoom(e), setCurrentTime(currentTime)
      }),
    ]
    return () => {
      subscriptions.forEach((unsub) => unsub())
    }
  }, [currentTime, wavesurfer, wsRegions])

  useEffect(() => {
    if (wsRegions && wavesurfer) {
      const subscriptions = [
        wavesurfer.on("decode", () => {
          wsRegions.enableDragSelection({
            color: "rgba(255, 0, 0, 0.2)",
          })
          setCuePoint(
            wsRegions.addRegion({
              id: "CUE",
              start: 4.96,
              color: "orange",
            }),
          )
          const seekToPercentage =
            wsRegions.getRegions()[0].start /
            wavesurfer!.getDecodedData()!.duration
          wavesurfer?.seekTo(seekToPercentage)
        }),

        wavesurfer.on("ready", () => {
          const subscriptions = [
            wsRegions.on("region-double-clicked", (region: Region) => {
              if (region !== wsRegions.getRegions()[0]) region.remove()
              const newRegions = wsRegions.getRegions()
              setSavedRegions([...newRegions])
            }),

            wsRegions.on("region-created", () => {
              const newRegions = wsRegions.getRegions()
              setSavedRegions([...newRegions])
            }),
            wsRegions.on("region-updated", () => {
              console.log("region-updated")
              const updatedCuepoint = wsRegions.getRegions()[0]
              const seekToPercentage =
                updatedCuepoint!.start / wavesurfer!.getDecodedData()!.duration
              if (!wavesurfer.isPlaying()) wavesurfer?.seekTo(seekToPercentage)
            }),
          ]
          return () => {
            subscriptions.forEach((unsub) => unsub()) // TODO BETERE UNSUBS
          }
        }),
        wsRegions.on("region-in", (region: Region) => {
          setActiveRegion(region)
        }),
        wsRegions.on("region-out", (region: Region) => {
          if (region === cuePoint) {
            setActiveRegion(null)
            const seekToPercentage =
              cuePoint.start / wavesurfer.getDecodedData()!.duration
            wavesurfer.seekTo(seekToPercentage)
            //this is go to cue point and set active region to null
          } else if (loop === false) {
            //what is happening here hier gaat iets nog niet helemaal goed
            setActiveRegion(region ? region : null)
          } else if (loop === true) {
            region.play()
            // setActiveRegion(region)
          }
        }),
      ]
      return () => {
        subscriptions.forEach((unsub) => unsub()) // TODO BETERE UNSUBS
      }
    }
  }, [cuePoint, loop, wavesurfer, wsRegions])

  // FOLLOW
  useEffect(() => {
    wavesurfer?.setOptions({ autoScroll: follow })
  }, [follow, wavesurfer])

  // PLAY
  const onPlayClick = useCallback(() => {
    if (!wavesurfer) return
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer?.playPause()
  }, [wavesurfer])

  // CUE
  const onCueClick = (isDown: boolean) => {
    if (!cuePoint || !wavesurfer) return
    const seekToPercentage =
      cuePoint.start / wavesurfer!.getDecodedData()!.duration
    isDown
      ? cuePoint.play()
      : (wavesurfer.pause(), wavesurfer.seekTo(seekToPercentage))
  }

  // HOT CUE
  const onClickRegionPlay = (region: Region) => {
    if (!wavesurfer) return
    const seekToPercentage =
      region.start / wavesurfer.getDecodedData()!.duration
    wavesurfer.seekTo(seekToPercentage)
    wavesurfer.play()
    // setActiveRegion(region) //todo unnesesary
  }

  return (
    <Box>
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

      <Flex className="waveform-pitchfader">
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
            if (e > 0.07) wavesurfer!.setPlaybackRate(e, false)
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
          <ActionIcon onClick={onPlayClick} bg="gray">
            {!isPlaying ? <IconPlayerPlayFilled /> : <IconPlayerPauseFilled />}
          </ActionIcon>
          <ActionIcon
            onMouseDown={() => onCueClick(true)}
            onMouseUp={() => onCueClick(false)}
            bg="gray"
          >
            <IconCircle />
          </ActionIcon>
        </Group>
        <Stack>
          <Group>
            {savedRegions?.map(
              (region: Region, i) =>
                i > 0 && (
                  <Button
                    key={i}
                    color={theme.colors.yellow[9 - i]}
                    onClick={() => {
                      onClickRegionPlay(region)
                    }}
                  >
                    {i}
                  </Button>
                ),
            )}
          </Group>
        </Stack>
        <Group>
          <ActionIcon
            onClick={toggleFollow}
            bg="gray"
            c={follow ? "yellow" : ""}
          >
            <IconSquareRoundedChevronRight />
          </ActionIcon>
          <ActionIcon
            onClick={() => setLoop(!loop)}
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
  )
}

export default BlankWaveSurfer
