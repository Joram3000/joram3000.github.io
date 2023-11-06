import {
  Title,
  Text,
  Collapse,
  Image,
  UnstyledButton,
  Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import image3 from "../../assets/images/joramstudio.jpg";
import skateboard from "../../assets/images/falusskateboard.webp";
import treingv from "../../assets/music/treingv.mp3";
import BlankWaveSurfer from "../../components/WaveSurferPlayer/BlankWaveSurfer";

export default function Aboutpage() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Container py="md">
      <Title px="md">Over mij</Title>
      <Text p="md">
        Nou ik ben dus Joram. Van oorsprong muzikant/componist/DJ maar
        tegenwoordig software developer. Daar ben ik net zo obsessief mee bezig
        als dat ik vroeger in de muziek ben gedoken. Wat mij aanspreekt is
        interactie en animatie. Daar kan je mij midden in de nacht voor wakker
        maken zeg maar.
      </Text>
      <Title order={2} px="md">
        Naast code typen
      </Title>
      <Text p="md">
        Buiten code om doe ik aan skateboarden. Heel soms maar bijna nooit moet
        ik nog eens Djen voor de Bankra Bike Sound System. Ook heb ik een
        media-bedrijfje samen met Angela Pol genaamd Kibbeling Media.
      </Text>

      <BlankWaveSurfer
        url={treingv}
        dragToSeek
        width="100%"
        height="auto"
        autoScroll
        normalize
        autoCenter
        container={"#Waveforrm"}
      />

      <Collapse p="md" in={opened} transitionDuration={200}>
        <Text>
          DIt is een total over-engineerde AudioPlayer die ik AWS aan het
          ontwikkelen ben. Als deze nog iets meer stabiel is kan ik een online
          DJ-applicatie laten draaien.
        </Text>

        <Image src={skateboard} />
      </Collapse>
      <UnstyledButton fw="700" onClick={toggle} mx="md">
        {!opened ? "Vertel me nog meer!!" : "Haal maar weer weg"}
      </UnstyledButton>

      <Image src={image3} />
    </Container>
  );
}
