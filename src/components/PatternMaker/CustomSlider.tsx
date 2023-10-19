import { Box, Slider, Text } from "@mantine/core";
import { useState } from "react";

interface CustomSliderProps {
  color: string;
  min: number;
  max: number;
  label: string;
  sendValue: (value: number, value2?: number) => void;
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
  const [value, setValue] = useState(initValue);
  const [endValue, setEndValue] = useState(value);

  const setAndSend = (value: number) => {
    setValue(value);
    sendValue(value);
  };

  return (
    <Box maw={500} mx="auto">
      <Slider
        color={color}
        min={min}
        max={max}
        value={value}
        onChange={setAndSend}
        onChangeEnd={setEndValue}
      />

      <Text mt={5} size="sm">
        {label}: <b>{endValue}</b>
      </Text>
    </Box>
  );
};

export default CustomSlider;
