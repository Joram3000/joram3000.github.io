import { useEffect, useCallback, useRef, useState } from "react"

// Extend Window interface for webkit support
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}

export interface AudioContextManager {
  initializeAudioContext: () => Promise<void>
  getAudioContext: () => AudioContext | null
  resumeAudioContext: () => Promise<void>
  isAudioContextReady: boolean
  audioContextError: string | null
}

export const useAudioContextManager = (): AudioContextManager => {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const initPromiseRef = useRef<Promise<void> | null>(null)

  const initializeAudioContext = useCallback(async (): Promise<void> => {
    // Prevent multiple simultaneous initializations
    if (initPromiseRef.current) {
      return initPromiseRef.current
    }

    initPromiseRef.current = (async () => {
      try {
        setError(null)

        // Get or create global AudioContext
        // const audioContext = await getGlobalAudioContext()

        setIsReady(true)
        // console.log(
        //   "AudioContext initialized successfully:",
        //   audioContext.state,
        // )
      } catch (error) {
        console.error("Failed to initialize AudioContext:", error)
        setError(
          error instanceof Error ? error.message : "Unknown AudioContext error",
        )
        setIsReady(false)
        throw error
      } finally {
        initPromiseRef.current = null
      }
    })()

    return initPromiseRef.current
  }, [])

  const resumeAudioContext = useCallback(async (): Promise<void> => {
    try {
      const audioContext = await getGlobalAudioContext()

      if (audioContext.state === "suspended") {
        await audioContext.resume()
        setIsReady(true)
      }
    } catch (error) {
      console.error("Failed to resume AudioContext:", error)
      setError(
        error instanceof Error
          ? error.message
          : "Failed to resume AudioContext",
      )
      // Try to reinitialize if resume fails
      await initializeAudioContext()
    }
  }, [initializeAudioContext])

  const getAudioContext = useCallback((): AudioContext | null => {
    return globalAudioContext
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Don't close global context on unmount, let it be managed globally
      setIsReady(false)
    }
  }, [])

  return {
    initializeAudioContext,
    getAudioContext,
    resumeAudioContext,
    isAudioContextReady: isReady,
    audioContextError: error,
  }
}

// Global AudioContext manager for sharing across components
let globalAudioContext: AudioContext | null = null
let initializationPromise: Promise<AudioContext> | null = null

export const getGlobalAudioContext = async (): Promise<AudioContext> => {
  // If already initializing, wait for it
  if (initializationPromise) {
    return initializationPromise
  }

  // If context exists and is usable, return it
  if (globalAudioContext && globalAudioContext.state !== "closed") {
    if (globalAudioContext.state === "suspended") {
      try {
        await globalAudioContext.resume()
      } catch (error) {
        console.error("Failed to resume existing AudioContext:", error)
        // Context is broken, recreate it
        globalAudioContext = null
      }
    }

    if (globalAudioContext) {
      return globalAudioContext
    }
  }

  // Create new AudioContext with proper error handling
  initializationPromise = (async () => {
    try {
      // Close existing context if any
      if (globalAudioContext) {
        try {
          await globalAudioContext.close()
        } catch (error) {
          console.warn("Error closing existing AudioContext:", error)
        }
      }

      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) {
        throw new Error("AudioContext is not supported in this browser")
      }

      globalAudioContext = new AudioContextClass({
        latencyHint: "interactive",
        sampleRate: 44100,
      })

      // Handle suspended state
      if (globalAudioContext.state === "suspended") {
        await globalAudioContext.resume()
      }

      // Add global error handling
      globalAudioContext.addEventListener("statechange", () => {
        console.log("Global AudioContext state:", globalAudioContext?.state)
      })

      return globalAudioContext
    } catch (error) {
      console.error("Failed to create global AudioContext:", error)
      globalAudioContext = null
      throw error
    } finally {
      initializationPromise = null
    }
  })()

  return initializationPromise
}

export const closeGlobalAudioContext = (): void => {
  if (globalAudioContext) {
    globalAudioContext.close()
    globalAudioContext = null
  }
}
