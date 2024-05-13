import React, { useState } from "react"
import BlankWaveSurfer from "../WaveSurferPlayer/BlankWaveSurfer"
import treingvbluesberber from "../../assets/music/treingvbluesberber.mp3"
import { Slider } from "@mantine/core"

const AudioContextt: React.FC = () => {
  const audio = new Audio()
  const audioContext = new AudioContext()
  audio.src = treingvbluesberber

  const [eqBandsP, setEqBandsP] = useState<{ freq: number; gain: number }[]>([
    { freq: 32, gain: -20 },
    { freq: 64, gain: 10 },
    { freq: 250, gain: 0 },
    { freq: 2000, gain: 30 },
    { freq: 16000, gain: 40 },
  ])

  const filters = eqBandsP.map((band) => {
    const filter = audioContext.createBiquadFilter()
    filter.type =
      band.freq <= 32
        ? "lowshelf"
        : band.freq >= 16000
        ? "highshelf"
        : "peaking"
    filter.gain.value = Math.random() * 40 - 20
    filter.Q.value = 1
    filter.frequency.value = band.freq // the cut-off frequency
    return filter
  })

  audio.addEventListener(
    "canplay",
    () => {
      const mediaNode = audioContext.createMediaElementSource(audio)
      const equalizer = filters.reduce(
        (prev: BiquadFilterNode, curr: BiquadFilterNode) => {
          prev.connect(curr)
          return curr
        },
        mediaNode as any,
      ) // Change the initial value to mediaNode as BiquadFilterNode
      equalizer.connect(audioContext.destination)
    },
    { once: true },
  )

  const onChangerino = (e: number, index: number) => {
    const newGain = e
    const newEqBandsP = [...eqBandsP]
    newEqBandsP[index].gain = newGain
    setEqBandsP(newEqBandsP)
    filters[index].gain.value = newGain
  }

  return (
    <>
      {/* {eqBandsP.map((band, index) => (
        <Slider
          key={index}
          min={-40}
          max={40}
          value={band.gain}
          onChange={(e) => onChangerino(e, index)}
          step={0.1}
        />
      ))} */}
      <BlankWaveSurfer
        backend="WebAudio"
        media={audio}
        dragToSeek
        width="100%"
        height="auto"
        autoScroll
        normalize
        autoCenter
        container={"#Waveform"}
      />
    </>
  )
}

export default AudioContextt
