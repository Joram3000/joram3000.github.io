import { Box, Slider, Text } from "@mantine/core";
import { useState } from "react";

interface CustomSliderProps {
  color: string;
  min: number;
  max: number;
  label: string;
  valueLabel?: string;
  sendValue: (value: number, value2?: number) => void;
  initValue: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  color,
  min,
  max,
  label,
  valueLabel,
  sendValue,
  initValue,
}) => {
  const [value, setValue] = useState<number>(initValue);
  const [endValue, setEndValue] = useState<number>(value);

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
        label={valueLabel && `${value} ${valueLabel}`}
        value={value}
        onChange={setAndSend}
        onChangeEnd={setEndValue}
        labelTransitionProps={{
          transition: "skew-down",
          duration: 150,
          timingFunction: "linear",
        }}
      />

      <Text size="sm" mb="md">
        {label}:
        <b>
          {endValue} {valueLabel}
        </b>
      </Text>
    </Box>
  );
};

export default CustomSlider;
