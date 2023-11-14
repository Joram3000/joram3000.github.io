import { Container, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

const SoundDesign = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title pt="md">Interface sound design</Title>
      <Text py="md">Research & Sound voor de zelfscan kassa</Text>
    </Container>
  );
};

export default SoundDesign;
