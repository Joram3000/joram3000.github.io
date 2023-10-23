import React, { useCallback, useState } from "react";
import * as Tone from "tone";
import { ActionIcon } from "@mantine/core";
import { IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react";
interface TransporterButtonProps {
  color: string;
}

const TransporterButton: React.FC<TransporterButtonProps> = ({ color }) => {
  const [playState, setPlayState] = useState(Tone.Transport.state);

  const toggle = useCallback(() => {
    Tone.start();
    Tone.Transport.toggle();
    setPlayState(Tone.Transport.state);
  }, []);

  return (
    <ActionIcon variant="outline" color={color} onClick={toggle} size="xl">
      {playState === "started" ? <IconPlayerPause /> : <IconPlayerPlay />}
    </ActionIcon>
  );
};

export default TransporterButton;
