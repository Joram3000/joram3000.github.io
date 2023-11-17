import { Box, Container, Flex, Stack, Text, Title } from "@mantine/core";
import ReactPlayer from "react-player";
import sdv2g from "../../../assets/video/sdv2g.webm";

const SoundDesign = () => {
  return (
    <Container h="100%">
      <Title pt="md">Interface sound design</Title>

      <Flex
        direction={{ base: "column", sm: "row" }}
        align={{ base: "center", sm: "flex-start" }}
        justify="space-between"
        gap="md"
        h="100%"
      >
        <Box>
          <ReactPlayer
            controls
            width={1080 / 3}
            height={1920 / 3}
            url={sdv2g}
          />
        </Box>

        <Stack justify="space-around">
          <Box>
            <Title order={3}>Omschrijving</Title>
            <Text>
              Voor de zelfscankassa's heb ik de interface sounds ontworpen.
            </Text>
            <Text>
              In de basis komt het neer op het nabouwen van de AH zelfscan
              kassa. De filosofie daarachter is dat je met elke handeling
              audio-feedback krijgt, die als je een succesvolle betaling
              verricht oplost in een consonant eind-akkoord.
            </Text>
          </Box>
          <Box>
            <ReactPlayer
              controls
              width="100%"
              url="https://res.cloudinary.com/dqqb0ldgk/video/upload/v1700234360/valktogo-sounddesign_rv1lfk.mov"
            />
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
};

export default SoundDesign;
