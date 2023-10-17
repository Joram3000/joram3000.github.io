import React, { useEffect, useCallback, useState } from "react";
import * as Tone from "tone";

import PatternMaker from "../../components/PatternMaker/PatternMaker";
import "./style.css";
import { useDispatch } from "react-redux";
import { Transportupdater } from "../../store/seqState/actions";

//TB REEL
import TBREEL from "../../../public/TBREEL.png";
import TBREELlinks from "../../../public/TBREELlinks.png";
import TBREELrechts from "../../../public/TBREELrechts.png";

const HomePage: React.FC = () => {
  const [playState, setPlayState] = useState(Tone.Transport.state);
  const dispatch = useDispatch();

  // Toggle playing / stopped
  const toggle = useCallback(() => {
    Tone.start();
    Tone.Transport.toggle();
    setPlayState(Tone.Transport.state);
  }, []);

  useEffect(() => {
    dispatch(Transportupdater(Tone.Transport.state));
  }, [dispatch]);

  return (
    <>
      <h1>Homepaginaaalalala</h1>
      <button>kadaver</button>

      <PatternMaker />

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
        </button>
      </div>
    </>
  );
};

export default HomePage;
