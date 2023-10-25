import React from "react";
import { useDispatch } from "react-redux";
import { SelectDrumSound } from "../../../store/patternMakerState/actions";
import { SegmentedControl } from "@mantine/core";
import { soundStyle } from "../../../store/patternMakerState/types";

interface SelectSoundCompProps {
  color: string;
  currentSound: soundStyle;
}

const SelectSound: React.FC<SelectSoundCompProps> = ({
  color,
  currentSound,
}) => {
  // const [ssoundStyle, setSoundStyle] = useState<soundStyle>(currentSound);
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
        soundStyle.ELECTRONIC,
        soundStyle.LOUD,
        soundStyle.NEOSOUL,
        soundStyle.PERCUSSION,
      ]}
    />
  );
};
export default SelectSound;
