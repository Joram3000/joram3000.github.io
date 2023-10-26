import React, { useEffect } from "react";
import PatternMaker from "./components/PatternMaker";
import {
  SelectedPattern,
  SoundSettings,
} from "../../store/patternMakerState/selectors";
import { useSelector } from "react-redux";
import SelectSound from "./components/SelectSound";
import { useDispatch } from "react-redux";
import {
  SetTempo,
  SetVolume,
  SetFilters,
} from "../../store/patternMakerState/actions";
import * as Tone from "tone";
import SelectPattern from "./components/SelectPattern";
import {
  Group,
  Title,
  Box,
  Stack,
  Center,
  Flex,
  Container,
} from "@mantine/core";
import "./style.css";
import { P5CanvasDynamic } from "../../components/P5/P5CanvasDynamic";
import CustomDoubleSlider from "./components/CustomDoubleSlider";
import CustomSlider from "./components/CustomSlider";
import TransporterButton from "./components/TransporterButton";
import { isMobile } from "react-device-detect";

const output = new Tone.Volume(-12).toDestination();
const lpFilter = new Tone.Filter(8000, "lowpass", -48).connect(output);
const hpFilter = new Tone.Filter(0, "highpass").connect(lpFilter);

const PatternMakerPage: React.FC = () => {
  const dispatch = useDispatch();
  const currentPattern = useSelector(SelectedPattern);
  const soundSettings = useSelector(SoundSettings);

  const sendVolume = (waarde: number) => {
    dispatch(SetVolume(waarde));
  };

  const sendFilters = (waarde: [number, number]) => {
    dispatch(SetFilters(waarde));
    lpFilter.frequency.value = waarde[1];
    hpFilter.frequency.value = waarde[0];
  };

  const sendTempo = (waarde: number) => {
    Tone.Transport.bpm.value = waarde;
    dispatch(SetTempo(Tone.Transport.bpm.value));
  };

  useEffect(() => {
    output.volume.value = soundSettings.volume;
  }, [soundSettings.volume]);

  return (
    <Container p={0} h="calc(100vh - 120px)">
      <Center
        left={0}
        pos="absolute"
        h="calc(100vh - 120px)"
        style={{ transform: "translate(0px ,-3px )", zIndex: -20 }}
      >
        <P5CanvasDynamic />
      </Center>

      {/* {isMobile ? (
        <Center
          className="MobileWorking"
          // bg="blue"
          pos="absolute"
          h="calc(100vh - 120px)"
          w="100%"
          // style={{ zIndex: 3 }} //
        >
          <Flex
            align="center"
            w="100%"
            justify="center"
            style={{ transform: "translate(0px ,-3px )", zIndex: 30 }} // dit werkt op mibile
          >
            <PatternMaker output={hpFilter} />
          </Flex>
        </Center>
      ) : (
        <></>
      )} */}

      <Container
        p={0}
        style={{
          position: "relative",
          height: "calc(100vh - 120px)",
          width: "100%",
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
            // bg="blue"
            h="100%"
            // w="100%"
            align="center"
            justify="center"
            style={{ transform: "translate(0px ,-5px )" }}
          >
            <PatternMaker output={hpFilter} />
          </Flex>
        </Container>

        <Stack
          className="TopKnobs"
          w="100%"
          h="50%"
          justify="flex-start"
          pt="md"
        >
          <Group justify="space-between" align="flex-start" px="md">
            <SelectSound
              color={currentPattern.color}
              currentSound={currentPattern.sound}
            />

            <Stack>
              <Title order={3} c={currentPattern.color}>
                {currentPattern.name}
              </Title>

              <Group justify="center">
                <TransporterButton color={currentPattern.color} />
              </Group>
            </Stack>

            <SelectPattern />
          </Group>
        </Stack>

        <Stack
          className="BottomFaders"
          w="100%"
          h="50%"
          px="md"
          justify="flex-end"
          align="stretch"
        >
          <Box>
            <CustomSlider
              min={-40}
              max={0}
              label={"Volume"}
              valueLabel={"dB"}
              color={currentPattern.color}
              sendValue={sendVolume}
              initValue={soundSettings.volume}
            />
            <CustomDoubleSlider
              min={0}
              max={8000}
              label={["HPFilter", "LPFilter"]}
              valueLabel={"Hz"}
              color={currentPattern.color}
              sendValue={sendFilters}
              initValue={soundSettings.filtersAmount}
            />
            <CustomSlider
              min={80}
              max={400}
              label={"Tempo"}
              valueLabel={"BPM"}
              color={currentPattern.color}
              sendValue={sendTempo}
              initValue={soundSettings.tempo}
            />
          </Box>
        </Stack>
      </Container>
    </Container>
  );
};

export default PatternMakerPage;
