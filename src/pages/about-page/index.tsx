import { Title, Text, Container, SimpleGrid, Image } from "@mantine/core";
import joramStudio from "../../assets/images/joramstudio.webp";
// import treingv from "../../assets/music/treingv.mp3";
// import BlankWaveSurfer from "../../components/WaveSurferPlayer/BlankWaveSurfer";

export default function Aboutpage() {
  return (
    <Container py="md">
      <Title py="md">Over mij</Title>
      <Text py="md">
        Van oorsprong ben ik muzikant/componist/DJ/cultureel ondernemer, tot aan
        de laatste weken van de Nederlandse corona lockdown. Toen heb ik me met
        de Codaiseur bootcamp om laten scholen tot software developer en nu 18
        maanden met veel plezier gewerkt bij Valk Digital, de app-department van
        Van der Valk Hotels. Buiten de code om zijn er nog 2 prestige projecten
        waar ik jaarlijks voor werk: Een muziek educatie project in Nieuwegein
        waar ik als DJ-Producer onderdeel ben van een Barok-ensemble. En ik heb
        vóór de corona veel samengewerkt met artiesten uit Marokko, daar heb ik
        af en toe ook nog mee te maken. Verder geniet ik zeer van de stabiliteit
        die ik heb als software-developer.
      </Text>
      <Title order={2} py="md">
        Naast code typen
      </Title>
      <Text py="md">
        Buiten code om doe ik aan skateboarden. Eens per jaar ga ik mee met de
        Bankra Bike Sound System naar een festival om mee te DJ-en. Samen met
        een groep vrienden heb ik een bar in antikraak beheer. Deze bar
        gebruikten we vroeger als muziek-studio. Nu zijn we allen software
        developers en gebruiken we het als werkplek.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}></SimpleGrid>
      <Image fit="contain" src={joramStudio} />

      {/* <BlankWaveSurfer
        url={treingv}
        dragToSeek
        width="100%"
        height="auto"
        autoScroll
        normalize
        autoCenter
        container={"#Waveforrm"}
      /> */}
    </Container>
  );
}
