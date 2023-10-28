import { Card, Group, Badge, Title, Text, Stack } from "@mantine/core";
import { contest } from "../../../store/beatbattle/types";

interface RoundCardProps {
  contest: contest;
}

const RoundCard: React.FC<RoundCardProps> = ({ contest }) => {
  return (
    <Card my="md" withBorder>
      <Group justify="space-between">
        <Title fw={500}>{contest.sample.name}</Title>

        <Badge pos="absolute" right={0} mr="md" color="pink" variant="light">
          {contest.beats.length} inzendingen
        </Badge>
      </Group>

      <Group justify="space-between">
        <Stack>
          <Text size="sm">Start Date: </Text>
          <Text>{contest.dateAdded}</Text>
        </Stack>

        <Stack>
          <Text size="sm">Deadline:</Text>
          <Text>{contest.dateAdded}</Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default RoundCard;
