import { Card, Group, Badge, Title, Text, Stack } from "@mantine/core";
import { contest } from "../../../store/beatbattle/types";
import { NavLink } from "react-router-dom";

interface RoundCardProps {
  contest: contest;
  i: number;
}

const RoundCard: React.FC<RoundCardProps> = ({ contest, i }) => {
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
      <NavLink to={`/beatbattle/${i}`} key={i}>
        <Text>Check it out!</Text>
      </NavLink>
    </Card>
  );
};

export default RoundCard;
