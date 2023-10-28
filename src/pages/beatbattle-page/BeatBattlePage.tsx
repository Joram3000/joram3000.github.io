import { useSelector } from "react-redux";
import { getBeatStateSelector } from "../../store/beatbattle/selectors";
import { Container, Group, Title, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const BeatBattlePage: React.FC = () => {
  const beatBattleState = useSelector(getBeatStateSelector);

  console.log(beatBattleState);

  return (
    <Container>
      <Title>Home page voor de beat batttle</Title>

      {beatBattleState.contests.map((contest, i) => (
        <Link to={`/beatbattle/${i}`}>
          <Group key={i}>
            <Text>{contest.sample.name}</Text>

            <Text>{contest.sample.dateAdded}</Text>
          </Group>
        </Link>
      ))}
    </Container>
  );
};

export default BeatBattlePage;
