import {
  Box,
  Container,
  Title,
  Text,
  Group,
  Stack,
  Image,
  Button,
} from "@mantine/core";
import Footer from "../components/footer";
import Statement from "../../../../../mirjam_website/mirjamwebsite/src/components/statement";
import PeopleCard from "../../../../../mirjam_website/mirjamwebsite/src/components/peopleCard";
import mirjamreplace from "../../../assets/images/mirjamreplace.png";
import samenwerkingsPartner from "../../../assets/images/mirjam/samenwerkingspartner.png";

const MirjamKroonAbout: React.FC = () => {
  const samenwerkingsPartners = [
    {
      img: samenwerkingsPartner,
      name: "Eline Trapman",
      text: "Met Eline heb ik mooie trajecten begeleid als: Het moedige gesprek, leiding geven met lef, doorgroeien werkt. Eline is zeer gecommitteerd en zorgvuldig als het gaat om afstemming met de klant. Ze is een inspirerend voorbeeld in steeds een extra mijl lopen. Ze zoekt vernieuwing en verrassing. We maken elkaar beter omdat we complementair aan elkaar zijn.",
      link: "",
    },
  ];

  return (
    <Box>
      <Container p="xl" bg="beige">
        <Group align="center" justify="flex-end" grow>
          <Stack>
            <Title>Trainer en coach van groei- en verandertrajecten</Title>
            <Text>
              Ik ben Mirjam Kroon-Hoekendijk. Binnen organisaties ben ik actief
              als coach en trainer op het gebied van training, ontwikkeling en
              samenwerkingsvraagstukken.
            </Text>
          </Stack>

          <Image src={mirjamreplace} />
        </Group>
      </Container>

      <Statement
        text="Ik word ik door jij"
        subText="Martin Büber"
        color="blue"
      />

      <Container p="xl" bg="beige">
        <Title>Waar kun je me voor vragen?</Title>
        <Text pb="lg">
          Waar mensen samenwerken, valt veel te winnen wanneer er goed
          gecommuniceerd wordt. Of dat nu in de financiële branche is, overheid
          of de zware maakindustrie. Afstemmen, programma’s op maat maken in
          taal die aansluit, is kenmerkend voor mijn werkwijze. Daarbij vind ik
          het belangrijk zowel in-als uit te zoomen. Soms gaat het om
          competenties die verder ontwikkeld mogen worden, zoals de kunst van
          het vragen stellen, goed samenvatten, het echte gesprek durven voeren.
        </Text>
        <Text pb="lg">
          En er is altijd een groter geheel waarbinnen we ons begeven. We zijn
          als mensen onderdeel van systemen, ons huidige gezinssysteem, ons
          gezin van herkomst, de grotere context van ons werk of team. Dat team
          wordt beïnvloed door de organisatiedynamiek. Zeker wanneer er bij
          herhaling dezelfde niet helpende dynamieken spelen is het zinvol om
          naar dat grotere geheel te kijken (het systeem).
        </Text>
        <Text pb="lg">
          Voorbeeld uit de praktijk: ik werkte samen met een team dat
          verantwoordelijk was voor de culturele instellingen van een stad. Er
          heerste een beetje een hakketak-cultuur. Medewerkers konden elkaar
          niet automatisch vinden. In een ruimte lag aan de ene kant een
          flipover met “gemeente” en aan de andere kant “de burgers” toen ik hen
          vroeg in de ruimte te gaan staan op een plek die klopt bij wie ze ver
          weg en dichtbij staan verdeelde het team zich door de hele ruimte. Het
          werd duidelijk dat de ene medewerker zich in de eerste plaats met het
          gemeentelijke apparaat verbond en de ander met de burgers. Opeens werd
          duidelijk dat veel communicatieproblemen hiermee te maken hadden.
        </Text>
      </Container>

      <Container p="xl" bg="green">
        <Group grow align="flex-start">
          <Stack>
            <Title>“Geen sprookje, maar een soap’’</Title>
            <Text pb="lg">
              De realiteit van het leven, heeft meer van een soap dan van een
              sprookje. In een sprookje zouden we het liefst geloven. Er was
              eens…… en …. ze leefden nog lang en gelukkig. Een sprookje heeft
              een begin en een eind, je denkt daarbinnen in oorzaak-gevolg.
            </Text>
            <Text pb="lg">
              Het leven is geen sprookje maar meer een voortdurend inhaken van
              de ene gebeurtenis op de andere. Iemand reageert, een ander pakt
              hem op en voor dat je het weet is de hele groep aan het inhaken op
              wat er in het team of in de organisatie gebeurt. Van nature denken
              we lineair maar de realiteit is meer circulair.
            </Text>
            <Text pb="lg">
              Samenwerken gaat vanuit systeemdenken niet alleen om mensen, maar
              vooral om de talloze relaties en verbindingen waar mensen deel van
              uitmaken. Om naar samenwerkingsvraagstukken te kijken helpt het om
              uit te zoomen in plaats van in te zoomen. Systeemdenken is leren
              kijken naar samenhang en patronen. We kijken met de systeembril
              niet ín mensen, maar tussen mensen. Gedrag wordt veel meer bepaald
              door relaties en context dan door persoonlijkheid: terwijl we vaak
              denken dat het andersom is. Wij hebben de neiging om karakter en
              persoonlijkheid over te waarderen, en het belang van relaties en
              context als verklaring voor gedrag te onderschatten.
            </Text>
            <Text pb="lg">
              Systeemdenken daagt je uit om op een andere manier naar
              samenwerkingsvraagstukken te kijken. ‘Anders kijken’ veronderstelt
              ‘anders denken’. Dit kan in de praktijk best lastig zijn.
            </Text>
            <Button>Bekijk video over de Constructieve Roddel</Button>
          </Stack>

          <Image src={mirjamreplace} />
        </Group>
      </Container>

      <Container p="xl" bg="beige">
        <Title>Over Mirjam</Title>
        <Text pb="lg">
          Wat je van mij kunt verwachten: vasthoudendheid als het gaat om een
          programma maken wat verschil gaat maken. Ik houd van en geloof in
          co-creëren. Een relatie die verder gaat dan opdrachtgever-leverancier,
          de opdrachtgever kent de organisatie altijd beter dan ik. Maar als
          buitenstaander kan ik zaken soms scherper zien. Die samenwerking is
          noodzakelijk om programma’s te ontwerpen die het verschil kunnen
          maken.
        </Text>
        <Text pb="lg">
          Ik breng een rijke gereedschapskist mee vanuit mijn jarenlange
          ervaring: o.a. Sociologie, Systemisch werken (Hellinger en Marijke
          Spanjersbergen), Deep democracy (level 1-4), internationaal
          gecertificeerd NLP trainer, De Maskermaker, Oplossingsgericht coachen
          en nog veel meer.
        </Text>
        <Button>Bekijk LinkedIn-profiel</Button>
      </Container>

      <Container p="xl" bg="beige">
        <Group grow>
          <Stack>
            <Title>En naast werk?</Title>
            <Text pb="lg">
              Oudste dochter uit een ondernemend gezin, waar buiten de lijntjes
              kleuren meer gewaardeerd werd dan erbinnen. De minder ontwikkelde
              kant in mijn familie was je verbinden met de omgeving. Ik vermoed
              dat dat mede reden is geweest dat “hoe” je te verbinden een
              belangrijk onderwerp in mijn werk is geworden. Je leert mensen
              vaak dat wat je zelf moet leren.
            </Text>
            <Text pb="lg">
              Getrouwd met mijn jeugdliefde (Dick), moeder van 3 volwassen
              kinderen. Enthousiast over wonen op het platteland (Hoornaar
              vlakbij Gorinchem). Dol op tuinieren, mijn katten en kippen en
              buiten zwemmen (ja, ook s’ winters). Stilte-retraites en lange
              wandeltochten (van Florence naar Assisi en in 2024 hopelijk van
              Rome naar Assisi).
            </Text>
          </Stack>
          <Image src={mirjamreplace} />
        </Group>
      </Container>

      <Container p="xl" bg="green">
        <Title>Samenwerkingspartners</Title>
        <Stack align="flex-start">
          {samenwerkingsPartners.map((samenwerkingsPartner) => (
            <>
              <PeopleCard samenwerkingsPartner={samenwerkingsPartner} />
              <PeopleCard samenwerkingsPartner={samenwerkingsPartner} />
              <PeopleCard samenwerkingsPartner={samenwerkingsPartner} />
              <PeopleCard samenwerkingsPartner={samenwerkingsPartner} />
            </>
          ))}
        </Stack>
      </Container>

      <Footer />
    </Box>
  );
};

export default MirjamKroonAbout;
