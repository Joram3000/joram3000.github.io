import { Accordion, Anchor, Group, Text } from "@mantine/core";
import { lorem } from "../../helpers/helpers";

const Curriculum: React.FC = () => {
  const baantjes = [
    {
      start: "2021",
      finish: "2023",
      title: "Front End Web Developer",
      waar: "Valk Digital",
      url: "https://www.valkdigital.nl/",
    },
    {
      start: "2020",
      finish: "heden",
      title: "Content Creator",
      waar: "Kibbeling Media",
      url: "https://www.kibbelingmedia.nl/",
    },
    {
      start: "2020",
      finish: "2022",
      title: "Muziekschool School of Beats",
      waar: "School Of Beats",
      url: "https://schoolofbeats.nl/",
    },
    {
      start: "2020",
      finish: "2022",
      title: "Educatieve Content creator",
      waar: "Kunst Centraal",
      url: "https://kunstcentraal.nl/",
    },
    {
      start: "2019",
      finish: "2020",
      title: "Organisator Rarara-evenementen",
      description: lorem.generateParagraphs(1),
    },
    {
      start: "2017",
      finish: "2020",
      title: "Artistiek coördinator en docent bij de Boempatsers",
      waar: "Cultuurhuis Kanaleneiland",
      url: "https://bokscultuurhuis.nl/",
    },
    {
      start: "2017",
      finish: "2018",
      title:
        "Oprichter Sound Safari – Muziekworkshops in gesloten inrichtingen",

      description: lorem.generateParagraphs(1),
    },
    {
      start: "2016",
      finish: "2018",
      title: "Projectmanager evenementen bij Safari & Bankra Bike Soundsystem",
      waar: "Bankra Bike",
      url: "https://bankrabike.nl/",
    },
    {
      start: "2016",
      finish: "heden",
      title: "Componist & Music-Producer voor Media",
    },
    {
      start: "2016",
      finish: "2018",
      title: "Docent Piano in Overvecht Utrecht",
      waar: "UCK",
    },
    {
      start: "2014",
      finish: "2016",
      title: "Docent percussie bij project Muziekroute",
      waar: "Muziekroute",
      url: "https://www.muziekroute.nl/",
      description: lorem.generateParagraphs(1),
    },
    {
      start: "2013",
      finish: "2016",
      title: "Docent Dj & Synthese/Sound Design bij",
      waar: "Emstudios Academy Of Sound",
    },
    {
      start: "2011",
      finish: "2014",
      title: "Artist in residence bij Habek/Kytopia",
    },
    {
      start: "2011",
      finish: "2021",
      title: "Docent Dj en turntablism",
      waar: "Dutch Dj Academy",
      url: "https://www.dutchdjacademy.com/",
    },
    {
      start: "2011",
      finish: "2012",
      title: "Docent Dj en turntablism",
      waar: "NPAC ROC",
    },
    {
      start: "2010",
      finish: "2022",
      title: "Ondernemer bij Prace Music, freelance en autonoom",
    },
    {
      start: "2009",
      finish: "2021",
      title: "Docent piano aan huis",
    },
    {
      start: "2009",
      finish: "2010",
      title: "Initiatiefnemer muziekproject 'The First Statement'",
    },
    {
      start: "2004",
      finish: "2021",
      title: "DJ, Pianist, Performer bij diverse evenementen",
      description: "",
    },
  ];

  const items = baantjes.map((item, i) => (
    <Accordion.Item key={`${item.title} ${i}`} value={item.title}>
      <Accordion.Control chevron={item.description ? false : true}>
        <Group justify="space-between">
          <Group>
            <Text>
              {item.start}-{item.finish}
            </Text>
            <Text>{item.title}</Text>
          </Group>

          <Text ta="right">
            {item.url ? (
              <Anchor href={item.url} target="_blank">
                {item.waar}
              </Anchor>
            ) : (
              item.waar
            )}
          </Text>
        </Group>
      </Accordion.Control>

      {item.description && (
        <Accordion.Panel>{item.description}</Accordion.Panel>
      )}
    </Accordion.Item>
  ));

  return (
    <Accordion variant="contained" transitionDuration={400}>
      {items}
    </Accordion>
  );
};

export default Curriculum;
