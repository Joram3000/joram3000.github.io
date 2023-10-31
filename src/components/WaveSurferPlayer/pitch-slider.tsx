import { useState } from "react";
import { Group, Stack, Text, rem } from "@mantine/core";
import { useMove } from "@mantine/hooks";

interface PitchSliderProps {
  changePitch: (y: number) => void;
}

const PitchSlider: React.FC<PitchSliderProps> = ({ changePitch }) => {
  const [value, setValue] = useState(0.5);
  const { ref } = useMove(({ y }) => setter(y));

  const setter = (y: number) => {
    setValue(y);
    changePitch(y * 2);
  };

  return (
    <Stack bg="gray" p="sm" w="100%">
      <Group justify="center" p="">
        <div
          ref={ref}
          style={{
            width: rem(16),
            height: rem(120),
            backgroundColor: "red",
            position: "relative",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          {/* Thumb */}
          <div
            style={{
              position: "absolute",
              top: `calc(${value * 99}%`,
              left: 0,
              width: rem(16),
              height: rem(4),
              // transform: "translate(0,-rem)",
              backgroundColor: "white",
            }}
          />
        </div>
      </Group>

      <Text ta="center">{(value * 2).toFixed(2)}</Text>
    </Stack>
  );
};

export default PitchSlider;
