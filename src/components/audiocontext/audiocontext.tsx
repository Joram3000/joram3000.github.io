import React from "react"
// import treingvbluesberber from "../../assets/music/treingvbluesberber.mp3"

interface AudioContextProps {
  children: React.ReactNode
}

const AudioContextt: React.FC<AudioContextProps> = ({ children }) => {
  console.log("AudioContextt")
  // Create your own media element
  // const audio = new Audio()
  // audio.controls = true
  // audio.src = treingvbluesberber

  // Optionally, add the audio to the page to see the controls
  // document.body.appendChild(audio)

  // Now, create a Web Audio equalizer
  // Create Web Audio context
  // const audioContext = new AudioContext()

  // Create a biquad filter for each band

  // Connect the audio to the equalizer
  // audio.addEventListener(
  //   "canplay",
  //   () => {
  //     // Create a MediaElementSourceNode from the audio element
  //     const mediaNode = audioContext.createMediaElementSource(audio)

  //     // Connect the node to the audio output
  //     mediaNode.connect(audioContext.destination)
  //   },
  //   { once: true },
  // )

  // // Create a vertical slider for each band
  // const container = document.createElement("p")

  // document.body.appendChild(container)

  return children
}

export default AudioContextt
