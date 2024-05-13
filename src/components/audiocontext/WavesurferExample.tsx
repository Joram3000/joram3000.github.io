import React, { useEffect, useState, useRef } from "react" // Importing necessary modules from React
import treingvbluesberber from "../../assets/music/treingvbluesberber.mp3" // Importing the audio file
import BlankWaveSurfer from "../WaveSurferPlayer/BlankWaveSurfer" // Importing a WaveSurfer component
import { Slider } from "@mantine/core"

const AudioEqualizer: React.FC = () => {
  const [audio] = useState(new Audio(treingvbluesberber)) // State hook for audio

  const [audioContext] = useState<AudioContext | null>(
    new AudioContext(), // State hook for audio context
  )
  const mediaNode = useRef<MediaElementAudioSourceNode | null>(null) // Ref for media node
  const lowPassFilter = useRef<BiquadFilterNode | null>(null) // Ref for low-pass filter
  const [lowpassFilterFrequency, setLowpassFilterFrequency] = useState(300) // State hook for lowpass filter frequency

  useEffect(() => {
    if (audioContext) {
      // Create a low-pass filter
      lowPassFilter.current = audioContext.createBiquadFilter()
      lowPassFilter.current.type = "lowpass" // Set filter type to lowpass

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
