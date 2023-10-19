import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SelectDrumSound } from "../../store/seqState/actions";
import { SegmentedControl } from "@mantine/core";

interface SelectSoundCompProps {
  color: string;
  selectedSound?: string;
}

const SelectSound: React.FC<SelectSoundCompProps> = ({
  color,
  selectedSound,
}) => {
  const [soundStyle, setSoundStyle] = useState(selectedSound ?? "Loud");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SelectDrumSound(soundStyle));
  }, [dispatch, soundStyle]);

  return (
    <SegmentedControl
      orientation="vertical"
      value={selectedSound}
      onChange={setSoundStyle}
      color={color}
      data={["Loud", "Electronic", "Percussion", "Neo-Soul"]}
    />
  );
};
export default SelectSound;
