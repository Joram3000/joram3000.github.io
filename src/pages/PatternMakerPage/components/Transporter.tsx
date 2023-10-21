import React, { useCallback, useState } from "react";
import * as Tone from "tone";
import TBREEL from "../../../assets/images/TBREEL.png";
import TBREELlinks from "../../../assets/images/TBREELlinks.png";
import TBREELrechts from "../../../assets/images/TBREELrechts.png";

const Transporter: React.FC = () => {
  const [playState, setPlayState] = useState(Tone.Transport.state);

  const toggle = useCallback(() => {
    Tone.start();
    Tone.Transport.toggle();
    setPlayState(Tone.Transport.state);
  }, []);

  return (
    <div
      className="tbreel-style"
      onClick={() => {
        toggle();
      }}
    >
      <img style={{}} src={TBREEL} alt="TBREEL" height="220" />
      <div
        style={
          playState === "started"
            ? { animation: "spin 4s linear infinite" }
            : { animation: "paused" }
        }
        className="draaiding1"
      >
        <img src={TBREELrechts} alt="TBREELrechts" />
      </div>

      <div
        style={
          playState === "started"
            ? { animation: "spin 4s linear infinite" }
            : { animation: "paused" }
        }
        className="draaiding2"
      >
        <img src={TBREELlinks} alt="TBREELlinks" />
      </div>
    </div>
  );
};

export default Transporter;
