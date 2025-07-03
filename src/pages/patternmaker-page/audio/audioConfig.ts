import * as Tone from "tone"

// Create audio context and nodes once
export const output = new Tone.Volume(-12).toDestination()
export const lpFilter = new Tone.Filter(8000, "lowpass", -48).connect(output)
export const hpFilter = new Tone.Filter(0, "highpass").connect(lpFilter)

// Create a pool of players for each sample to avoid creating new buffer sources
interface SamplePool {
  [key: string]: Tone.Player[]
}

const POOL_SIZE = 4 // Number of players per sample

const sampleUrls = {
  A1: "https://res.cloudinary.com/dqqb0ldgk/video/upload/v1651657689/Drumsounds/Loud/cymkik_b3staa.wav",
  B1: "https://res.cloudinary.com/dqqb0ldgk/video/upload/v1651657689/Drumsounds/Loud/jaydeesnare_qc9dw5.wav",
  C1: "https://res.cloudinary.com/dqqb0ldgk/video/upload/v1651657689/Drumsounds/Metal/cowbell_aihfsc.wav",
  D1: "https://res.cloudinary.com/dqqb0ldgk/video/upload/v1651657689/Drumsounds/Metal/hih_gmxx95.wav",
  E1: "https://res.cloudinary.com/dqqb0ldgk/video/upload/v1651657689/Drumsounds/Soft/conga_uvdi3n.wav",
  F1: "https://res.cloudinary.com/dqqb0ldgk/video/upload/v1651657689/Drumsounds/Soft/snap_mtp0yq.wav",
  G1: "https://res.cloudinary.com/dqqb0ldgk/video/upload/v1651657689/Drumsounds/Wood/kick_i1pqe6.wav",
  A2: "https://res.cloudinary.com/dqqb0ldgk/video/upload/v1651657689/Drumsounds/Wood/clap_xmxx6f.wav",
}

const samplePool: SamplePool = {}
let isConnected = false
const currentPlayerIndex: { [key: string]: number } = {}

// Initialize the sample pool
Object.keys(sampleUrls).forEach((note) => {
  samplePool[note] = []
  currentPlayerIndex[note] = 0

  for (let i = 0; i < POOL_SIZE; i++) {
    const player = new Tone.Player({
      url: sampleUrls[note as keyof typeof sampleUrls],
      fadeIn: 0,
      fadeOut: 0.05,
    })
    samplePool[note].push(player)
  }
})

export const connectSamplePool = (outputNode: Tone.OutputNode) => {
  if (!isConnected) {
    Object.keys(samplePool).forEach((note) => {
      samplePool[note].forEach((player) => {
        player.connect(outputNode)
      })
    })
    isConnected = true
  }
}

export const disconnectSamplePool = () => {
  if (isConnected) {
    Object.keys(samplePool).forEach((note) => {
      samplePool[note].forEach((player) => {
        player.disconnect()
      })
    })
    isConnected = false
  }
}

// Round-robin player selection to reuse existing players
export const playSample = (note: string, time?: Tone.Unit.Time) => {
  if (!samplePool[note]) return

  const players = samplePool[note]
  const playerIndex = currentPlayerIndex[note]
  const player = players[playerIndex]

  if (player && player.loaded) {
    // Stop the player if it's currently playing to restart it
    if (player.state === "started") {
      player.stop()
    }

    if (time) {
      player.start(time)
    } else {
      player.start()
    }
  }

  // Move to next player in the pool
  currentPlayerIndex[note] = (playerIndex + 1) % POOL_SIZE
}
