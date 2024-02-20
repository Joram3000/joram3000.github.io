import {
  Title,
  Box,
  useMantineTheme,
  Flex,
  Stack,
  Container,
} from "@mantine/core"
import { useState } from "react"
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax"

export default function ParallaxTest() {
  const theme = useMantineTheme()
  const [isEnter, setEnter] = useState<any>()
  const [isProgress, setProgress] = useState<number | undefined>()
  isEnter
  const numbers = Array.from({ length: 8 }, (_, index) => index + 1)

  return (
    <Container>
      <Stack align="center">
        <Title pt="md">Parallax pagina</Title>

        <Box bg={theme.colors.blue[3]} h="25vh"></Box>
        {numbers.map((index, i) => (
          <ParallaxBanner key={i}>
            <Box bg={theme.colors.blue[3]} h="25vh">
              <ParallaxBannerLayer translateX={[20, -20]}>
                <Title
                  bg={"rgba(120,180,70,0.1)"}
                  ta="center"
                  c={theme.colors.cyan[9]}
                >
                  slow
                </Title>
              </ParallaxBannerLayer>

              <ParallaxBannerLayer translateX={[30, -30]}>
                <Title
                  bg={"rgba(120,180,70,0.1)"}
                  ta="center"
                  c={theme.colors.blue[9]}
                >
                  fast
                </Title>
              </ParallaxBannerLayer>
              <ParallaxBannerLayer translateY={[-20, 20]}>
                <Title
                  ta="right"
                  c={theme.colors.blue[9]}
                  bg={"rgba(120,180,70,0.1)"}
                >
                  right
                </Title>
              </ParallaxBannerLayer>
              <ParallaxBannerLayer translateY={[50, -50]}>
                <Title
                  ta="left"
                  c={theme.colors.blue[9]}
                  bg={"rgba(120,180,70,0.1)"}
                >
                  left
                </Title>
              </ParallaxBannerLayer>

              <ParallaxBannerLayer
                translateY={[-150, 64]}
                style={{
                  backgroundColor: "rgba(14,164,14,0.1)",
                }}
                onProgressChange={(progress) =>
                  index === 3 ? setProgress(progress) : undefined
                }
                onEnter={(enter) => (index === 3 ? setEnter(enter) : undefined)}
              >
                <Flex align="flex-end" justify="center" h="100%">
                  <Title c={theme.colors.red[6]}>centered, {index}</Title>
                </Flex>
              </ParallaxBannerLayer>
              <ParallaxBannerLayer>
                <Flex align="flex-end" justify="flex-start" h="100%">
                  {index === 3 && (
                    <Title c={theme.colors.red[6]}>
                      {isProgress?.toFixed(2)}
                    </Title>
                  )}
                </Flex>
              </ParallaxBannerLayer>
            </Box>
          </ParallaxBanner>
        ))}
      </Stack>
    </Container>
  )
}
