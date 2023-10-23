import React, { useEffect } from "react";
import PatternMaker from "./components/PatternMaker";
import { SelectedPattern, StateVolume } from "../../store/seqState/selectors";
import { useSelector } from "react-redux";
import SelectSound from "./components/SelectSound";
import { useDispatch } from "react-redux";
import { SetTempo, SetVolume, SetFilters } from "../../store/seqState/actions";
import * as Tone from "tone";
import SelectPattern from "./components/SelectPattern";
import { Group, Title, Box } from "@mantine/core";
import "./style.css";
import { P5CanvasDynamic } from "../../components/P5/P5CanvasDynamic";
import CustomDoubleSlider from "./components/CustomDoubleSlider";
import CustomSlider from "./components/CustomSlider";
import TransporterButton from "./components/TransporterButton";

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
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
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

      <div
        className="pattern-controls"
        style={{
          height: "calc(100vh - 120px)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="pattern-controls-top"
          style={{
            display: "flex",
            width: "100%",
            height: "50%",
            flexDirection: "column",
          }}
        >
          {/* <Group justify="center" align="flex-start">
            <Title c={seqPattern.color}>{seqPattern.name}</Title>
          </Group> */}

          <Group justify="space-between" align="flex-start" p="md">
            <SelectSound
              color={seqPattern.color}
              selectedSound={seqPattern.sound}
            />
            <Title order={3} c={seqPattern.color}>
              {seqPattern.name}
            </Title>
            <SelectPattern />
          </Group>
        </div>
        <div
          className="pattern-controls-bottom"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",

            width: "100%",
            height: "50%",
          }}
        >
          <Box p="md">
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
            <Group justify="center">
              <TransporterButton color={seqPattern.color} />
            </Group>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default PatternMakerPage;
