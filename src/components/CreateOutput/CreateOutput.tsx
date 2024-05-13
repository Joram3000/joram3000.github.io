import React, { ReactNode, useEffect } from "react"
import treingvbluesberber from "../../assets/music/treingvbluesberber.mp3"
import P5WaveFormSketchWrapper from "../../pages/patternmaker-page/components/P5WaveFormSketchWrapper"
import * as Tone from "tone"

interface CreateOutputProps {
  children: ReactNode
}
const channel = new Tone.Channel(-0.25, -1)
const output = new Tone.Volume(-12).toDestination()
const lpFilter = new Tone.Filter(8000, "lowpass", -48).connect(output)
const hpFilter = new Tone.Filter(0, "highpass").connect(lpFilter)

function CreateOutput({ children }: CreateOutputProps) {
  // console.log("hoi")

  return <div>{children}</div>
}

export default CreateOutput
