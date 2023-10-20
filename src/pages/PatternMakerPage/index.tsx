import React, { useEffect } from "react";
import PatternMaker from "../../components/PatternMaker/PatternMaker";
import { SelectedPattern, StateVolume } from "../../store/seqState/selectors";
import { useSelector } from "react-redux";
import SelectSound from "../../components/PatternMaker/SelectSound";
import CustomSlider from "../../components/PatternMaker/CustomSlider";
import { useDispatch } from "react-redux";
import { SetTempo, SetVolume, SetFilters } from "../../store/seqState/actions";
import * as Tone from "tone";
import SelectPattern from "../../components/PatternMaker/SelectPattern";
import { Box, Group, Title } from "@mantine/core";
import "./style.css";
import { P5CanvasDynamic } from "../../components/P5/P5CanvasDynamic";
import CustomDoubleSlider from "../../components/PatternMaker/CustomDoubleSlider";
import Transporter from "../../components/PatternMaker/Transporter";

//TODO KAN DIT WORDEN VERPLAATST?
const output = new Tone.Volume(-12).toDestination();
const lpFilter = new Tone.Filter(8000, "lowpass", -48).connect(output);
const hpFilter = new Tone.Filter(0, "highpass").connect(lpFilter);

const PatternMakerPage: React.FC = () => {
  const dispatch = useDispatch();
  const seqPattern = useSelector(SelectedPattern);
  const soundSettings = useSelector(StateVolume);

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
    <div>
      <div
        className="patternandcanvas"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid orange",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            minWidth: "80%",
            border: "1px solid blue",
          }}
        >
          <PatternMaker output={hpFilter} />
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "50%",
            zIndex: -1,
          }}
        >
          <P5CanvasDynamic />
        </div>
      </div>
      <div style={{ border: "1px dotted pink", height: "90vh" }}>
        <Group justify="space-evenly" px="md">
          <Title p="md" c={seqPattern.color}>
            {seqPattern.name}
          </Title>

          <SelectPattern />
        </Group>

        <Group justify="space-around" p="md">
          <SelectSound
            color={seqPattern.color}
            selectedSound={seqPattern.sound}
          />

          <Box>
            <CustomSlider
              min={-40}
              max={0}
              label={"Volume"}
              valueLabel={"dB"}
              color={seqPattern.color}
              sendValue={sendVolume}
              initValue={soundSettings.volume}
            />
            <CustomDoubleSlider
              min={0}
              max={8000}
              label={["HPFilter", "LPFilter"]}
              valueLabel={"Hz"}
              color={seqPattern.color}
              sendValue={sendFilters}
              initValue={soundSettings.filtersAmount}
            />
            <CustomSlider
              min={80}
              max={400}
              label={"Tempo"}
              valueLabel={"BPM"}
              color={seqPattern.color}
              sendValue={sendTempo}
              initValue={soundSettings.tempo}
            />
          </Box>
        </Group>
        <Transporter />
      </div>
    </div>
  );
};

export default PatternMakerPage;
