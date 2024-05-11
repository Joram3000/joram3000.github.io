import React, { useEffect, useState } from "react"
// import WaveSurfer from "wavesurfer.js"

import treingvbluesberber from "../../assets/music/treingvbluesberber.mp3"

const AudioComponent = () => {
  // Create your own media element
  const audio = new Audio()
  audio.controls = true
  audio.src = treingvbluesberber

  // Create a WaveSurfer instance and pass the media element
  //   const wavesurfer = WaveSurfer.create({
  //     container: document.body,
  //     waveColor: "rgb(200, 0, 200)",
  //     progressColor: "rgb(100, 0, 100)",
  //     media: audio, // <- this is the important part
  //   })

  // Optionally, add the audio to the page to see the controls
  document.body.appendChild(audio)

  // Create Web Audio context
  const audioContext = new AudioContext()

  // Define the equalizer bands
  const eqBands = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]
  const [filterss, setFilters] = useState(
    eqBands.map((bands) => audioContext.createBiquadFilter()),
  )
  // Create a biquad filter for each band
  const filters = eqBands.map((band) => {
    const filter = audioContext.createBiquadFilter()
    filter.type =
      band <= 32 ? "lowshelf" : band >= 16000 ? "highshelf" : "peaking"
    filter.gain.value = Math.random() * 40 - 20
    filter.Q.value = 1 // resonance
    filter.frequency.value = band // the cut-off frequency
    return filter
  })

  // Connect the audio to the equalizer
  audio.addEventListener(
    "canplay",
    () => {
      // Create a MediaElementSourceNode from the audio element
      const mediaNode = audioContext.createMediaElementSource(audio)

      // Connect the filters and media node sequentially
      const equalizer = filters.reduce((prev, curr) => {
        prev.connect(curr)
        return curr
      }, mediaNode)

      // Connect the filters to the audio output
      equalizer.connect(audioContext.destination)
    },
    { once: true },
  )

  const startAudio = () => {
    audioContext.resume().then(() => {
      audio.play()
      //   setStarted(true)
    })
  }

  return (
    <div>
      <button onClick={startAudio}>Start Audio</button>
      {eqBands.map((band, index) => (
        <input
          key={index}
          type="range"
          //   orient="vertical"
          //   style={{ appearance: "slider-vertical", width: "8%" }}
          min={-40}
          max={40}
          value={filters[index].gain.value}
          step={0.1}
          onChange={(e) => {
            const newFilters = [...filters]
            newFilters[index].gain.value = e.target.value
            setFilters(newFilters)
          }}
        />
      ))}
    </div>
  )
}

export default AudioComponent
