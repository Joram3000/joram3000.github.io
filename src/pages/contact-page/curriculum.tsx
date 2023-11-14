import { Anchor, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";

const Curriculum: React.FC = () => {
  const curriculumVitae = [
    {
      start: "2021",
      finish: "2023",
      title: "Front End Web Developer",
      company: "Valk Digital",
      url: "https://www.valkdigital.nl/",
    },
    {
      start: "2020",
      finish: "heden",
      title: "Content Creator",
      company: "Kibbeling Media",
      url: "https://www.kibbelingmedia.nl/",
    },
    {
      start: "2020",
      finish: "2022",
      title: "Oprichten Muziekschool",
      company: "School Of Beats",
      url: "https://schoolofbeats.nl/",
    },
    {
      start: "2020",
      finish: "2022",
      title: "Educatieve Content creator",
      company: "Kunst Centraal",
      url: "https://kunstcentraal.nl/",
    },
    {
      start: "2019",
      finish: "2020",
      title: "Organisator Rarara-evenementen",
    },
    {
      start: "2017",
      finish: "2020",
      title: "Artistiek coördinator & docent bij de Boempatsers",
      company: "Cultuurhuis Kanaleneiland",
      url: "https://bokscultuurhuis.nl/",
    },
    {
      start: "2017",
      finish: "2018",
      title: "Muziekworkshops in gesloten inrichtingen",
    },
    {
      start: "2016",
      finish: "2018",
      title: "Projectmanager evenementen",
      company: "Bankra Bike",
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
      company: "UCK",
    },
    {
      start: "2014",
      finish: "2016",
      title: "Docent percussie",
      company: "Muziekroute",
      url: "https://www.muziekroute.nl/",
    },
    {
      start: "2013",
      finish: "2016",
      title: "Docent Dj & Synthese/Sound Design",
      company: "Emstudios Academy Of Sound",
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
      company: "Dutch Dj Academy",
      url: "https://www.dutchdjacademy.com/",
    },
    {
      start: "2011",
      finish: "2012",
      title: "Docent Dj en turntablism",
      company: "NPAC ROC",
    },
    {
      start: "2010",
      finish: "2022",
      title: "Cultureel ondernemer bij Prace Music",
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
    },
  ];

  return (
    <DataTable
      withTableBorder
      striped
      highlightOnHover
      records={curriculumVitae} //{curriculumVitaeRecords}
      columns={[
        {
          accessor: "start",
          render: (item) => (
            <Text>
              {item.start}-{item.finish}
            </Text>
          ),
        },
        {
          accessor: "title",
          render: (item, i) => <Text key={i}>{item.title}</Text>,
        },
        {
          accessor: "company",
          render: (item) =>
            item.url ? (
              <Anchor href={item.url} target="_blank">
                {item.company}
              </Anchor>
            ) : (
              <Text>{item.company}</Text>
            ),
        },
      ]}
      idAccessor={({ title, company }) => `${title}:${company}`}
      // rowExpansion={{
      //   content: ({ record }) => (
      //     <Box m="md">
      //       <Text>{record.description}</Text>
      //     </Box>
      //   ),
      // }}
    />
  );
};

export default Curriculum;
