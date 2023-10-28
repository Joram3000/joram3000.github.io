// @ts-ignore
import { ReactP5Wrapper, Sketch, SketchProps } from "@p5-wrapper/react";
import * as Tone from "tone";

type waveformSketchProps = SketchProps & {
  color: string;
};

let meter;
let analyser: Tone.Analyser;
const playing = true;
let waveColor: string;

const waveformSketch: Sketch<waveformSketchProps> = (p: any) => {
  meter = new Tone.Meter();
  Tone.Destination.connect(meter);
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.fill(0);

    analyser = new Tone.Analyser("waveform", 512);
    Tone.Destination.connect(analyser);
  };

  p.updateWithProps = (props: waveformSketchProps) => {
    if (props.color) {
      waveColor = props.color;
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.clear(0, 0, 0, 0);
    const dim = Math.min(p.width, p.height);
    p.strokeWeight(dim * 0.003);
    p.stroke(waveColor);
    p.noFill();
    if (playing) {
      const values = analyser.getValue() as Float32Array;

      p.beginShape();
      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] / 2;
        const x = p.map(i, 0, values.length - 1, 0, p.width);
        const y = p.height / 2;
        p.vertex(x, y + amplitude * (p.height / 2));
      }
      p.endShape();
    }
    p.background(0, 0, 0, 0);
  };
};

interface P5WaveFormSketchWrapperProps {
  colorValue: string;
}

const P5WaveFormSketchWrapper: React.FC<P5WaveFormSketchWrapperProps> = ({
  colorValue,
}) => {
  return <ReactP5Wrapper sketch={waveformSketch} color={colorValue} />;
};

export default P5WaveFormSketchWrapper;
