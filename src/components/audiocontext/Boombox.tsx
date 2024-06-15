import React, { useState, useEffect } from "react"
import treingvbluesberber from "../../assets/music/treingvbluesberber.mp3"

const Boombox: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5) // Initial volume value
  const [filterFrequency, setFilterFrequency] = useState(50) // Initial filter frequency value
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null,
  )
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null)
  const audio = new Audio(treingvbluesberber)

  useEffect(() => {
    // Set up audio context when component mounts
    const AudioContext = window.AudioContext
    const ctx = new AudioContext()
    setAudioCtx(ctx)

    setAudioElement(audio)
    // Clean up audio context when component unmounts
    return () => {
      if (ctx.state !== "closed") {
        ctx.close()
      }
    }
  }, [])

  useEffect(() => {
    if (!audioCtx) return
    const filter = audioCtx.createBiquadFilter()
    // Load audio track
    const track = audioCtx.createMediaElementSource(audio)

    // Create gain node
    const gainNode = audioCtx.createGain()

    // Create filter node

    filter.type = "lowpass"

    console.log("Audio Context:", audioCtx)
    console.log("Track:", track)
    console.log("Gain Node:", gainNode)
    console.log("Filter Node:", filter)

    // Connect audio graph
    track.connect(gainNode).connect(filter).connect(audioCtx.destination)

    // Set initial volume
    gainNode.gain.value = volume

    console.log("Audio Graph Connected.")

    // Clean up event listeners when component unmounts
    return () => {
      audio.pause()
      audio.removeAttribute("src")
      audio.load()
    }
  }, [audioCtx, volume, filterFrequency, audio])

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
    setVolume(newVolume)
    if (audioElement) {
      audioElement.volume = newVolume
    }
  }

  const handleFilterFrequencyChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(event.target.value)
    const newFilterFrequency = parseFloat(event.target.value)
    setFilterFrequency(newFilterFrequency)
    filter.frequency.value = filterFrequency
  }

  const handlePlayPause = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
      setIsPlaying((prevState) => !prevState)
    }
  }

  return (
    <div id="boombox">
      <div className="boombox-handle"></div>
      <div className="boombox-body">
        <section className="master-controls">
          <label>Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
          <label>Filter Frequency</label>
          <input
            type="range"
            min="20"
            max="20000"
            step="1"
            value={filterFrequency}
            onChange={handleFilterFrequencyChange}
          />
          <button className="tape-controls-play" onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </section>
        <section className="tape"></section>
      </div>
    </div>
  )
}

export default Boombox
