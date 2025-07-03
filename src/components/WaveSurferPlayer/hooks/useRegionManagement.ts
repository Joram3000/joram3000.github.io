import { useEffect, useCallback, useRef } from "react"
import { Region } from "wavesurfer.js/dist/plugins/regions.js"
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js"
import WaveSurfer from "wavesurfer.js"

export interface RegionManagementHook {
  onClickRegionPlay: (region: Region) => void
  onCueClick: (isDown: boolean) => void
}

export const useRegionManagement = (
  wavesurfer: WaveSurfer | null,
  wsRegions: RegionsPlugin | null,
  cuePoint: Region | null,
  playerState: { loop: boolean },
  setActiveRegion: (region: Region | null) => void,
  setSavedRegions: (regions: Region[]) => void,
  setCuePoint: (region: Region | null) => void,
  onRegionPlay?: (region: Region) => void,
): RegionManagementHook => {
  // Use refs to track region priority outside useEffect scope
  const selectedRegionRef = useRef<Region | null>(null)
  const loopingRegionRef = useRef<Region | null>(null)

  // Helper function to find the priority region when overlapping
  const getPriorityRegion = useCallback(
    (currentTime: number): Region | null => {
      if (!wsRegions) return null

      const allRegions = wsRegions.getRegions().filter((r) => r !== cuePoint)
      const currentRegions = allRegions.filter(
        (r) => currentTime >= r.start && currentTime <= (r.end || Infinity),
      )

      if (currentRegions.length === 0) return null
      if (currentRegions.length === 1) return currentRegions[0]

      // Priority logic for overlapping regions:
      // 1. Selected region (manually clicked) has highest priority
      if (
        selectedRegionRef.current &&
        currentRegions.includes(selectedRegionRef.current)
      ) {
        console.log(
          "Using selected region priority:",
          selectedRegionRef.current.id,
        )
        return selectedRegionRef.current
      }

      // 2. Currently looping region has priority if still in bounds
      if (
        loopingRegionRef.current &&
        currentRegions.includes(loopingRegionRef.current)
      ) {
        console.log(
          "Using looping region priority:",
          loopingRegionRef.current.id,
        )
        return loopingRegionRef.current
      }

      // 3. Smallest region (by duration) gets priority
      const priorityRegion = currentRegions.reduce((smallest, current) => {
        const smallestDuration = (smallest.end || 0) - smallest.start
        const currentDuration = (current.end || 0) - current.start
        return currentDuration < smallestDuration ? current : smallest
      })

      console.log(
        "Using smallest region priority:",
        priorityRegion.id,
        "among",
        currentRegions.map((r) => r.id),
      )
      return priorityRegion
    },
    [wsRegions, cuePoint],
  )

  // Enhanced region management with priority system
  useEffect(() => {
    if (!wsRegions || !wavesurfer) return

    const unsubscribers: (() => void)[] = []
    let regionsInitialized = false
    let lastUpdateTime = 0 // Throttling for region updates

    const initializeRegions = () => {
      if (regionsInitialized) {
        console.log("Regions already initialized, skipping...")
        return
      }

      try {
        console.log("Initializing regions...")
        wsRegions.enableDragSelection({
          color: "rgba(255, 0, 0, 0.2)",
        })

        // Check if cue region already exists
        const existingRegions = wsRegions.getRegions()
        const existingCue = existingRegions.find((r) => r.id === "CUE")

        if (!existingCue) {
          const cueRegion = wsRegions.addRegion({
            id: "CUE",
            start: 4.96,
            color: "orange",
          })
          setCuePoint(cueRegion)
          console.log("Created cue region:", cueRegion)
        }

        // Update saved regions to include all regions
        const allRegions = wsRegions.getRegions()
        setSavedRegions([...allRegions])
        console.log("Updated saved regions:", allRegions)

        const duration = wavesurfer.getDuration()
        if (duration) {
          const cueRegion =
            existingCue || wsRegions.getRegions().find((r) => r.id === "CUE")
          if (cueRegion) {
            const seekToPercentage = cueRegion.start / duration
            wavesurfer.seekTo(seekToPercentage)
          }
        }

        regionsInitialized = true
        console.log("Regions initialization complete")
      } catch (error) {
        console.error("Error initializing regions:", error)
      }
    }

    const handleRegionDoubleClick = (region: Region) => {
      try {
        const regions = wsRegions.getRegions()
        if (region !== regions[0]) {
          region.remove()
          setSavedRegions([...wsRegions.getRegions()])
        }
      } catch (error) {
        console.error("Error removing region:", error)
      }
    }

    const handleRegionCreated = () => {
      console.log("Region created, updating saved regions...")
      setSavedRegions([...wsRegions.getRegions()])
    }

    const handleRegionUpdated = () => {
      try {
        // Throttle region updates to prevent excessive seeking
        if (Date.now() - lastUpdateTime < 100) return // 100ms throttle
        lastUpdateTime = Date.now()

        const regions = wsRegions.getRegions()
        const updatedCuepoint = regions[0]
        const duration = wavesurfer.getDuration()

        if (updatedCuepoint && duration && !wavesurfer.isPlaying()) {
          // Only seek if not currently playing to avoid stutters
          const seekToPercentage = updatedCuepoint.start / duration
          wavesurfer.seekTo(seekToPercentage)
        }
      } catch (error) {
        console.error("Error updating region:", error)
      }
    }

    // Main event listeners
    unsubscribers.push(
      wavesurfer.on("decode", initializeRegions),
      wavesurfer.on("ready", initializeRegions),
      wsRegions.on("region-double-clicked", handleRegionDoubleClick),
      wsRegions.on("region-created", handleRegionCreated),
      wsRegions.on("region-updated", handleRegionUpdated),
      wsRegions.on("region-in", (region: Region) => {
        // console.log("Region-in:", region.id, "Loop:", playerState.loop)

        // Check if this should be the priority region
        const currentTime = wavesurfer.getCurrentTime()
        const priorityRegion = getPriorityRegion(currentTime)

        if (priorityRegion === region || !priorityRegion) {
          setActiveRegion(region)
          if (playerState.loop) {
            loopingRegionRef.current = region
            console.log("Set looping region:", region.id)
          }
        }
      }),
      wsRegions.on("region-out", (region: Region) => {
        // console.log(
        //   "Region-out:",
        //   region.id,
        //   "Was looping:",
        //   loopingRegionRef.current?.id,
        // )

        if (region === cuePoint) {
          setActiveRegion(null)
          // Defer cue point seeking to avoid audio stutters
          setTimeout(() => {
            try {
              if (!wavesurfer.isPlaying()) {
                const duration = wavesurfer.getDuration()
                if (duration) {
                  const seekToPercentage = cuePoint.start / duration
                  wavesurfer.seekTo(seekToPercentage)
                }
              }
            } catch (error) {
              console.error("Error seeking to cue point:", error)
            }
          }, 50)
        } else if (
          playerState.loop &&
          region === loopingRegionRef.current &&
          region.end
        ) {
          // Only loop if this region is the currently active looping region
          console.log("Looping priority region:", region.id)
          try {
            // Schedule the loop restart to avoid audio glitches
            const loopTimeout = setTimeout(() => {
              try {
                const duration = wavesurfer.getDuration()
                if (duration && wavesurfer.isPlaying()) {
                  const seekToPercentage = region.start / duration
                  wavesurfer.seekTo(seekToPercentage)
                }
              } catch (seekError) {
                console.error("Error looping region:", seekError)
              }
            }, 10) // Small delay to prevent audio stutters

            // Clear timeout on cleanup
            return () => clearTimeout(loopTimeout)
          } catch (error) {
            console.error("Error setting up region loop:", error)
          }
        } else {
          // Check if we should switch to another overlapping region
          const currentTime = wavesurfer.getCurrentTime()
          const nextPriorityRegion = getPriorityRegion(currentTime)

          if (nextPriorityRegion && nextPriorityRegion !== region) {
            // Switch to the next priority region
            setActiveRegion(nextPriorityRegion)
            if (playerState.loop) {
              loopingRegionRef.current = nextPriorityRegion
              // console.log("Switched to priority region:", nextPriorityRegion.id)
            }
          } else if (!nextPriorityRegion) {
            // No more regions at current position
            setActiveRegion(null)
            loopingRegionRef.current = null
          }
        }
      }),
    )

    return () => {
      unsubscribers.forEach((unsub) => unsub())
    }
  }, [
    wavesurfer,
    wsRegions,
    cuePoint,
    playerState.loop,
    setActiveRegion,
    setSavedRegions,
    setCuePoint,
    getPriorityRegion,
  ])

  const onClickRegionPlay = useCallback(
    (region: Region) => {
      if (!wavesurfer || !region) return

      // Set this as the selected region for priority
      selectedRegionRef.current = region
      // console.log("Selected region for priority:", region.id)

      try {
        const duration = wavesurfer.getDuration()
        if (duration && duration > 0) {
          // Stop current playback first to prevent glitches
          const wasPlaying = wavesurfer.isPlaying()
          if (wasPlaying) {
            wavesurfer.pause()
          }

          // Use a small delay to ensure clean audio transition
          setTimeout(() => {
            try {
              const seekToPercentage = region.start / duration
              wavesurfer.seekTo(seekToPercentage)

              // Set as active and looping region
              setActiveRegion(region)
              if (playerState.loop) {
                loopingRegionRef.current = region
                console.log(
                  "Set manually selected region as looping:",
                  region.id,
                )
              }

              // Always start playback when clicking a region button! 👑
              setTimeout(() => {
                wavesurfer.play()
                onRegionPlay?.(region)
              }, 20) // Small delay for smooth transition
            } catch (seekError) {
              console.error("Error seeking to region:", seekError)
            }
          }, 10)
        }
      } catch (error) {
        console.error("Error playing region:", error)
      }
    },
    [wavesurfer, onRegionPlay, playerState.loop, setActiveRegion],
  )

  const onCueClick = useCallback(
    (isDown: boolean) => {
      if (!cuePoint || !wavesurfer) return

      try {
        if (isDown) {
          // Start playing from cue point
          const duration = wavesurfer.getDuration()
          if (duration && duration > 0) {
            const wasPlaying = wavesurfer.isPlaying()
            if (wasPlaying) {
              wavesurfer.pause()
            }

            // Smooth transition to cue point
            setTimeout(() => {
              try {
                const seekToPercentage = cuePoint.start / duration
                wavesurfer.seekTo(seekToPercentage)
                setTimeout(() => {
                  wavesurfer.play()
                }, 20)
              } catch (seekError) {
                console.error("Error seeking to cue:", seekError)
              }
            }, 10)
          }
        } else {
          // Stop and return to cue point
          if (wavesurfer.isPlaying()) {
            wavesurfer.pause()
          }

          setTimeout(() => {
            try {
              const duration = wavesurfer.getDuration()
              if (duration && duration > 0) {
                const seekToPercentage = cuePoint.start / duration
                wavesurfer.seekTo(seekToPercentage)
              }
            } catch (seekError) {
              console.error("Error returning to cue:", seekError)
            }
          }, 10)
        }
      } catch (error) {
        console.error("Error handling cue click:", error)
      }
    },
    [cuePoint, wavesurfer],
  )

  return {
    onClickRegionPlay,
    onCueClick,
  }
}
