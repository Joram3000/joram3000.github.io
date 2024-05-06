import { Box, Text, Center, em } from "@mantine/core"

interface HeroTitleProps {
  title: React.ReactNode
  titleSize: number
  backgroundColor: string
  overlay: React.ReactNode
}

const HeroTitle: React.FC<HeroTitleProps> = ({
  title,
  titleSize,
  backgroundColor,
  overlay,
}) => {
  return (
    <Box pos="relative" w="100%" h="300px">
      <Center pos="absolute" w="100%" h="100%" opacity={0.3}>
        <Text
          fw={800}
          tt="capitalize"
          variant="gradient"
          gradient={{ from: "transparent", to: backgroundColor, deg: 19080 }}
          size={em(titleSize)}
        >
          {title}
        </Text>
      </Center>

      <Center pos="absolute" w="100%" h="100%">
        <Text>{overlay}</Text>
      </Center>
    </Box>
  )
}

export default HeroTitle
