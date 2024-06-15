import React, { useState, useRef } from "react"

interface AudioAnalyserProps {
  audiofile: string
}

const AudioAnalyser: React.FC<AudioAnalyserProps> = ({ audiofile }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  const startAudio = async () => {
    try {
      const audioContext = new window.AudioContext()
      const audioElement = audioRef.current
      const canvasElement = canvasRef.current

      if (!audioElement || !canvasElement) return

      const sourceNode = audioContext.createMediaElementSource(audioElement)
      const analyserNode = audioContext.createAnalyser()
      analyserNode.fftSize = 2048
      const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1)

      sourceNode.connect(analyserNode)
      analyserNode.connect(audioContext.destination)
      analyserNode.connect(javascriptNode)
      javascriptNode.connect(audioContext.destination)

      setIsPlaying(true)

      const draw = () => {
        const canvasContext = canvasElement.getContext("2d")
        const bufferLength = analyserNode.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        analyserNode.getByteTimeDomainData(dataArray)
        if (!canvasContext) return
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height)
        canvasContext.fillStyle = "rgb(255, 255, 255)"
        canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height)
        canvasContext.lineWidth = 2
        canvasContext.strokeStyle = "rgb(0, 0, 0)"
        canvasContext.beginPath()

        const sliceWidth = (canvasElement.width * 1.0) / bufferLength
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0
          const y = (v * canvasElement.height) / 2

          if (i === 0) {
            canvasContext.moveTo(x, y)
          } else {
            canvasContext.lineTo(x, y)
          }

          x += sliceWidth
        }

        canvasContext.lineTo(canvasElement.width, canvasElement.height / 2)
        canvasContext.stroke()

        animationRef.current = requestAnimationFrame(draw)
      }

      audioElement.play()
      draw()
    } catch (error) {
      console.error("Error starting audio:", error)
    }
  }

  startAudio()
  return (
    <div>
      <canvas ref={canvasRef} width="512" height="256"></canvas>

      <div id="controls">
        <output id="msg">{isPlaying ? "Audio playing..." : ""}</output>
      </div>
      <audio controls ref={audioRef} src={audiofile}></audio>
    </div>
  )
}

export default AudioAnalyser
