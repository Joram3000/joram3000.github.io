import React from "react";
import PatternMaker from "../../components/PatternMaker/PatternMaker";
import Transporter from "../../components/PatternMaker/Transporter";
import { SelectedPattern, StateVolume } from "../../store/seqState/selectors";
import "./style.css";
import { useSelector } from "react-redux";
import SelectSound from "../../components/PatternMaker/SelectSound";
import CustomSlider from "../../components/PatternMaker/CustomSlider";
import { useDispatch } from "react-redux";
import { SetVolume, SetTempo } from "../../store/seqState/actions";
import * as Tone from "tone";
import SelectPattern from "../../components/PatternMaker/SelectPattern";

const PatternMakerPage: React.FC = () => {
  const seqPattern = useSelector(SelectedPattern);
  const soundSettings = useSelector(StateVolume);
  const dispatch = useDispatch();
  console.log(soundSettings);
  const output = new Tone.Volume(-12).toDestination();

  const sendVolume = (waarde: number) => {
    dispatch(SetVolume(waarde));
    console.log("waarde", waarde);
  };

  const sendFilter = (waarde: number) => {
    console.log("sendFilter op de patternMakerPage", waarde);
  };

  const sendTempo = (waarde: number) => {
    Tone.Transport.bpm.value = waarde;
    dispatch(SetTempo(Tone.Transport.bpm.value));
  };

  return (
    <>
      <h1>Ritme: {seqPattern.name}</h1>
      <SelectPattern />
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

      <SelectSound color={seqPattern.color} />
      <PatternMaker output={output} />

      <Transporter />
    </>
  );
};

export default PatternMakerPage;
