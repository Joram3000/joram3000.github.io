import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { useDispatch, useSelector } from "react-redux";
import { SelectedPattern } from "../../../store/patternMakerState/selectors";
import { PatternUpdater2 } from "../../../store/patternMakerState/actions";
import { Container, Flex } from "@mantine/core";

interface PatternMakerProps {
  output: Tone.OutputNode;
}

let notes = ["A1", "B1"];

const samples = new Tone.Sampler({
  urls: {
    A1: "/Loud/cymkik_b3staa.wav",
    B1: "/Loud/jaydeesnare_qc9dw5.wav",
    C1: "/Metal/cowbell_aihfsc.wav",
    D1: "/Metal/hih_gmxx95.wav",
    E1: "/Soft/conga_uvdi3n.wav",
    F1: "/Soft/snap_mtp0yq.wav",
    G1: "/Wood/kick_i1pqe6.wav",
    A2: "/Wood/clap_xmxx6f.wav",
  },
  baseUrl:
    "https://res.cloudinary.com/dqqb0ldgk/video/upload/v1651657689/Drumsounds",
});

const PatternMaker: React.FC<PatternMakerProps> = ({ output }) => {
  samples.connect(output);
  const dispatch = useDispatch();
  const reduxSequencerPattern = useSelector(SelectedPattern);
  const [currentPattern, updateCurrentPattern] = useState<boolean[][]>(
    reduxSequencerPattern.pattern
  ); //INIT BY REDUX STATE

  // console.log(currentPattern); // wordt heel de tijd retriggeerd

  // dit is de loop die speelt
  useEffect(() => {
    const loop = new Tone.Sequence(
      (time, col) => {
        currentPattern.map((rowArray: boolean[], rowIndex: number) => {
          if (rowArray[col]) {
            samples.triggerAttackRelease(notes[rowIndex], "8n", time);
          }
        });
      },
      [0, 1, 2, 3, 4, 5, 6, 7],
      "8n"
    ).start(0);
    return () => {
      loop.dispose();
    };
  }, [currentPattern]);

  // hiermee passen de shit weg
  function setPattern({
    rowIndex,
    rowNumber,
    trigger,
  }: {
    rowIndex: number;
    rowNumber: number;
    trigger: boolean;
  }) {
    //
    const patternCopy = [...currentPattern];
    patternCopy[rowNumber][rowIndex] = !trigger; //hier mee draai je hem om
    updateCurrentPattern(patternCopy);
    dispatch(PatternUpdater2({ rowIndex, rowNumber, trigger }));
    // dispatch(PatternUpdater(patternCopy));
  }

  // useEffect(() => {
  //   updatePattern(seqPattern.pattern);
  // }, [seqPattern.pattern]);

  switch (reduxSequencerPattern.sound) {
    case "Loud":
      notes = ["B1", "A1"];
      break;
    case "Electronic":
      notes = ["D1", "C1"];
      break;
    case "Percussion":
      notes = ["F1", "E1"];
      break;
    case "Neo-Soul":
      notes = ["A2", "G1"];
      break;
    default:
      notes = ["E2", "G1"];
  }

  return (
    <Container
      p={0}
      className="seqPattern"
      style={{
        borderRadius: 8,
        border: `4px solid ${reduxSequencerPattern.color}`,
      }}
    >
      {reduxSequencerPattern.pattern.map(
        (rowArray: boolean[], rowNumber: number) => (
          <Flex className="seqRow" key={rowNumber}>
            {rowArray.map((trigger, rowIndex) => (
              <Container
                className="seqTrigger"
                key={rowIndex}
                style={{
                  margin: "2px",
                  height: "100px",
                  width: "100%",
                  background: trigger
                    ? `linear-gradient(to right, ${reduxSequencerPattern.color}, transparent)`
                    : "transparent",
                }}
                onClick={() => {
                  setPattern({ rowIndex, rowNumber, trigger });
                }}
              />
            ))}
          </Flex>
        )
      )}
    </Container>
  );
};

export default PatternMaker;
