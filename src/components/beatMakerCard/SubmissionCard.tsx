import { Stack, Title, Group, Text } from "@mantine/core";
import { reaction } from "../../store/beatBattleState/types";
import { format } from "date-fns";

interface SubmissionCardProps {
  name: string;
  beatName: string;
  url: string;
  dateAdded: Date;
  upvotes: number;
  reactions: reaction[];
}

const SubmissionCard: React.FC<SubmissionCardProps> = ({
  name,
  beatName,
  url,
  dateAdded,
  upvotes,
  reactions,
}) => {
  return (
    <Stack bg="red" m="md">
      <div style={{ border: "1px solid green" }}>
        <Group align="flex-start" justify="space-between">
          <Title order={5} p="md">
            {name} - {beatName}
          </Title>

          <Text fw={700} p="md">
            {format(dateAdded, "dd-mm-yy hh:mm")}
          </Text>
          <Title p="md">{upvotes}</Title>
        </Group>

        <Group bg="cyan" justify="center">
          <Text>{url}</Text>
        </Group>

        <Group bg="green" justify="flex-end">
          {reactions.map((reactie, i) => (
            <Text key={i}>
              {reactie.contestant.name} : {reactie.contents}
              {format(reactie.dateAdded, "hh:mm dd-mm-yy")}
            </Text>
          ))}
        </Group>
      </div>
    </Stack>
  );
};

export default SubmissionCard;
