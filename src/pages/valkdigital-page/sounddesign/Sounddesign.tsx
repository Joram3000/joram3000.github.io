import { Box, Container, Flex, Paper, Text, Title } from "@mantine/core";
import ReactPlayer from "react-player";
import sdv2g from "../../../assets/video/sdv2g.webm";
// import { useTranslation } from "react-i18next";

const SoundDesign = () => {
  // const { t } = useTranslation();

  return (
    <Container>
      <Title pt="md">Interface sound design</Title>

      <Container w="90%" h="100%">
        <Flex
          pt="md"
          direction={{ base: "column", sm: "row" }}
          align={{ base: "center", sm: "flex-start" }}
          justify="space-between"
          gap="md"
        >
          <Box>
            <ReactPlayer
              controls
              width={1080 / 3}
              height={1920 / 3}
              url={sdv2g}
            />
          </Box>
        
          <Box>
            <Title order={3}>Omschrijving</Title>
            <Text>
              Een van de leukste dingen die ik heb gedaan dit jaar is de sound
              design ontwerpen voor een zelfscan kassa. Interface sound design
              is een vak apart, en met mijn achtergrond als componist kan ik uit
              de voeten met Ableton en synthese.
            </Text>
            <Text>
              In de basis komt het neer op het nabouwen van de AH zelfscan
              kassa. Het concept daar achter is dat je eigenlijk een
              pseudo-melodie die zich ontvouwt aan de hand van de user
              interactions. Die tot een bevredigend einde komt bij een
              succesvolle betaling
            </Text>
          </Box>
        </Flex>
      </Container>

      <Box>
        <ReactPlayer
          controls
          width="100%"
          height="100%"
          url="https://res.cloudinary.com/dqqb0ldgk/video/upload/v1700234360/valktogo-sounddesign_rv1lfk.mov"
        />
      </Box>
    </Container>
  );
};

export default SoundDesign;
