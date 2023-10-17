import React, { useEffect, useCallback } from "react";
import * as Tone from "tone";
import { useDispatch } from "react-redux";
import { Transportupdater } from "../../store/seqState/actions";
import TBREEL from "../../../public/TBREEL.png";
import TBREELlinks from "../../../public/TBREELlinks.png";
import TBREELrechts from "../../../public/TBREELrechts.png";

const Transporter: React.FC = () => {
  const dispatch = useDispatch();

  // Toggle playing / stopped
  const toggle = useCallback(async () => {
    await Tone.start();
    Tone.Transport.toggle();
  }, []);

  useEffect(() => {
    dispatch(Transportupdater(Tone.Transport.state));
  }, [dispatch]);

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
            Tone.Transport.state === "started"
              ? { animation: "spin 4s linear infinite" }
              : { animation: "paused" }
          }
          className="draaiding1"
        >
          <img src={TBREELrechts} alt="TBREELrechts" />
        </div>

        <div
          style={
            Tone.Transport.state === "started"
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
