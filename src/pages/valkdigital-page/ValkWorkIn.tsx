import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import GridCard from "../../components/GridCard";
import { ValkWerkzaamheden } from "./ValkWerkzaamheden";

const ValkWorkIn = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title pt="md">{t("valkDigital.title")}</Title>
      <Text py="md">{t("valkDigital.intro")}</Text>

      <SimpleGrid py="md" cols={{ base: 1, sm: 2, lg: 4 }}>
        {ValkWerkzaamheden.map((project) => (
          <GridCard content={project} key={project.projectUrl} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ValkWorkIn;
