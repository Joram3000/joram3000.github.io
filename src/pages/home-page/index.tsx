import { Anchor, Container, Text, Title } from "@mantine/core";
// import { useTranslation } from "react-i18next";
import { TableSort } from "./Sortedtable";

export default function HomePage() {
  // const { t } = useTranslation();

  return (
    <Container p={0}>
      <Title p="md">Joram Kroon Portfolio Playground</Title>

      <Text p="md">
        Welkom op mijn portfolio website! Mijn naam is Joram en ik ben werkzaam
        als Front-end software engineer (met React). Hier vind je een overzicht
        van mijn werk en huidige skillset. Deze website is continu in
        ontwikkeling. Ik gebruik hem als 'digitale zandbak' om aan componenten
        te sleutelen en om nieuwe tech-tools onder de knie te krijgen. Ik
        probeer zoveel mogelijk toeters en bellen aan deze website te hangen, om
        een indruk te geven van mijn digitale vaardigheden.
      </Text>

      <Text p="md">
        Als developer houd ik van het ontwerpen van dynamische componenten. En
        van intuitieve interfaces die uitnodigen om overal op te klikken en zelf
        op verkenning te gaan. Als voormalig DJ-leraar heb ik gezien dat sommige
        mensen aan 'knoppenvrees' lijden. Dan is deze website een veilige plek
        om daar vanaf te komen. Het beste voorbeeld hiervan is de{" "}
        <Anchor href={"/#/patternmaker"}>Patroonmaker</Anchor>. Dat is een
        educatieve muziek-app met als doelgroep kinderen tussen de 8 en 10 jaar.
        Deze app is bedoeld om ze te leren hoe een ritmepatroon in elkaar
        steekt. Daarnaast is er ook een kopje met mijn werkzaamheden voor Valk
        Digital, de digitale afdeling van Van der Valk.
      </Text>

      <TableSort />

      <Text p="md">
        Qua code word ik het meest blij van hoog responsieve interfaces die
        intuitief aanvoelen. Ook heb ik veel interesse in animatie en hoe je dat
        in kunt zetten om de app-ervaring te verrijken. Daarnaast heb ik -
        gezien mijn vorige carriere als componist - ook veel interesse in sound
        design voor interfaces. Kortom: alles wat te maken heeft met de ervaring
        en wisselwerking tussen een stuk technologie en de persoon die het
        gebruikt. Mijn huidige ambitie is om van code-aapje naar code-gorilla te
        gaan. Op dit moment heb ik dezelfde obsessie met code als die ik vroeger
        voor muziek-compositie & -productie had. Ik wil uiteindelijk zelf Full
        Stack hele platforms uit de grond kunnen stampen. Daarnaast heb ik ook
        veel ervaring op het gebied van content creation en denk ik graag mee
        over de conceptuele kant. Mocht je vragen hebben, neem dan gerust
        contact met me op.
      </Text>
    </Container>
  );
}
