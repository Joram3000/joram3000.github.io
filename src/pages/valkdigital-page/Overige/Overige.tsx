import { Carousel } from "@mantine/carousel";
import { Box, Container, Flex, Paper, Text, Title } from "@mantine/core";
import ReactPlayer from "react-player";
import vex from "../../../assets/video/schermopnamen/vex.webm";
import valkwork from "../../../assets/video/schermopnamen/valkwork.webm";
import uikit from "../../../assets/video/schermopnamen/uikit.webm";
import hktdmobile from "../../../assets/video/schermopnamen/hktdmobile.webm";
import classes from "./overige.module.css";
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
} from "@tabler/icons-react";
import { isMobile } from "react-device-detect";

const Overige = () => {
  const OverigeWerkzaamheden = [
    {
      title: "Valk Exclusief",
      description:
        "Met de VEX app kan je hotels en restaurants boeken. Deze app is voor gasten en bezoekers. Ik heb gewerkt aan vele componenten en optimalisaties.",
      visual: vex,
      tasks: [
        "Unit tests schrijven voor het homescherm",
        "verbeteren restaurantserveringen",
        "zoek-optimalisaties",
        "de FAB af te wisselen op bepaalde pagina's",
        "componenten abstraheren en in de UI-kit stoppen",
        "nieuwe schermen toevoegen aan bijvoorbeeld 'membership-cards'",
        "custom meldingen voor specifieke hotels",
        "aparte schermen maken voor darkmode en taal-instellingen",
      ],
    },
    {
      title: "ValkWork",
      description:
        "Deze app wordt gebruikt door medewerkers van Van der Valk Hotels. Met deze app kan je bijvoorbeeld verlof aanvragen, of een hotel boeken met medewerkerskorting.",
      visual: valkwork,
      tasks: [
        "nieuwe componenten maken",
        "nieuwe schermen ontwikkelen zoals personeels-voordeel",
        "maintenance, testen schrijven, rechttrekken styling",
        "componenten abstraheren en in de UI-kit stoppen",
      ],
    },
    {
      title: "ValktoGo",
      description: "Zelfsscan Kassa-systeem & bijbehorende back-office.",
      visual: "",
      tasks: [
        "kleuren instelbaar maken voor zoekknop",
        "zoekfunctie toevoegen",
        "dynamische afbeeldingen maken",
        "Fade in & uit op notificaties",
        "Animaties voor kerst ontwerpen en inzetten",
        "Batterij status verwerken in tabel",
        "tabel sorteren op tijdstip",
      ],
    },
    {
      title: "UI-Kit",
      description:
        "deze UI-Kit wordt gebruikt in oa Valk Exclusief en ValkWork.",
      visual: uikit,
      tasks: [
        "nieuwe componenten ontwikkelen zoals de button Carousel",
        "nieuwe schermen ontwikkelen",
        "optimaliseren toevoegen van icons dmv SVGR",
        "nieuwe functies toevoegen aan bestaande componenten",
      ],
    },
    {
      title: "HKTD",
      description:
        "House Keeping & Technische Dienst. Deze app wordt in de hotels gebruikt door de schoonmaakploeg en de reparateurs. Zodat ze weten welke kamers moeten worden schoongemaakt en waar er een lampje vervangen moet worden.",
      visual: hktdmobile,
      tasks: [
        "translations",
        "aanpassen volgorde tabs",
        "nieuwe schermen ontwikkelen",
      ],
    },
  ];

  return (
    <Container>
      <Carousel
        slideGap="md"
        withIndicators
        classNames={{
          control: classes.control,
          indicator: classes.indicator,
          indicators: isMobile ? classes.mobileIndicators : undefined,
        }}
        nextControlIcon={
          <IconArrowBigRightFilled
            className={isMobile ? classes.RightArrow : undefined}
            style={{
              color: "blueviolet",
              margin: 12,
            }}
          />
        }
        previousControlIcon={
          <IconArrowBigLeftFilled
            className={isMobile ? classes.LeftArrow : undefined}
            style={{
              color: "blueviolet",
              margin: 12,
            }}
          />
        }
      >
        {OverigeWerkzaamheden.map((job) => (
          <Carousel.Slide key={job.title} h="100%">
            <Container w="90%" h="100%">
              <Flex
                pt="md"
                direction={{ base: "column", sm: "row" }}
                align={{ base: "center", sm: "flex-start" }}
                justify="space-between"
                gap="md"
              >
                <Box>
                  <Title>{job.title}</Title>
                  <Title order={3}>Omschrijving</Title>
                  <Text>{job.description}</Text>

                  {job.tasks && (
                    <Paper shadow="sm" withBorder mt="md" p="md">
                      <Title order={3}>ik heb oa gewerkt aan:</Title>
                      <ul style={{ margin: 0, padding: 12 }}>
                        {job.tasks.map((task) => (
                          <li>{task}</li>
                        ))}
                      </ul>
                    </Paper>
                  )}
                </Box>

                <Box
                  p="md"
                  style={{ backgroundColor: "transparent", borderRadius: 20 }}
                >
                  <ReactPlayer
                    playing
                    loop
                    muted
                    width={1178 / 4}
                    height={2556 / 4}
                    url={job.visual}
                  />
                </Box>
              </Flex>
            </Container>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};

export default Overige;
