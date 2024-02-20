import { Container, SimpleGrid, Title } from "@mantine/core"
import GridCard from "../../components/GridCard"

export default function Experimenten() {
  const Experimenten = [
    {
      projectNaam: "Parallax Zandbak",
      projectUrl: "experimenten/parallax",
      projectOmschrijving: "React Parallax Scroll",
    },
    {
      projectNaam: "videoscroll",
      projectUrl: "experimenten/videoscroll",
      projectOmschrijving: " videoscroll",
    },
  ]

  return (
    <Container>
      <Title pt="md">experimenteer pagina</Title>
      <SimpleGrid py="md" cols={{ base: 1, sm: 2, lg: 4 }}>
        {Experimenten.map((project) => (
          <GridCard content={project} key={project.projectUrl} />
        ))}
      </SimpleGrid>
    </Container>
  )
}
