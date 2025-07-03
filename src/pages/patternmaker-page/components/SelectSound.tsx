import React from "react"
import { useDispatch } from "react-redux"
import { SelectDrumSound } from "../../../store/patternmaker/actions"
import { SegmentedControl } from "@mantine/core"
import { SoundStyle } from "../../../store/patternmaker/types"

interface SelectSoundCompProps {
  color: string
  currentSound: SoundStyle
}

const SelectSound: React.FC<SelectSoundCompProps> = ({
  color,
  currentSound,
}) => {
  const dispatch = useDispatch()

  const onClickCHange = (value: SoundStyle) => {
    dispatch(SelectDrumSound(value))
  }

  return (
    <SegmentedControl
      orientation="vertical"
      value={currentSound}
      onChange={(value) => onClickCHange(value as SoundStyle)}
      color={color}
      data={[
        SoundStyle.ELECTRONIC,
        SoundStyle.LOUD,
        SoundStyle.NEOSOUL,
        SoundStyle.PERCUSSION,
      ]}
    />
  )
}
export default SelectSound
