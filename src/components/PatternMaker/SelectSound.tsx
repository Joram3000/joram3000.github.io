import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SelectDrumSound } from "../../store/seqState/actions";
import { SegmentedControl } from "@mantine/core";

interface SelectSoundCompProps {
  color: string;
}

const SelectSound: React.FC<SelectSoundCompProps> = ({ color }) => {
  const [soundStyle, setSoundStyle] = useState("Loud");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SelectDrumSound(soundStyle));
  }, [dispatch, soundStyle]);

  return (
    <div className="sound-style">
      <SegmentedControl
        orientation="vertical"
        value={soundStyle}
        onChange={setSoundStyle}
        color={color}
        data={["Loud", "Electronic", "Percussion", "Neo-Soul"]}
      />
    </div>
  );
};
export default SelectSound;
