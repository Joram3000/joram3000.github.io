import { Box, Group, RangeSlider, Text } from "@mantine/core";
import { useState } from "react";

interface CustomDoubleSliderProps {
  color: string;
  min: number;
  max: number;
  label: string[];
  valueLabel?: string;
  sendValue: (value: [number, number]) => void;
  initValue: [number, number];
}

const CustomDoubleSlider: React.FC<CustomDoubleSliderProps> = ({
  color,
  min,
  max,
  label,
  valueLabel,
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
        labelTransitionProps={{
          transition: "skew-down",
          duration: 150,
          timingFunction: "linear",
        }}
      />

      <Group justify="space-between">
        {label.map((label, i) => (
          <Text key={label} size="sm" mb="md">
            {label}:
            <b>
              {endValue[i]} {valueLabel}
            </b>
          </Text>
        ))}
      </Group>
    </Box>
  );
};

export default CustomDoubleSlider;
