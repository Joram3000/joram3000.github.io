import { useSelector } from "react-redux";
import { getBeatStateSelector } from "../../store/beatbattle/selectors";
import { Container, Group, Title, Text, Button } from "@mantine/core";
import { Link } from "react-router-dom";

const BeatBattlePage: React.FC = () => {
  const beatBattleState = useSelector(getBeatStateSelector);

  console.log(beatBattleState);

  return (
    <Container>
      <Title>Home page voor de beat batttle</Title>

      {beatBattleState.contests.map((contest, i) => (
        <Group key={i} onClick={() => onClick(i)}>
          <Link to={`/beatbattle/${i}`}>
            <Text>{contest.sample.name}</Text>
            <Text>{contest.sample.dateAdded}</Text>
          </Link>
        </Group>
      ))}
    </Container>
  );
};

export default BeatBattlePage;
