import { Button } from "@mantine/core"
import { useState } from "react"

const TapeMachineSettings = () => {
  const [settings, setSettings] = useState({
    RecordSpeed: 0,
    PlaybackSpeed: {
      Looping: 0,
      Oneshot: 0,
    },
    MultiTap: 0,
    SpeedControl: 0,
    SpeedMarkers: [0, 0.5, 1.0, 2.0, 4.0],
    TimePot: 0,
    RecordJack: 0,
    ExternalClock: {
      Average: 4,
      Resolution: 64,
      Timeout: 0,
    },
    ClockDivisions: 0,
    Quantisation: 3,
    EraseRecord: 0,
    MinLength: 1280,
    CrossfadeDuration: 50,
    RetrigDelay: 5,
    MaxDubLevel: 0.9,
    WowFlutterDepth: 0,
    CrinkleDepth: 0,
    TapeAge: 0,
    Hysterisis: 0,
    Wear: 0,
    Knee: 0.3,
    Compensation: 0,
    LowCutFreq: 80,
    LowCutQ: 0.4,
    HighCutFreq: 8000,
    SpeedSlewTime: 25,
    CapacativeTouchMode: 0,
  })

  // Function to handle changes in settings
  const handleSettingChange = (
    category: string | null,
    key: string,
    value: number,
  ) => {
    if (category === "PlaybackSpeed") {
      setSettings({
        ...settings,
        PlaybackSpeed: {
          ...settings.PlaybackSpeed,
          [key]: value,
        },
      })
    } else if (category === "ExternalClock") {
      setSettings({
        ...settings,
        ExternalClock: {
          ...settings.ExternalClock,
          [key]: value,
        },
      })
    } else {
      setSettings({
        ...settings,
        [key]: value,
      })
    }
  }

  // Speed Control Settings
  // Quantization Settings
  // Button Functionality
  // Loop Settings
  // External Clock Settings
  // Retrigger Settings
  // Tape Emulation Settings

  return (
    <div className="tape-machine-settings">
      <h2>Tape Machine Settings</h2>

      <div className="settings-category">
        <div>
          <h3>Record and Playback Settings</h3>
          <label>
            Record Speed:
            <input
              type="radio"
              name="recordSpeed"
              checked={settings.RecordSpeed === 0}
              onChange={() => handleSettingChange(null, "RecordSpeed", 0)}
            />
            Variable
            <input
              type="radio"
              name="recordSpeed"
              checked={settings.RecordSpeed === 1}
              onChange={() => handleSettingChange(null, "RecordSpeed", 1)}
            />
            Fixed
          </label>
        </div>

        <div>
          <label>
            Playback Speed - Looping:
            <input
              type="checkbox"
              checked={settings.PlaybackSpeed.Looping === 1}
              onChange={() =>
                handleSettingChange(
                  "PlaybackSpeed",
                  "Looping",
                  settings.PlaybackSpeed.Looping === 0 ? 1 : 0,
                )
              }
            />
          </label>
        </div>
        <div>
          <label>
            Playback Speed - Oneshot:
            <input
              type="checkbox"
              checked={settings.PlaybackSpeed.Oneshot === 1}
              onChange={() =>
                handleSettingChange(
                  "PlaybackSpeed",
                  "Oneshot",
                  settings.PlaybackSpeed.Oneshot === 0 ? 1 : 0,
                )
              }
            />
          </label>
        </div>
        <div>
          <label>
            Multi-Tap:
            <input
              type="checkbox"
              checked={settings.MultiTap === 1}
              onChange={() =>
                handleSettingChange(
                  null,
                  "MultiTap",
                  settings.MultiTap === 0 ? 1 : 0,
                )
              }
            />
          </label>
        </div>
      </div>

      {/* <div className="settings-category">
        <h3>Speed Control and Time Settings</h3>
        <label>
          Speed Control:
          <select
            value={settings.SpeedControl}
            onChange={(e) =>
              handleSettingChange(
                null,
                "SpeedControl",
                parseInt(e.target.value),
              )
            }
          >
            <option value={0}>Notched</option>
            <option value={1}>Stepped</option>
            <option value={2}>Smooth</option>
            <option value={3}>V/Oct</option>
          </select>
        </label>
        <label>
          Time Pot Function:
          <select
            value={settings.TimePot}
            onChange={(e) =>
              handleSettingChange(null, "TimePot", parseInt(e.target.value))
            }
          >
            <option value={0}>Crossfade Duration</option>
            <option value={1}>Speed Slew Time</option>
            <option value={2}>Tape Emulation Amount</option>
          </select>
        </label>
      </div> */}

      {/* <div className="settings-category">
        <h3>Record Jack and External Clock Settings</h3>
        <label>
          Record Jack Functionality:
          <select
            value={settings.RecordJack}
            onChange={(e) =>
              handleSettingChange(null, "RecordJack", parseInt(e.target.value))
            }
          >
            <option value={0}>Latching Record</option>
            <option value={1}>Gated Record</option>
            <option value={2}>External Clock</option>
          </select>
        </label>
        {settings.RecordJack === 2 && (
          <div>
            <label>
              External Clock Average:
              <input
                type="number"
                value={settings.ExternalClock.Average}
                onChange={(e) =>
                  handleSettingChange(
                    "ExternalClock",
                    "Average",
                    parseInt(e.target.value),
                  )
                }
              />
            </label>
            <label>
              External Clock Resolution:
              <input
                type="number"
                value={settings.ExternalClock.Resolution}
                onChange={(e) =>
                  handleSettingChange(
                    "ExternalClock",
                    "Resolution",
                    parseInt(e.target.value),
                  )
                }
              />
            </label>
            <label>
              External Clock Timeout:
              <input
                type="number"
                value={settings.ExternalClock.Timeout}
                onChange={(e) =>
                  handleSettingChange(
                    "ExternalClock",
                    "Timeout",
                    parseInt(e.target.value),
                  )
                }
              />
            </label>
          </div>
        )}
      </div> */}

      {/* <div className="settings-category">
        <h3>Clock and Quantisation Settings</h3>
        <label>
          Clock Divisions:
          <select
            value={settings.ClockDivisions}
            onChange={(e) =>
              handleSettingChange(
                null,
                "ClockDivisions",
                parseInt(e.target.value),
              )
            }
          >
            <option value={0}>All</option>
            <option value={1}>Even</option>
            <option value={2}>Odd</option>
            <option value={3}>Powers Of Two</option>
          </select>
        </label>
        <label>
          Start/Length Quantisation:
          <select
            value={settings.Quantisation}
            onChange={(e) =>
              handleSettingChange(
                null,
                "Quantisation",
                parseInt(e.target.value),
              )
            }
          >
            <option value={0}>All</option>
            <option value={1}>Even</option>
            <option value={2}>Odd</option>
            <option value={3}>Powers Of Two</option>
          </select>
        </label>
      </div> */}

      <Button onClick={() => console.log(settings)} />

      {/* <p>{JSON.stringify(settings, null, 2)}</p> */}
    </div>
  )
}

export default TapeMachineSettings
