import { ScrollArea, Text, Title } from "@mantine/core";
// import { useTranslation } from "react-i18next";
import { lorem } from "../../helpers/TextFiller";

const AsideComponent: React.FC = () => {
  // const { t } = useTranslation();

  return (
    <>
      <Title order={3} pb="md">
        Extra informatie
      </Title>
      <ScrollArea
        offsetScrollbars
        scrollbarSize={4}
        scrollHideDelay={1000}
        type="never"
      >
        <Text pb="md">{lorem.generateParagraphs(1)}</Text>
        <Text pb="md">{lorem.generateParagraphs(6)}</Text>
      </ScrollArea>
    </>
  );
};

export default AsideComponent;
