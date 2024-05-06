import { Box, Stack, Text } from "@mantine/core"

interface TitleHelperProps {
  title: React.ReactNode
}

const TitleHelper: React.FC<TitleHelperProps> = ({ title }) => {
  return (
    <Stack align="center" justify="center">
      <Text>{title}</Text>
      <Box
        style={{
          border: "1px solid white",
          backgroundColor: "green",
          width: "24px",
        }}
      />
    </Stack>
  )
}

export default TitleHelper
]