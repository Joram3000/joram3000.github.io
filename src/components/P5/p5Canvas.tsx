import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { useSelector } from "react-redux";
import { SelectedPattern } from "../../store/seqState/selectors";

interface P5CanvasProps {
  sketch: (p: p5, canvasRef: HTMLDivElement, color: string) => void;
}

const P5Canvas: React.FC<P5CanvasProps> = ({ sketch }) => {
  const seqPattern = useSelector(SelectedPattern);
  console.log(seqPattern.color);
  const canvasRef = useRef<HTMLDivElement>(null);
  let p5Instance: p5 | null = null;

  useEffect(() => {
    if (canvasRef.current && !p5Instance) {
      p5Instance = new p5((p) =>
        sketch(p, canvasRef.current, seqPattern.color)
      );
    }
  }, [sketch, seqPattern.color]);

  return (
    <div style={{ zIndex: -1, position: "absolute" }} ref={canvasRef}></div>
  );
};

export default P5Canvas;
