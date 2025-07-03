import { RefObject, useState, useEffect, useRef } from "react"
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js"

export const useWavesurfer = (
  containerRef: RefObject<HTMLDivElement>,
  options: WaveSurferOptions,
): WaveSurfer | null => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)
  const wsRef = useRef<WaveSurfer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clean up previous instance if it exists
    if (wsRef.current) {
      wsRef.current.destroy()
      wsRef.current = null
    }

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    })

    wsRef.current = ws
    setWavesurfer(ws)

    return () => {
      if (wsRef.current) {
        wsRef.current.destroy()
        wsRef.current = null
      }
      setWavesurfer(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, options.url, options.waveColor, options.progressColor]) // Only re-initialize when critical options change

  return wavesurfer
}
