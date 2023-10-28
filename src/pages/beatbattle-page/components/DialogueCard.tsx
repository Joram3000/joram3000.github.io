import { Text, Container, Group } from "@mantine/core";
import { reaction } from "../../../store/beatbattle/types";

interface DialogueCardProps {
  reactions: reaction[];
}

const DialogueCard: React.FC<DialogueCardProps> = ({ reactions }) => {
  return (
    <Container>
      {reactions.map((reaction, i) => (
        <Container bg="green" key={i}>
          <Group justify="space-between">
            <Text fw={700} key={i}>
              {reaction.beatMaker.name} zegt:
            </Text>
            <Text size="xs"> {reaction.dateAdded} </Text>
          </Group>
          <Text>{reaction.contents}</Text>
        </Container>
      ))}
    </Container>
  );
};
export default DialogueCard;
