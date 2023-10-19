import p5 from "p5";
import * as Tone from "tone";

let meter;
let analyser: Tone.Analyser;
const playing = true;

const sketchTest = (p: p5, canvasRef: HTMLDivElement, color: string) => {
  meter = new Tone.Meter();
  Tone.Destination.connect(meter);

  p.setup = () => {
    const cnv = p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef);

    cnv.position(0, 0);

    p.background(0);
    p.fill(230);
    cnv.style("z-index", "-1");
    analyser = new Tone.Analyser("waveform", 512);
    Tone.Destination.connect(analyser);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.clear(0, 0, 0, 0); // Clear the entire canvas.
    const dim = Math.min(p.width, p.height);
    p.strokeWeight(dim * 0.0025);
    p.stroke(color); // Use the provided color
    p.noFill();

    if (playing) {
      const values =
        (analyser.getValue() as Float32Array) || new Float32Array(512);

      p.beginShape();
      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] / 2;
        const x = p.map(i, 0, values.length - 1, 0, p.width);
        const y = p.height + amplitude * p.height;

        p.vertex(x, y / 2);
      }
      p.endShape();
    }

    p.background(0, 0, 0, 0);
  };
};

export default sketchTest;
