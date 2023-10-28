import { useSelector } from "react-redux";
import { getBeatStateSelector } from "../../store/beatbattle/selectors";
import { Container, Group, Title, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const BeatBattlePage: React.FC = () => {
  const beatBattleState = useSelector(getBeatStateSelector);

  return (
    <Container>
      <Title>Entry Page voor Beat battle</Title>

      <Text>
        Hoi welkom op deze webzijde hier kan je volgen wat er gebeurd in de beat
        battle.
      </Text>

      {beatBattleState.contests.map((contest, i) => (
        <Group key={i} justify="space-between">
          <Link to={`/beatbattle/${i}`}>
            <Text>{contest.sample.name}</Text>
          </Link>
          <Text>{contest.sample.dateAdded}</Text>

          <Text>{contest.beats.length} inzendingen</Text>
        </Group>
      ))}
    </Container>
  );
};

export default BeatBattlePage;
