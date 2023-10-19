import React, { useEffect } from "react";
import PatternMaker from "../../components/PatternMaker/PatternMaker";
import Transporter from "../../components/PatternMaker/Transporter";
import { SelectedPattern, StateVolume } from "../../store/seqState/selectors";
import { useSelector } from "react-redux";
import SelectSound from "../../components/PatternMaker/SelectSound";
import CustomSlider from "../../components/PatternMaker/CustomSlider";
import { useDispatch } from "react-redux";
import { SetTempo, SetVolume } from "../../store/seqState/actions";
import * as Tone from "tone";
import SelectPattern from "../../components/PatternMaker/SelectPattern";
import { Box, Container, Group, Text } from "@mantine/core";
import P5Canvas from "../../components/P5/p5Canvas";
import sketchTest from "../../components/P5/sketchTest";
import "./style.css";

//TODO KAN DIT WORDEN VERPLAATST?
const output = new Tone.Volume(-12).toDestination();

const PatternMakerPage: React.FC = () => {
  const seqPattern = useSelector(SelectedPattern);
  const soundSettings = useSelector(StateVolume);
  const dispatch = useDispatch();

  const sendVolume = (waarde: number) => {
    dispatch(SetVolume(waarde));
  };

  const sendFilter = (waarde: number) => {
    console.log("sendFilter op de patternMakerPage", waarde);
  };

  const sendTempo = (waarde: number) => {
    Tone.Transport.bpm.value = waarde;
    dispatch(SetTempo(Tone.Transport.bpm.value));
  };

  useEffect(() => {
    output.volume.value = soundSettings.volume;
  }, [soundSettings.volume]);

  return (
    <div>
      <P5Canvas sketch={sketchTest} />
      <Text size="xl" fw={700} c={seqPattern.color}>
        {seqPattern.name}
      </Text>
      <Container p="md">
        <SelectPattern />

        <Group grow m="sm">
          <SelectSound
            color={seqPattern.color}
            selectedSound={seqPattern.sound}
          />
          <Box pt="xl">
            <CustomSlider
              min={-40}
              max={0}
              label={"Volume"}
              color={seqPattern.color}
              sendValue={sendVolume}
              initValue={soundSettings.volume}
            />
            <CustomSlider
              min={0}
              max={20000}
              label={"Filter"}
              color={seqPattern.color}
              sendValue={sendFilter}
              initValue={soundSettings.filterAmount}
            />
            <CustomSlider
              min={80}
              max={400}
              label={"Tempo"}
              color={seqPattern.color}
              sendValue={sendTempo}
              initValue={soundSettings.tempo}
            />
          </Box>
        </Group>
        <PatternMaker output={output} />
      </Container>
      <Transporter />
    </div>
  );
};

export default PatternMakerPage;
