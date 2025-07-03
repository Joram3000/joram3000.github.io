import { RefObject, useState, useEffect, useCallback } from "react"
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js"
import HoverPlugin from "wavesurfer.js/dist/plugins/hover.js"
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.js"
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.js"

export const useWavesurfer = (
  containerRef: RefObject<HTMLDivElement>,
  options: WaveSurferOptions,
): WaveSurfer | null => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize WaveSurfer only after user interaction
  const initializeWaveSurfer = useCallback(() => {
    if (isInitialized || !containerRef.current) return

    try {
      const ws = WaveSurfer.create({
        ...options,
        container: containerRef.current,
        backend: "WebAudio",
        interact: true,
        hideScrollbar: true,
        normalize: true,
        // Remove invalid audioRate option - this should be set via setPlaybackRate after creation
        // Performance optimizations for smoother playback
        cursorWidth: 2, // Enable cursor for proper visual feedback
        cursorColor: "#ff6b35",
        // Prevent automatic AudioContext creation
        media: undefined,
        // Waveform rendering optimizations
        minPxPerSec: 50,
        // barWidth: 1,
        // barGap: 1,
      })

      // Set the initial playback rate after creation
      if (options.audioRate && options.audioRate !== 1.0) {
        ws.setPlaybackRate(options.audioRate, false)
      }

      // Add event listeners
      ws.on("ready", () => {
        console.log("WaveSurfer ready")
      })

      ws.on("load", () => {
        console.log("WaveSurfer loaded successfully")
      })

      // Register plugins with error handling
      try {
        ws.registerPlugin(ZoomPlugin.create({ scale: 0.01 }))
        ws.registerPlugin(
          HoverPlugin.create({
            lineColor: "#ff0000",
            lineWidth: 1,
          }),
        )
        ws.registerPlugin(
          TimelinePlugin.create({
            height: 40,
            style: {
              color: "orange",
              transform: "translate(-0px,-40px)",
            },
          }),
        )
      } catch (pluginError) {
        console.error("Plugin registration error:", pluginError)
      }

      setWavesurfer(ws)
      setIsInitialized(true)
    } catch (error) {
      console.error("Failed to create WaveSurfer:", error)
    }
  }, [isInitialized, containerRef, options])

  // Add user interaction listeners to trigger initialization
  useEffect(() => {
    const handleUserInteraction = () => {
      initializeWaveSurfer()
    }

    // Add event listeners for user interaction
    document.addEventListener("click", handleUserInteraction, { once: true })
    document.addEventListener("keydown", handleUserInteraction, { once: true })
    document.addEventListener("touchstart", handleUserInteraction, {
      once: true,
    })

    // Cleanup function
    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
    }
  }, [initializeWaveSurfer])

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (wavesurfer) {
        try {
          wavesurfer.destroy()
        } catch (error) {
          console.error("Error destroying WaveSurfer:", error)
        }
        setWavesurfer(null)
      }
    }
  }, [wavesurfer])

  return wavesurfer
}
