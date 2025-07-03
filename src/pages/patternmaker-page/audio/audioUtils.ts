import * as Tone from "tone"
import { disconnectSamplePool } from "./audioConfig"

// Cleanup function to dispose of all audio resources
export const cleanupAudioResources = () => {
  // Stop transport
  if (Tone.Transport.state === "started") {
    Tone.Transport.stop()
  }

  // Cancel all scheduled events
  Tone.Transport.cancel()

  // Disconnect sample pool
  disconnectSamplePool()

  // Clear all sequences and dispose of them
  // This helps prevent memory leaks
  Tone.Transport.scheduleRepeat(() => {}, "1n") // Reset any repeating events
}

// Function to ensure audio context is properly initialized
export const initAudioContext = async () => {
  if (Tone.context.state !== "running") {
    await Tone.start()
  }
}
