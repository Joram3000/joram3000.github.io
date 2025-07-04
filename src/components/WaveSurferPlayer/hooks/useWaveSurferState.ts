import { useState, useCallback } from "react"
import { Region } from "wavesurfer.js/dist/plugins/regions.js"

export interface WaveSurferState {
  isPlaying: boolean
  currentTime: number
  zoom: number
  loop: boolean
  audioRate: number
  volume: number
}

export interface WaveSurferStateHook {
  playerState: WaveSurferState
  updatePlayerState: (updates: Partial<WaveSurferState>) => void
  activeRegion: Region | null
  setActiveRegion: (region: Region | null) => void
  savedRegions: Region[]
  setSavedRegions: (regions: Region[]) => void
  cuePoint: Region | null
  setCuePoint: (region: Region | null) => void
}

export const useWaveSurferState = (
  onStateChange?: (state: WaveSurferState) => void,
): WaveSurferStateHook => {
  const [playerState, setPlayerState] = useState<WaveSurferState>({
    isPlaying: false,
    currentTime: 0,
    zoom: 11,
    loop: false,
    audioRate: 1.0,
    volume: 1,
  })

  const [activeRegion, setActiveRegion] = useState<Region | null>(null)
  const [savedRegions, setSavedRegions] = useState<Region[]>([])
  const [cuePoint, setCuePoint] = useState<Region | null>(null)

  const updatePlayerState = useCallback(
    (updates: Partial<WaveSurferState>) => {
      setPlayerState((prevState) => {
        const newState = { ...prevState, ...updates }
        onStateChange?.(newState)
        return newState
      })
    },
    [onStateChange],
  )

  return {
    playerState,
    updatePlayerState,
    activeRegion,
    setActiveRegion,
    savedRegions,
    setSavedRegions,
    cuePoint,
    setCuePoint,
  }
}
