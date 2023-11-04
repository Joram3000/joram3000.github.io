import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import img from "../../assets/images/falusskateboard.webp";
import immege from "../../assets/images/vtgnarrowcasting.png";
import ValkCard from "./components/ValkCard";
import plaatje from "../../assets/images/vtgshop.png";

export const ValkWerkjes = [
  {
    projectNaam: "Narrowcasting",
    projectUrl: "narrowcasting",
    projectOmschrijving: "ontwikkeling dynamische NarrowCast Content",
    soortenDingen: "Moejezienwatmooi",
    img: immege,
  },
  {
    projectNaam: "Vex",
    projectOmschrijving: "diverse",
    soortenDingen: "deze en Deze knopjes",
    img: img,
  },

  {
    projectNaam: "Interface Sound Design",
    projectOmschrijving: "SD voor zelfscanKassa",
    soortenDingen: "Moejezienwatmooi",
    url: "/narrowcasting",
    img: plaatje,
  },
  {
    projectNaam: "ValkWork",
    projectOmschrijving:
      "Dit is de app voor werknemers en dit is wat we er mee doen",
    soortenDingen: "Moejezienwatmooi",
  },
  {
    projectNaam: "Overige Apps",
    projectOmschrijving: "HKTD, Valkwork, verschillende pages etc",
    soortenDingen: "Moejezienwatmooi",
  },
];

const ValkWorkIn = () => {
  return (
    <Container>
      <Title>Werken bij Valk Digital</Title>
      <Text>
        Hier vind je een overzicht van de verschillende werkzaamheden die ik heb
        verricht voor Valk Digital. Het is slechts een deel ervan. Een ander
        gedeelte van de werkzaamheden is niet relevant om hier op te zetten
        enzo.
      </Text>
      <SimpleGrid pt="md" cols={{ base: 1, sm: 2, lg: 4 }}>
        {ValkWerkjes.map((werkje) => (
          <ValkCard content={werkje} key={werkje.projectNaam} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ValkWorkIn;
