import { useRef, useEffect } from "react"
import { useWavesurfer } from "@wavesurfer/react"
import type WaveSurfer from "wavesurfer.js"

interface UseModernWaveSurferProps {
  url: string
  waveColor?: string
  progressColor?: string
  cursorColor?: string
  height?: number
  barWidth?: number
  barGap?: number
  barRadius?: number
  normalize?: boolean
  backend?: "WebAudio" | "MediaElement"
  onReady?: (wavesurfer: WaveSurfer) => void
  onPlay?: () => void
  onPause?: () => void
  onFinish?: () => void
  onSeek?: (currentTime: number) => void
  onError?: (error: string) => void
}

export const useModernWaveSurfer = ({
  url,
  waveColor = "#1976d2",
  progressColor = "#1971c2",
  cursorColor = "#1971c2",
  height = 100,
  barWidth = 2,
  barGap = 1,
  barRadius = 2,
  normalize = true,
  backend = "WebAudio",
  onReady,
  onPlay,
  onPause,
  onFinish,
  onSeek,
  onError,
}: UseModernWaveSurferProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url,
    waveColor,
    progressColor,
    cursorColor,
    height,
    barWidth,
    barGap,
    barRadius,
    normalize,
    backend,
  })

  // Handle events separately using useEffect
  useEffect(() => {
    if (!wavesurfer) return

    const handleReady = () => onReady?.(wavesurfer)
    const handlePlay = () => onPlay?.()
    const handlePause = () => onPause?.()
    const handleFinish = () => onFinish?.()
    const handleTimeupdate = (currentTime: number) => onSeek?.(currentTime)
    const handleError = (error: Error) => onError?.(error.message)

    wavesurfer.on("ready", handleReady)
    wavesurfer.on("play", handlePlay)
    wavesurfer.on("pause", handlePause)
    wavesurfer.on("finish", handleFinish)
    wavesurfer.on("timeupdate", handleTimeupdate)
    wavesurfer.on("error", handleError)

    return () => {
      wavesurfer.un("ready", handleReady)
      wavesurfer.un("play", handlePlay)
      wavesurfer.un("pause", handlePause)
      wavesurfer.un("finish", handleFinish)
      wavesurfer.un("timeupdate", handleTimeupdate)
      wavesurfer.un("error", handleError)
    }
  }, [wavesurfer, onReady, onPlay, onPause, onFinish, onSeek, onError])

  return {
    containerRef,
    wavesurfer,
    isReady,
    isPlaying,
    currentTime,
  }
}

export default useModernWaveSurfer
