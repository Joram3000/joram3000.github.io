import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { useDispatch, useSelector } from "react-redux";
import { CurrentPatternUpdater } from "../../../store/patternmaker/actions";
import { Container, Flex } from "@mantine/core";
import { selectedPatternSelector } from "../../../store/patternmaker/selectors";
import { SoundStyle } from "../../../store/patternmaker/types";

interface PatternMakerProps {
  output: Tone.OutputNode;
}

let notes: [string, string];

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
  const reduxSequencerPattern = useSelector(selectedPatternSelector);
  const [currentPattern, updateCurrentPattern] = useState<
    [boolean[], boolean[]]
  >(reduxSequencerPattern.pattern);

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

  function setPattern({
    rowIndex,
    rowNumber,
    trigger,
  }: {
    rowIndex: number;
    rowNumber: number;
    trigger: boolean;
  }) {
    dispatch(CurrentPatternUpdater({ rowNumber, rowIndex, trigger }));
  }

  useEffect(() => {
    updateCurrentPattern(reduxSequencerPattern.pattern);
  }, [reduxSequencerPattern]);

  switch (reduxSequencerPattern.sound) {
    case SoundStyle.LOUD:
      notes = ["B1", "A1"];
      break;
    case SoundStyle.ELECTRONIC:
      notes = ["D1", "C1"];
      break;
    case SoundStyle.PERCUSSION:
      notes = ["F1", "E1"];
      break;
    case SoundStyle.NEOSOUL:
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
      {currentPattern.map((rowArray: boolean[], rowNumber: number) => (
        <Flex className="seqRow" key={rowNumber}>
          {rowArray.map((trigger: boolean, rowIndex: number) => (
            <Container
              className="seqTrigger"
              key={rowIndex}
              style={{
                margin: "2px",
                height: "85px",
                width: "100%",
                background: trigger
                  ? `linear-gradient(to right, ${reduxSequencerPattern.color}, transparent)`
                  : "transparent",
              }}
              onClick={() => {
                setPattern({ rowNumber, rowIndex, trigger });
              }}
            />
          ))}
        </Flex>
      ))}
    </Container>
  );
};

export default PatternMaker;
