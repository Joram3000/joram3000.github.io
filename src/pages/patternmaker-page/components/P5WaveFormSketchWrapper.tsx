import * as React from "react"
import {
  ReactP5Wrapper,
  Sketch,
  SketchProps,
  P5CanvasInstance,
} from "@p5-wrapper/react"
import * as Tone from "tone"

type waveformSketchProps = SketchProps & {
  color: string
}

let meter: Tone.Meter
let analyser: Tone.Analyser
const playing = true
let waveColor: string

const waveformSketch: Sketch<waveformSketchProps> = (
  p5: P5CanvasInstance<waveformSketchProps>,
) => {
  meter = new Tone.Meter()
  Tone.Destination.connect(meter)

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.fill(0)

    analyser = new Tone.Analyser("waveform", 512)
    Tone.Destination.connect(analyser)
  }

  p5.updateWithProps = (props: waveformSketchProps) => {
    if (props.color) {
      waveColor = props.color
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }

  p5.draw = () => {
    p5.clear(0, 0, 0, 0)
    const dim = Math.min(p5.width, p5.height)
    p5.strokeWeight(dim * 0.003)
    p5.stroke(waveColor)
    p5.noFill()
    if (playing) {
      const values = analyser.getValue() as Float32Array

      p5.beginShape()
      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] / 2
        const x = p5.map(i, 0, values.length - 1, 0, p5.width)
        const y = p5.height / 2
        p5.vertex(x, y + amplitude * (p5.height / 2))
      }
      p5.endShape()
    }
  }
}

interface P5WaveFormSketchWrapperProps {
  colorValue: string
}

const P5WaveFormSketchWrapper: React.FC<P5WaveFormSketchWrapperProps> = ({
  colorValue,
}) => {
  return <ReactP5Wrapper sketch={waveformSketch} color={colorValue} />
}

export default P5WaveFormSketchWrapper
