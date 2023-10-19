import React, { useEffect, useRef } from "react";
import p5 from "p5";

interface P5CanvasProps {
  color: string;
  sketch: (p: p5, canvasRef: HTMLDivElement, color: string) => void;
}

const P5Canvas: React.FC<P5CanvasProps> = ({ color = "red", sketch }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  let p5Instance: p5 | null = null;

  useEffect(() => {
    // Create a new p5.js sketch if it doesn't exist or if the color changes.
    if (!p5Instance) {
      // if (p5Instance) {
      //   // Clean up the previous sketch instance
      //   p5Instance.remove();
      // }

      // @ts-ignore
      p5Instance = new p5((p) => sketch(p, canvasRef.current, color));
    }

    // Cleanup when the component unmounts
    // return () => {
    //   if (p5Instance) {
    //     p5Instance.remove();
    //   }
    // };
  }, [sketch]);

  return <div ref={canvasRef}></div>;
};

export default P5Canvas;
