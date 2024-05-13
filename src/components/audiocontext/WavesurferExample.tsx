import React, { useEffect, useState, useCallback, useRef } from "react"
import treingvbluesberber from "../../assets/music/treingvbluesberber.mp3"
import BlankWaveSurfer from "../WaveSurferPlayer/BlankWaveSurfer"

const AudioEqualizer: React.FC = () => {
  const [audio] = useState(new Audio(treingvbluesberber))
  const [audioContextJ, setAudioContext] = useState<AudioContext | null>(null)
  const filters = useRef<BiquadFilterNode[]>([])
  const [filtersReady, setFiltersReady] = useState(false)
  const delay = useRef<DelayNode | null>(null)
  const mediaNode = useRef<MediaElementAudioSourceNode | null>(null)
  const initializeAudioContext = async () => {
    const context = new AudioContext()
    setAudioContext(context)
  }

  useEffect(() => {
    if (audioContextJ) {
      if (!mediaNode.current) {
        mediaNode.current = audioContextJ.createMediaElementSource(audio)
      }
      const eqBands = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]
      delay.current = audioContextJ.createDelay(3)
      filters.current = eqBands.map((band) => {
        const filter = audioContextJ.createBiquadFilter()
        filter.type =
          band <= 32 ? "lowshelf" : band >= 16000 ? "highshelf" : "peaking"
        filter.gain.value = Math.random() * 40 - 20
        filter.Q.value = 1
        filter.frequency.value = band
        return filter
      })

      if (mediaNode.current && filters.current.length > 0 && delay.current) {
        mediaNode.current.connect(filters.current[0])
        setFiltersReady(true)

        for (let i = 0; i < filters.current.length - 1; i++) {
          filters.current[i].connect(filters.current[i + 1])
        }
        filters.current[filters.current.length - 1].connect(delay.current)
        filters.current[filters.current.length - 1].connect(
          audioContextJ.destination,
        )
        delay.current.delayTime.setValueAtTime(0.5, audioContextJ.currentTime)
        delay.current.connect(audioContextJ.destination)
        return () => {
          mediaNode.current?.disconnect()
          filters.current.forEach((filter, i) => {
            if (filters.current[i + 1]) {
              filter.disconnect(filters.current[i + 1])
            }
          })
          if (filters.current.length > 0 && delay.current) {
            filters.current[filters.current.length - 1].disconnect(
              delay.current,
            )
          }
          delay.current?.disconnect()
        }
      }
    }
  }, [audio, audioContextJ])

  const handleSliderChange = useCallback((index: number, value: string) => {
    if (filters.current[index]) {
      filters.current[index].gain.value = parseFloat(value)
    }
  }, [])
  return (
    <div>
      {filtersReady &&
        filters.current.map((filter, index) => (
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
    </div>
  )
}

export default AudioEqualizer
