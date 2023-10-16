import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import GreetingOverlay from "./GreetingOverlay";
import "./videoplayer.css";

function Videoplayer() {
  const [color, setColor] = useState<string>("#0000ff");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const { colorParam } = useParams();
  const [arrayValues, setArrayValues] = useState<string[]>(["Goedesnavels"]);

  const handleArrayValuesChange = (newArrayValues: string[]) => {
    setArrayValues(newArrayValues);
  };

  useEffect(() => {
    if (colorParam) {
      setColor(`#${colorParam}`);
    }
  }, [colorParam]);

  const handleProgress = (progress: { playedSeconds: number }) => {
    if (progress.playedSeconds < 1) {
      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
      }, 3300);
      setGreetingIndex((prevIndex) => (prevIndex + 1) % arrayValues.length);
    }
  };

  const handleChange = (event: any) => {
    setColor(event.target.value);
  };

  return (
    <>
      <div
        className="background-layer"
        style={{
          backgroundColor: color,
        }}
      >
        {showOverlay && (
          <div className="overlay-layer">
            <h1 className="overlay-text">{arrayValues[greetingIndex]}</h1>
          </div>
        )}

        <ReactPlayer
          playing
          controls
          url="animation09.mp4"
          width={1920 / 2}
          height={540 / 2}
          loop
          onProgress={handleProgress}
        />
      </div>

      <div className="color-changer">
        <h2>Kies een achtergrondkleur</h2>
        <input
          className="color-input"
          style={{
            backgroundColor: color,
          }}
          type="color"
          value={color}
          onChange={handleChange}
          placeholder="Enter a color"
        />

        <GreetingOverlay
          arrayValues={arrayValues}
          onArrayValuesChange={handleArrayValuesChange}
        />
      </div>
    </>
  );
}

export default Videoplayer;
