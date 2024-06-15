import React, { useEffect, useState, useRef } from "react"
import BlankWaveSurfer from "../WaveSurferPlayer/BlankWaveSurfer"
import { Slider } from "@mantine/core"

interface AudioEqualizerProps {
  audiofile: string
}

const AudioEqualizer: React.FC<AudioEqualizerProps> = ({ audiofile }) => {
  const [audio] = useState(new Audio(audiofile))
  const [audioContext] = useState<AudioContext | null>(new AudioContext())
  const mediaNode = useRef<MediaElementAudioSourceNode | null>(null)
  const lowPassFilter = useRef<BiquadFilterNode | null>(null)
  const [lowpassFilterFrequency, setLowpassFilterFrequency] = useState(300)

  useEffect(() => {
    if (audioContext) {
      lowPassFilter.current = audioContext.createBiquadFilter()
      lowPassFilter.current.type = "lowpass"

      if (!mediaNode.current) {
        mediaNode.current = audioContext.createMediaElementSource(audio)
      }

      if (mediaNode.current) {
        mediaNode.current.connect(lowPassFilter.current)
        lowPassFilter.current.connect(audioContext.destination)
        return () => {
          mediaNode.current?.disconnect()
        }
      }
    }
  }, [audio, audioContext])

  const handleFaderChange = (e: number) => {
    if (lowPassFilter.current) {
      lowPassFilter.current.frequency.value = e
    }
  }

  return (
    <div>
      <Slider
        min={0}
        max={4000}
        step={0.1}
        defaultValue={lowpassFilterFrequency}
        onChange={(e) => handleFaderChange(e)}
      />
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
