import { Group, Stack, rem } from "@mantine/core"
import { useMove } from "@mantine/hooks"

interface PitchSliderProps {
  changePitch: (y: number) => void
  setPitchValue: (y: number) => void
  pitchValue: number
}

const PitchSlider: React.FC<PitchSliderProps> = ({
  changePitch,
  setPitchValue,
  pitchValue,
}) => {
  const { ref } = useMove(({ y }) => setter(y))

  const setter = (y: number) => {
    setPitchValue(y)
    // changePitch(y * 0.25 + 0.875);
    // changePitch(y * 0.5 + 0.75);
    // changePitch(y * 1 + 0.5);
    changePitch(y * 2 + 0)
  }

  return (
    <Stack bg="gray" p="sm" style={{ borderRadius: "6px" }}>
      <Group justify="center" p="" onDoubleClick={() => setter(0.5)}>
        <div
          ref={ref}
          style={{
            width: rem(16),
            height: rem(120),
            backgroundColor: "orange",
            position: "relative",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          {/* Thumb */}
          <div
            style={{
              position: "absolute",
              top: `calc(${pitchValue * 99}%`,
              left: 0,
              width: rem(16),
              height: rem(1),
              // transform: `translate(0,-${rem(2)})`,
              backgroundColor: "white",
            }}
          />
        </div>
      </Group>

      {/* <Text ta="center">{(value * 2).toFixed(1)}</Text> */}
    </Stack>
  )
}

export default PitchSlider
