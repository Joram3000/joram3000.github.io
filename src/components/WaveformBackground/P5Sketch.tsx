import React from 'react';
import * as p5 from 'p5';
import { P5Instance } from 'p5';

type P5SketchProps = {
  sketch: () => P5Instance;
};

const P5Sketch: React.FC<P5SketchProps> = ({ sketch }) => {
  const [p5Instance, setP5Instance] = React.useState<P5Instance>();

  React.useEffect(() => {
    const newP5Instance = sketch();
    setP5Instance(newP5Instance);

    return () => {
      newP5Instance.remove();
    };
  }, [sketch]);

  if (!p5Instance) {
    return null;
  }

  return (
    <canvas
      ref={(canvas) => {
        if (canvas) {
          p5Instance.parent(canvas);
        }
      }}
    />
  );
};

export default P5Sketch;