import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { useSelector } from "react-redux";
import { SelectedPattern } from "../../store/seqState/selectors";

interface P5CanvasProps {
  sketch: (p: p5, canvasRef: HTMLDivElement, color: string) => void;
}

const P5Canvas: React.FC<P5CanvasProps> = ({ sketch }) => {
  const seqPattern = useSelector(SelectedPattern);
  const [color, setColor] = useState(seqPattern.color);
  const canvasRef = useRef<HTMLDivElement>(null);
  let p5Instance: p5 | null = null;

  useEffect(() => {
    // Create a new p5.js sketch if it doesn't exist or if the color changes.
    if (!p5Instance || seqPattern.color !== color) {
      if (p5Instance) {
        // Clean up the previous sketch instance
        p5Instance.remove();
      }

      p5Instance = new p5((p) =>
        // @ts-ignore
        sketch(p, canvasRef.current, seqPattern.color)
      );
      setColor(seqPattern.color);
    }

    // Cleanup when the component unmounts
    return () => {
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, [sketch, seqPattern.color]);

  return (
    <div style={{ zIndex: -1, position: "absolute" }} ref={canvasRef}></div>
  );
};

export default P5Canvas;
