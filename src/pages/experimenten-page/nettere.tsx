import { Title, Box, Text, Image, Center, Flex, Container } from "@mantine/core"
import { randomColor } from "../../helpers/helpers"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, useEffect } from "react"
import HeroTitle from "./heroTitle"
import plant from "./plant.png"
import TitleHelper from "./TitleHelper"

gsap.registerPlugin(ScrollTrigger)

export default function Nettere() {
  const boxRef1 = useRef(null)
  const boxRef2 = useRef(null)

  useEffect(() => {
    const box1 = boxRef1.current
    const box2 = boxRef2.current
    gsap.to(box1, {
      x: "400%",
      rotation: 900,
      duration: 2,
      scrollTrigger: {
        trigger: box1,
        scrub: true,
        start: "top center",
        end: "bottom center ",
        toggleActions: "start pause reverse reset",
        markers: true,
      },
    })
    gsap.to(box2, {
      x: "400%",
      rotation: 900,
      duration: 2,
      scrollTrigger: {
        trigger: box2,
        scrub: true,
        start: "top center",
        end: "bottom center ",
        toggleActions: "start pause reverse reset",
        markers: true,
      },
    })
  }, [])

  const cardText = [
    {
      title: "Pests and disease resistance.",
      content:
        "Across the world, we work with small farmers to improve the quality of their fruits and facilitate access to.",
    },
    {
      title: "Yield efficiency and seasonality.",
      content:
        "Across the world, we work with small farmers to improve the quality of their fruits and facilitate access to.",
    },
    {
      title: "Soil and climate conditions.",
      content:
        "Across the world, we work with small farmers to improve the quality of their fruits and facilitate access to.",
    },
  ]

  return (
    <>
      <Box ta="center" bg="green.9">
        <TitleHelper title="Growing trees" />
        <HeroTitle
          title={
            <>
              IT'S IN
              <br />
              OUR ROOTS
            </>
          }
          titleSize={50}
          backgroundColor="green.2"
          overlay={
            <>
              We carefully nurture our orchards
              <br />
              to guarantee high quality products.
            </>
          }
        />

        <Box bg="blue" h="100vh" w="100%">
          <Text>
            We use world-class water-saving technologies, such as
            <br />
            precision irrigation and monitoring techniques to deliver the
            <br />
            water at the roots.
          </Text>

          <Center>
            <Image w="50%" src={plant}></Image>
          </Center>

          <Text>
            Mulch is used on our orchards to ensure
            <br />
            that moisture is kept in the soil.
          </Text>
        </Box>

        <HeroTitle
          title={2030}
          titleSize={240}
          backgroundColor="green.2"
          overlay={
            <>
              We aim to reduce our water
              <br />
              usage by 50% per kilogram avocados
              <br />
              before 2030.
            </>
          }
        />
      </Box>
      <Box bg="blue" h="100vh" w="100%" ta="center">
        <Text size="xl">
          Our experts develop new disease
          <br />
          resistant rootstocks that optimise
          <br />
          tree health and productivity.
        </Text>
        <Text size="sm">
          The cultivar is the top of the tree that determines the variety of
          <br />
          avocado. It is carefully selected based on taste, shape, size, and
          <br />
          seed-to-flesh ratio. The top is matched with the rootstock.
        </Text>
        <Center>
          <Image w="50%" src={plant}></Image>
        </Center>
        <Text size="xl">
          The rootstock is selected for the
          <br />
          conditions of the tree’s new home.
        </Text>
      </Box>
      <Box bg="#EBF0EA" ta="center">
        <Flex gap="md">
          {cardText.map((card) => (
            <Box bg="white">
              <Title>{card.title}</Title>
              <Text>{card.content}</Text>
            </Box>
          ))}
        </Flex>

        <HeroTitle
          title={2040}
          titleSize={240}
          backgroundColor="yellow"
          overlay={
            <>
              We strive to complete
              <br />
              our journey to net zero throughout
              <br />
              our supply chain before 2049
            </>
          }
        />

        <Text size="sm">
          Naturally, carbon is captured by our trees, root networks, and
          <br />
          well-nourished soils. We aim to reach our goal by investing in
          <br />
          renewable energy such as solar panels and efficient water
          <br />
          pumps for irrigation.
        </Text>
      </Box>

      <Box bg="yellow" w="100%" py={200} ta="center">
        <Text>HIER KOMT DE SUPER CARROUSEL</Text>
        <Text>HIER KOMT DE SUPER CARROUSEL</Text>
        <Text>HIER KOMT DE SUPER CARROUSEL</Text>
        <Text>HIER KOMT DE SUPER CARROUSEL</Text>
        <Text>HIER KOMT DE SUPER CARROUSEL</Text>

        <Text size="xl">
          Our experts develop new disease
          <br />
          resistant rootstocks that optimise
          <br />
          tree health and productivity.
        </Text>
      </Box>

      <Box>
        <Title style={{ height: "100vh", backgroundColor: randomColor() }}>
          nettere
        </Title>
        <Box className="box" ref={boxRef2} bg="red" w="20%" h="300px">
          <Text ta="center">IK BEN EEN DOOS</Text>
        </Box>
        <Title style={{ height: "100vh", backgroundColor: randomColor() }}>
          nettere
        </Title>
        <Title style={{ height: "100vh", backgroundColor: randomColor() }}>
          nettere
        </Title>
        <Title style={{ height: "100vh", backgroundColor: randomColor() }}>
          nettere
        </Title>
        <Title style={{ height: "100vh", backgroundColor: randomColor() }}>
          nettere
        </Title>
        <Title style={{ height: "100vh", backgroundColor: randomColor() }}>
          nettere
        </Title>
        <Box className="box" ref={boxRef1} bg="red" w="20%" h="300px">
          <Text ta="center">IK BEN EEN DOOS</Text>
        </Box>
        <Title style={{ height: "100vh", backgroundColor: randomColor() }}>
          nettere
        </Title>
      </Box>
    </>
  )
}

// <HeroTitle
//         title={
//           <>
//             Giving
//             <br />
//             Back
//           </>
//         }
//         overlay={
//           <>
//             We care about the wellbeing of the
//             <br />
//             land and communities in which we
//             <br />
//             operate.
//           </>
//         }
//       />
