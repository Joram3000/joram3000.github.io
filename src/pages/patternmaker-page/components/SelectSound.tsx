import React from "react";
import { useDispatch } from "react-redux";
import { SelectDrumSound } from "../../../store/patternmaker/actions";
import { SegmentedControl } from "@mantine/core";
import { SoundStyle } from "../../../store/patternmaker/types";

interface SelectSoundCompProps {
  color: string;
  currentSound: SoundStyle;
}

const SelectSound: React.FC<SelectSoundCompProps> = ({
  color,
  currentSound,
}) => {
  const dispatch = useDispatch();

  // TO DO FIX ANY STRING VS SOUNDSTYLE
  const onClickCHange = (value: any) => {
    dispatch(SelectDrumSound(value));
  };

  return (
    <SegmentedControl
      orientation="vertical"
      value={currentSound}
      onChange={onClickCHange}
      color={color}
      data={[
        SoundStyle.ELECTRONIC,
        SoundStyle.LOUD,
        SoundStyle.NEOSOUL,
        SoundStyle.PERCUSSION,
      ]}
    />
  );
};
export default SelectSound;
