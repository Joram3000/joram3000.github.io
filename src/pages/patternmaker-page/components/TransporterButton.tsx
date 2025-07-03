import React, { useCallback, useState, useEffect } from "react"
import * as Tone from "tone"
import { ActionIcon } from "@mantine/core"
import { IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react"
interface TransporterButtonProps {
  color: string
}

const TransporterButton: React.FC<TransporterButtonProps> = ({ color }) => {
  const [playState, setPlayState] = useState(Tone.Transport.state)

  useEffect(() => {
    // Listen for transport state changes
    const updateState = () => setPlayState(Tone.Transport.state)

    // Update state immediately
    updateState()

    // Set up interval to check state periodically
    const interval = setInterval(updateState, 100)

    return () => clearInterval(interval)
  }, [])

  const toggle = useCallback(async () => {
    await Tone.start()
    Tone.Transport.toggle()
    setPlayState(Tone.Transport.state)
  }, [])

  return (
    <ActionIcon variant="outline" color={color} onClick={toggle} size="xl">
      {playState === "started" ? <IconPlayerPause /> : <IconPlayerPlay />}
    </ActionIcon>
  )
}

export default TransporterButton
