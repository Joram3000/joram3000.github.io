import React, { useEffect, useRef } from "react";
import p5 from "p5";
// import { useSelector } from "react-redux";
// import { SelectedPattern } from "../../store/seqState/selectors";

interface P5CanvasProps {
  sketch: (p: p5, canvasRef: HTMLDivElement) => void;
}

const P5Canvas: React.FC<P5CanvasProps> = ({ sketch }) => {
  // const seqPattern = useSelector(SelectedPattern);
  // const [color, setColor] = useState("");
  const canvasRef = useRef<HTMLDivElement>(null);
  let p5Instance: p5 | null = null;

  useEffect(() => {
    // Create a new p5.js sketch if it doesn't exist or if the color changes.
    if (!p5Instance) {
      // if (p5Instance) {
      //   // Clean up the previous sketch instance
      //   p5Instance.remove();
      // }

      p5Instance = new p5((p) => sketch(p, canvasRef.current));
    }

    // Cleanup when the component unmounts
    // return () => {
    //   if (p5Instance) {
    //     p5Instance.remove();
    //   }
    // };
  }, [sketch]);

  return (
    <div style={{ zIndex: -1, position: "absolute" }} ref={canvasRef}></div>
  );
};

export default P5Canvas;
