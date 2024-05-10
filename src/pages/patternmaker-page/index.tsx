import React, { useEffect, useState } from "react"
import PatternMaker from "./components/PatternMaker"
import {
  selectedPatternSelector,
  soundSettingsSelector,
} from "../../store/patternmaker/selectors"
import { useSelector } from "react-redux"
import SelectSound from "./components/SelectSound"
import { useDispatch } from "react-redux"
import {
  SetTempo,
  SetVolume,
  SetFilters,
} from "../../store/patternmaker/actions"
import * as Tone from "tone"
import SelectPattern from "./components/SelectPattern"
import {
  Group,
  Title,
  Box,
  Stack,
  Center,
  Flex,
  Container,
} from "@mantine/core"
import CustomDoubleSlider from "./components/CustomDoubleSlider"
import CustomSlider from "./components/CustomSlider"
import TransporterButton from "./components/TransporterButton"
import P5WaveFormSketchWrapper from "./components/P5WaveFormSketchWrapper"
import DrawerComponent from "../../components/drawer/Drawer"
import Uitleg from "./uitleg"

const output = new Tone.Volume(-12).toDestination()
const lpFilter = new Tone.Filter(8000, "lowpass", -48).connect(output)
const hpFilter = new Tone.Filter(0, "highpass").connect(lpFilter)

const PatternMakerPage: React.FC = () => {
  const dispatch = useDispatch()
  const currentPattern = useSelector(selectedPatternSelector)
  const soundSettings = useSelector(soundSettingsSelector)
  const [colorValue, setColor] = useState<string>(currentPattern.color)
  const [titleValue, setTitleValue] = useState<string>(currentPattern.name)

  useEffect(() => {
    setColor(currentPattern.color)
  }, [currentPattern])

  useEffect(() => {
    setTitleValue(currentPattern.name)
  }, [currentPattern.name])

  const sendVolume = (value: number) => {
    dispatch(SetVolume(value))
  }

  useEffect(() => {
    output.volume.value = soundSettings.volume
  }, [soundSettings.volume])

  const sendFilters = (value: [number, number]) => {
    dispatch(SetFilters(value))
    lpFilter.frequency.value = value[1]
    hpFilter.frequency.value = value[0]
  }

  const sendTempo = (value: number) => {
    Tone.Transport.bpm.value = value
    dispatch(SetTempo(Tone.Transport.bpm.value))
  }

  return (
    <Container p={0} h="calc(100vh - 120px)">
      <DrawerComponent uitleg={Uitleg()} />
      <Center
        left={0}
        pos="absolute"
        h="calc(100vh - 120px)"
        style={{ transform: "translate(0px ,-2px )", zIndex: -20 }}
      >
        <P5WaveFormSketchWrapper colorValue={colorValue} />
      </Center>
      <Box
        p={0}
        style={{
          position: "relative",
          height: "calc(100vh - 120px)",
        }}
      >
        <Container
          pos="absolute"
          h="calc(100vh - 120px)"
          top={0}
          w="100%"
          style={{ zIndex: 0 }}
        >
          <Flex
            h="100%"
            align="center"
            justify="center"
            style={{
              transform: "translate(0px ,-5px )",
            }}
          >
            <PatternMaker output={hpFilter} colorValue={colorValue} />
          </Flex>
        </Container>

        <Stack w="100%" h="50%" justify="flex-start" pt="md">
          <Group justify="space-between" align="flex-start" px="md">
            <SelectSound
              color={colorValue}
              currentSound={currentPattern.sound}
            />

            <Stack>
              <Title pos="relative" size="h4" c={colorValue}>
                {titleValue}
              </Title>
              <Group justify="center">
                <TransporterButton color={colorValue} />
              </Group>
            </Stack>

            <SelectPattern
              setColor={setColor}
              color={colorValue}
              titleValue={titleValue}
              setTitleValue={setTitleValue}
            />
          </Group>
        </Stack>

        <Stack w="100%" h="50%" px="md" justify="flex-end" align="stretch">
          <Box>
            <CustomSlider
              min={-40}
              max={0}
              label={"Volume"}
              valueLabel={"dB"}
              color={colorValue}
              sendValue={sendVolume}
              initValue={soundSettings.volume}
            />
            <CustomDoubleSlider
              min={0}
              max={8000}
              label={["HPFilter", "LPFilter"]}
              valueLabel={"Hz"}
              color={colorValue}
              sendValue={sendFilters}
              initValue={soundSettings.filtersAmount}
            />
            <CustomSlider
              min={80}
              max={400}
              label={"Tempo"}
              valueLabel={"BPM"}
              color={colorValue}
              sendValue={sendTempo}
              initValue={soundSettings.tempo}
            />
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}

export default PatternMakerPage
