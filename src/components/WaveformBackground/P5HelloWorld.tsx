import React from "react";
import P5Sketch from "./P5Sketch";

const ExampleComponent: React.FC = () => {
  return (
    <P5Sketch
      sketch={() => {
        const sketch: P5Instance = new p5((p: P5Instance) => {
          p.setup = () => {
            p.createCanvas(400, 400);
            p.background(255);
          };

          p.draw = () => {
            p.ellipse(p.mouseX, p.mouseY, 50, 50);
          };
        });

        return sketch;
      }}
    />
  );
};

export default ExampleComponent;
