import React, { useCallback } from "react";
import * as Tone from "tone";
import TBREEL from "../../../public/TBREEL.png";
import TBREELlinks from "../../../public/TBREELlinks.png";
import TBREELrechts from "../../../public/TBREELrechts.png";
import { Transport } from "tone";

const Transporter: React.FC = () => {
  // Toggle playing / stopped
  const toggle = useCallback(() => {
    Tone.start();
    Tone.Transport.toggle();
  }, []);

  return (
    <div className="tbreel-style">
      <button
        style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
        type="button"
        onClick={() => {
          toggle();
        }}
      >
        <img style={{}} src={TBREEL} alt="TBREEL" height="220" />
        <div
          style={
            Transport.state
              ? { animation: "spin 4s linear infinite" }
              : { animation: "paused" }
          }
          className="draaiding1"
        >
          <img src={TBREELrechts} alt="TBREELrechts" />
        </div>

        <div
          style={
            Transport.state
              ? { animation: "spin 4s linear infinite" }
              : { animation: "paused" }
          }
          className="draaiding2"
        >
          <img src={TBREELlinks} alt="TBREELlinks" />
        </div>
      </button>
    </div>
  );
};

export default Transporter;
