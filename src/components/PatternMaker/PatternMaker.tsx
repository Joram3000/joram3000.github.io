import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import { useDispatch, useSelector } from "react-redux";
import { selectSeqPattern, seqSettings } from "../../store/seqState/selectors";
import { PatternUpdater } from "../../store/seqState/actions";

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
}).toDestination();

const PatternMaker: React.FC = () => {
  const dispatch = useDispatch();
  const seqPattern = useSelector(selectSeqPattern);
  const seqSetting = useSelector(seqSettings);
  const [pattern, updatePattern] = useState(seqPattern.pattern); //INIT BY REDUX STATE

  // PATTERN UPDATER FROM SELECT
  useEffect(() => {
    updatePattern(seqPattern.pattern);
  }, [seqPattern.pattern]);

  useEffect(() => {
    const loop = new Tone.Sequence(
      (time, col) => {
        pattern.map((row, noteIndex) => {
          if (row[col]) {
            samples.triggerAttackRelease(notes[noteIndex], "16n", time);
          }
        });
      },
      [0, 1, 2, 3, 4, 5, 6, 7],
      "8n"
    ).start(0);
    return () => loop.dispose();
  }, [pattern]);

  // Update pattern by making a copy and inverting the value
  function setPattern({ x, y, value }) {
    const patternCopy = [...pattern];
    patternCopy[y][x] = +!value;
    updatePattern(patternCopy);
  }

  switch (seqSetting.seqSoundSelected) {
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
    <div className="Pattern-style">
      <div
        className="pattern-seqrows"
        style={{
          border: `1px solid ${seqPattern.color}`,
          background: "rgba(1,1,1,0.7)",
        }}
      >
        {seqPattern.pattern.map((row, y) => (
          <div key={y}>
            {row.map((value, x) => (
              <button
                key={x}
                style={
                  value === 1
                    ? {
                        background: `linear-gradient(to left, rgba(0,0,0,1), ${seqPattern.color})`,
                        border: seqPattern.color,
                      }
                    : {
                        background: "rgba(0,0,0,0.4)",
                        border: seqPattern.color,
                      }
                }
                onClick={() => {
                  setPattern({ x, y, value });
                  dispatch(PatternUpdater(pattern));
                }}
              ></button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatternMaker;
