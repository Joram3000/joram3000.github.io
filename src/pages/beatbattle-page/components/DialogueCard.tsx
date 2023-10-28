import { Text, Container, Group } from "@mantine/core";
import { reaction } from "../../../store/beatbattle/types";

interface DialogueCardProps {
  reactions: reaction[];
}

const DialogueCard: React.FC<DialogueCardProps> = ({ reactions }) => {
  return (
    <Container>
      {reactions.map((reaction, i) => (
        <Group bg="green" key={i}>
          <Text> {reaction.dateAdded}</Text>
          <Text fw={700} key={i}>
            {reaction.beatMaker.name} : {reaction.contents}
          </Text>
        </Group>
      ))}
    </Container>
  );
};
export default DialogueCard;
