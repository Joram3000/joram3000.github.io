import { useCallback, useEffect } from "react"
import WaveSurfer from "wavesurfer.js"
import { WaveSurferState } from "./useWaveSurferState"

export interface PlayerControlsHook {
  onPlayClick: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onVolumeChange: (volume: number) => void
  onZoomChange: (zoom: number) => void
  onAudioRateChange: (audioRate: number) => void
  onAudioRateChangeEnd: (audioRate: number) => void
  toggleLoop: () => void
}

export const usePlayerControls = (
  wavesurfer: WaveSurfer | null,
  playerState: WaveSurferState,
  updatePlayerState: (updates: Partial<WaveSurferState>) => void,
  follow: boolean,
): PlayerControlsHook => {
  // FOLLOW effect
  useEffect(() => {
    wavesurfer?.setOptions({ autoScroll: follow, autoCenter: follow })
  }, [follow, wavesurfer])

  // Optimized callback functions
  const onPlayClick = useCallback(() => {
    if (!wavesurfer) return
    try {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.playPause()
    } catch (error) {
      console.error("Error toggling play/pause:", error)
    }
  }, [wavesurfer])

  const onZoomIn = useCallback(() => {
    if (playerState.zoom < 300) {
      const newZoom = playerState.zoom + 5
      updatePlayerState({ zoom: newZoom })
      // Apply zoom instantly for royal smoothness! 👑
      if (wavesurfer) {
        try {
          wavesurfer.zoom(newZoom)
        } catch (error) {
          console.error("Error applying instant zoom in:", error)
        }
      }
    }
  }, [playerState.zoom, updatePlayerState, wavesurfer])

  const onZoomOut = useCallback(() => {
    if (playerState.zoom > 10) {
      const newZoom = playerState.zoom - 5
      updatePlayerState({ zoom: newZoom })
      // Apply zoom instantly for royal smoothness! 👑
      if (wavesurfer) {
        try {
          wavesurfer.zoom(newZoom)
        } catch (error) {
          console.error("Error applying instant zoom out:", error)
        }
      }
    }
  }, [playerState.zoom, updatePlayerState, wavesurfer])

  const onVolumeChange = useCallback(
    (volume: number) => {
      updatePlayerState({ volume })
      if (wavesurfer) {
        wavesurfer.setVolume(volume)
      }
    },
    [updatePlayerState, wavesurfer],
  )

  const onZoomChange = useCallback(
    (zoom: number) => {
      updatePlayerState({ zoom })
      if (wavesurfer) {
        try {
          wavesurfer.zoom(zoom)
        } catch (error) {
          console.error("Error applying instant zoom:", error)
        }
      }
    },
    [updatePlayerState, wavesurfer],
  )

  const onAudioRateChange = useCallback(
    (audioRate: number) => {
      if (audioRate >= 0.01 && audioRate <= 2.0 && wavesurfer) {
        updatePlayerState({ audioRate: audioRate })
        try {
          wavesurfer.setPlaybackRate(audioRate, false) // false = preserve pitch
          wavesurfer.play()
        } catch (error) {
          console.error("Error changing audioRate:", error)
        }
      }
    },
    [updatePlayerState, wavesurfer],
  )

  const onAudioRateChangeEnd = useCallback(
    (audioRate: number) => {
      if (audioRate >= 0.01 && audioRate <= 2.0 && wavesurfer) {
        try {
          updatePlayerState({ audioRate: audioRate })
          wavesurfer.setPlaybackRate(audioRate, false)
        } catch (error) {
          console.error("Error finalizing audioRate change:", error)
        }
      }
    },
    [updatePlayerState, wavesurfer],
  )

  const toggleLoop = useCallback(() => {
    updatePlayerState({ loop: !playerState.loop })
  }, [updatePlayerState, playerState.loop])

  return {
    onPlayClick,
    onZoomIn,
    onZoomOut,
    onVolumeChange,
    onZoomChange,
    onAudioRateChange,
    onAudioRateChangeEnd,
    toggleLoop,
  }
}
