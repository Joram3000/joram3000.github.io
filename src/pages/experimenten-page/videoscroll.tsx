import {
  Title,
  Box,
  Flex,
  Image,
  Stack,
  Container,
  Center,
} from "@mantine/core"
import { randomColor } from "../../helpers/helpers"
import { useEffect, useRef, useState } from "react"
import plaatje from "../../assets/images/joram/joramcutout.webp"
import chromeVideo from "../../assets/video/videoo.webm"

export default function VideoScroll() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [blockData, setBlockData] = useState<
    Array<{ name: string; key: number; bgcolor: string }>
  >([])
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  useEffect(() => {
    const handleVideoUpdate = () => {
      if (videoRef.current) {
        const videoPlayheadPosition = scrollPosition * 0.01 // Adjust the multiplier as needed
        videoRef.current.currentTime = videoPlayheadPosition
      }
    }

    const animationFrameId = requestAnimationFrame(handleVideoUpdate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [scrollPosition])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const newBlockData = []
    for (let i = 0; i <= 7; i++) {
      const blockItem = {
        name: `Block ${i}`,
        key: i,
        bgcolor: randomColor(),
      }
      newBlockData.push(blockItem)
    }
    setBlockData(newBlockData)
  }, [])

  return (
    <Container p={0} h="calc(100vh - 120px)">
      <Flex align="center" justify="center" h="100%" w="100%">
        <Box w="100%">
          {blockData.map((block) => (
            <Box h="50vh" bg={block.bgcolor} m="md" key={block.key}>
              <Flex>
                <Title>{block.name}</Title>
              </Flex>
            </Box>
          ))}
        </Box>

        <Center h="100%" pos="fixed">
          <Stack align="center" justify="center" h="100%">
            <Title bg="blue">{scrollPosition}</Title>

            <video ref={videoRef} id="scroll-video" width="300px">
              <source src={chromeVideo} type="video/mp4" />
            </video>
          </Stack>
          <Image pos="absolute" w={50} src={plaatje} bottom={60} />
        </Center>
      </Flex>
    </Container>
  )
}
