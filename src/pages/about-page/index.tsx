import { Title, Text, Container, SimpleGrid, Image } from "@mantine/core";
import joramStudio from "../../assets/images/joramstudio.webp";
import { useTranslation } from "react-i18next";

// import treingv from "../../assets/music/treingv.mp3";
// import BlankWaveSurfer from "../../components/WaveSurferPlayer/BlankWaveSurfer";

export default function Aboutpage() {
  const { t } = useTranslation();
  return (
    <Container>
      <Title pt="md">{t("about.title")}</Title>
      <Text py="md">{t("about.intro")}</Text>
      <Title pt="md">{t("about.besidesCoding")}</Title>
      <Text py="md">{t("about.besidesCodingText")}</Text>

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
