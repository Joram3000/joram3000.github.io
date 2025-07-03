import React, { useState, useEffect, useRef } from "react"
import * as Tone from "tone"
import { useDispatch, useSelector } from "react-redux"
import { CurrentPatternUpdater } from "../../../store/patternmaker/actions"
import { Container, Flex } from "@mantine/core"
import { selectedPatternSelector } from "../../../store/patternmaker/selectors"
import { SoundStyle } from "../../../store/patternmaker/types"
import classes from "./PatternMaker.module.css"
import { isMobile } from "react-device-detect"
import { connectSamplePool, playSample } from "../audio/audioConfig"

interface PatternMakerProps {
  output: Tone.OutputNode
  colorValue?: string
}

let notes: [string, string]

const PatternMaker: React.FC<PatternMakerProps> = ({ output, colorValue }) => {
  const dispatch = useDispatch()
  const reduxSequencerPattern = useSelector(selectedPatternSelector)
  const [currentPattern, updateCurrentPattern] = useState<
    [boolean[], boolean[]]
  >(reduxSequencerPattern.pattern)
  const loopRef = useRef<Tone.Sequence | null>(null)

  // Connect samples to output only once
  useEffect(() => {
    connectSamplePool(output)
  }, [output])

  // Create and manage the sequence
  useEffect(() => {
    // Dispose old loop if it exists
    if (loopRef.current) {
      loopRef.current.dispose()
    }

    const newLoop = new Tone.Sequence(
      (time, col) => {
        currentPattern.map((rowArray: boolean[], rowIndex: number) => {
          if (rowArray[col]) {
            playSample(notes[rowIndex], time)
          }
        })
      },
      [0, 1, 2, 3, 4, 5, 6, 7],
      "8n",
    ).start(0)

    loopRef.current = newLoop

    return () => {
      if (loopRef.current) {
        loopRef.current.dispose()
      }
    }
  }, [currentPattern])

  function setPattern({
    rowIndex,
    rowNumber,
    trigger,
  }: {
    rowIndex: number
    rowNumber: number
    trigger: boolean
  }) {
    dispatch(CurrentPatternUpdater({ rowNumber, rowIndex, trigger }))
  }

  useEffect(() => {
    updateCurrentPattern(reduxSequencerPattern.pattern)
  }, [reduxSequencerPattern])

  switch (reduxSequencerPattern.sound) {
    case SoundStyle.LOUD:
      notes = ["B1", "A1"]
      break
    case SoundStyle.ELECTRONIC:
      notes = ["D1", "C1"]
      break
    case SoundStyle.PERCUSSION:
      notes = ["F1", "E1"]
      break
    case SoundStyle.NEOSOUL:
      notes = ["A2", "G1"]
      break
    default:
      notes = ["E2", "G1"]
  }

  return (
    <Container
      p={0}
      className="seqPattern"
      style={{
        boxShadow: `0px 0px 10px 0px ${colorValue}`,
        borderRadius: 8,
        border: `4px solid ${colorValue}`,
      }}
    >
      {currentPattern.map((rowArray: boolean[], rowNumber: number) => (
        <Flex className="seqRow" key={rowNumber}>
          {rowArray.map((trigger: boolean, rowIndex: number) => (
            <Container
              className={classes.seqButton}
              key={rowIndex}
              style={{
                margin: "2px",
                height: "85px",
                width: "100%",
                background: trigger
                  ? `linear-gradient(to right, ${colorValue}, transparent)`
                  : isMobile
                  ? `linear-gradient(to right, rgba(0,0,0,0.2), transparent)`
                  : undefined,
              }}
              onClick={() => {
                setPattern({ rowNumber, rowIndex, trigger })
              }}
            />
          ))}
        </Flex>
      ))}
    </Container>
  )
}

export default PatternMaker
