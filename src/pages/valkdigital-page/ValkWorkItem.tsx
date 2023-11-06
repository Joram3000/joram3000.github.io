import { useParams } from "react-router-dom";
import { ValkWerkjes } from "./ValkWorkIn";
import { Container, Title, Text } from "@mantine/core";
import { lorem } from "../../helpers/helpers";

const ValkWorkItem: React.FC = () => {
  const params = useParams();
  const id: string | undefined = params.id;

  const foundItem = ValkWerkjes.find(
    (item) => item.projectNaam.toLowerCase() === id
  );
  if (!id || !foundItem) return;

  return (
    <Container>
      <Title>{foundItem.projectNaam}</Title>
      <Text>{foundItem.projectOmschrijving}</Text>
      <Text>{lorem.generateSentences(5)}</Text>
    </Container>
  );
};

export default ValkWorkItem;
