import React, { useEffect, useState } from "react"
import treingvbluesberber from "../../assets/music/treingvbluesberber.mp3"
import BlankWaveSurfer from "../WaveSurferPlayer/BlankWaveSurfer"
import P5WaveFormSketchWrapper from "../../pages/patternmaker-page/components/P5WaveFormSketchWrapper"
const AudioEqualizer: React.FC = () => {
  const [audio] = useState(new Audio(treingvbluesberber))
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [filters, setFilters] = useState<BiquadFilterNode[]>([])
  const [delay, setDelay] = useState<DelayNode>()
  const [masterGain, setMasterGain] = useState<GainNode>()
  const [delayGain, setDelayGain] = useState<GainNode>()
  const initializeAudioContext = () => {
    const context = new AudioContext()
    setAudioContext(context)
  }

  useEffect(() => {
    if (audioContext) {
      const eqBands = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]
      const delayt = audioContext?.createDelay(4)
      const masterGain = audioContext.createGain()
      const delayGain = audioContext.createGain()
      setDelay(delayt)
      setMasterGain(masterGain)
      setDelayGain(delayGain)
      const createdFilters = eqBands.map((band) => {
        const filter = audioContext.createBiquadFilter()
        filter.type =
          band <= 32 ? "lowshelf" : band >= 16000 ? "highshelf" : "peaking"
        filter.gain.value = Math.random() * 40 - 20
        filter.Q.value = 1
        filter.frequency.value = band
        return filter
      })

      setFilters(createdFilters)
    }
  }, [audioContext])

  useEffect(() => {
    if (
      audio &&
      audioContext &&
      filters.length > 0 &&
      delay &&
      masterGain &&
      delayGain
    ) {
      const mediaNode = audioContext.createMediaElementSource(audio)
      mediaNode.connect(filters[0])
      for (let i = 0; i < filters.length - 1; i++) {
        filters[i].connect(filters[i + 1])
      }
      filters[filters.length - 1].connect(delay)
      filters[filters.length - 1].connect(audioContext.destination)
      delay.delayTime.setValueAtTime(0.5, audioContext.currentTime)

      filters[filters.length - 1].connect(masterGain)
      masterGain.connect(audioContext.destination)
      delay.connect(delayGain)
      delayGain.connect(audioContext.destination)
      delay.connect(audioContext.destination)
      return () => {
        filters.forEach((filter) => filter.disconnect())
        delay.disconnect()
        masterGain.disconnect()
        delayGain.disconnect()
      }
    }
  }, [audio, audioContext, filters, delay, masterGain, delayGain])

  const handleSliderChange = (index: number, value: string) => {
    if (filters[index]) {
      filters[index].gain.value = parseFloat(value)
    }
  }

  return (
    <div>
      {filters.map((filter, index) => (
        <input
          key={index}
          type="range"
          min={-40}
          max={40}
          step={0.1}
          defaultValue={filter.gain.value}
          onChange={(e) => handleSliderChange(index, e.target.value)}
        />
      ))}

      <button onClick={initializeAudioContext}>Initialize Audio Context</button>
      <BlankWaveSurfer
        media={audio}
        dragToSeek
        width="100%"
        height="auto"
        autoScroll
        normalize
        autoCenter
        container={"#Waveform"}
      />
      <P5WaveFormSketchWrapper colorValue={"colorValue"} />
    </div>
  )
}

export default AudioEqualizer
