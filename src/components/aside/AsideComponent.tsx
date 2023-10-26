import { ScrollArea, Text, Title } from "@mantine/core";
import { lorem } from "../../helpers/helpers";

const AsideComponent: React.FC = () => {
  return (
    <>
      <Title order={3} pb="md">
        Extra informatie
      </Title>
      <ScrollArea offsetScrollbars type="never">
        <Text pb="md">{lorem.generateParagraphs(1)}</Text>
        <Text pb="md">{lorem.generateParagraphs(6)}</Text>
      </ScrollArea>
    </>
  );
};

export default AsideComponent;
