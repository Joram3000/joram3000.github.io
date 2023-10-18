import { Box, Slider, Text } from "@mantine/core";
import { useState } from "react";

interface CustomSliderProps {
  color: string;
  min: number;
  max: number;
  label: string;
  sendValue: (value: number) => void;
  initValue: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  color,
  min,
  max,
  label,
  sendValue,
  initValue,
}) => {
  const [volume, setVolume] = useState(initValue);
  const [endValue, setEndValue] = useState(volume);

  const setEndValuerr = (value: number) => {
    setEndValue(value);
    sendValue(value);
  };

  return (
    <Box maw={400} mx="auto">
      <Slider
        color={color}
        min={min}
        max={max}
        value={volume}
        onChange={setVolume}
        onChangeEnd={setEndValuerr}
      />

      <Text mt={5} size="sm">
        {label}: <b>{endValue}</b>
      </Text>
    </Box>
  );
};

export default CustomSlider;
