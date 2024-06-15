import { Title, Text, Container } from "@mantine/core"
import treingvbluesberber from "../../assets/music/treingvbluesberber.mp3"

import Boombox from "../../components/audiocontext/Boombox"
export default function AudioplayerPage() {
  return (
    <Container>
      <Title pt="md">Over-engineered audioplayer (in progress)</Title>
      <Text py="md">
        Dit is wat ik nu voor de lol aan het bouwen ben. Een audio player met
        teveel functies. Aangezien ik de web-audio API al beheers kan ik dit
        component gebruiken om een online/mobile DJ-App te maken.
      </Text>
      <Boombox />
      {/* <AudioEqualizer audiofile={treingvbluesberber} /> */}
      {/* <AudioAnalyser audiofile={treingvbluesberber} /> */}
      <Title order={2} pt="md">
        Wat moet er nog gebeuren?
      </Title>

      <ul>
        <li>
          Als je op de waveform sleept/dubbel-klikt kan je een Region
          maken/verwijderen
        </li>
        <li>Het is leuk als je de Regions + hot-cues een naam kan geven</li>
        <li>Boven de waveform kan je lezen welke Region er gespeeld wordt</li>
        <li>De loop-knop werkt nog niet</li>
        <li>De ronde knop moet werken zoals de cue-knop van een DJ-set</li>
        <li>Pitch update nog niet realtime (dubbel-klik is terug naar 0%)</li>
        <li>Scroll-zoom werkt ook nog niet optimaal</li>
      </ul>
    </Container>
  )
}
