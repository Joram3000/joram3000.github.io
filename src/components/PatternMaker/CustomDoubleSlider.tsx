import { Box, Group, RangeSlider, Text } from "@mantine/core";
import { useState } from "react";

interface CustomDoubleSliderProps {
  color: string;
  min: number;
  max: number;
  label: string[];
  sendValue: (value: [number, number]) => void;
  initValue: [number, number];
}

const CustomDoubleSlider: React.FC<CustomDoubleSliderProps> = ({
  color,
  min,
  max,
  label,
  sendValue,
  initValue,
}) => {
  const [value, setValue] = useState<[number, number]>(initValue);
  const [endValue, setEndValue] = useState<[number, number]>(value);

  const setAndSend = (value: [number, number]) => {
    setValue(value);
    sendValue(value);
  };

  return (
    <Box maw={500} mx="auto">
      <RangeSlider
        color={color}
        min={min}
        max={max}
        value={value}
        onChange={setAndSend}
        onChangeEnd={setEndValue}
      />

      <Group justify="space-between">
        {label.map((label, i) => (
          <Text key={label} mt={5} size="sm">
            {label}: <b>{endValue[i]}</b>
          </Text>
        ))}
      </Group>
    </Box>
  );
};

export default CustomDoubleSlider;
